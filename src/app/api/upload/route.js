import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_PUBLIC_ANON_KEY,
);
export async function POST(request) {
  // Create a single supabase client for interacting with your database
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const acceptedImageTypes = ['image/jpeg', 'image/png'];

  if (!acceptedImageTypes.includes(file.type)) {
    return new Response(
      JSON.stringify({ success: false, message: 'File type not accepted' }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  if (file.size > 1 * 1024 * 1024) {
    return new Response(
      JSON.stringify({ success: false, message: 'File size too large' }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const fileName = `${uuidv4()}_${file.name}`;
  // SupabaseStorage
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload('public/' + fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (data == null) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
    );
  }

  const splitFileName = data.path.split('/').pop();

  // Local Directory
  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  // // Generate random name for file
  // const path = join('public', 'images', 'avatars', fileName);
  // await writeFile(path, buffer);

  return new Response(JSON.stringify({ data: splitFileName, success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const formData = await request.formData();
  const fileName = formData.get('nowFile');

  if (!fileName) {
    return new Response(
      JSON.stringify({ success: false, message: 'File name is required' }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const { data, error } = await supabase.storage
    .from('avatars')
    .remove('public/' + fileName);

  if (error != '') {
    return new Response(
      JSON.stringify({ success: false, message: 'File name is required' }),
    );
  }

  return new Response(JSON.stringify({ data: data.fullpath, success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });

  // const path = join('public', 'images', 'avatars', fileName);
  // try {
  //   await unlink(path);
  //   return new Response(JSON.stringify({ success: true }), {
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // } catch (error) {
  //   console.error('Error deleting file:', error);
  //   return new Response(
  //     JSON.stringify({ success: false, message: 'Error deleting file' }),
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     },
  //   );
  // }
}
