import { join } from 'path';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_PUBLIC_ANON_KEY,
);
export async function POST(request) {
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
    .from('proofOfPayments')
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

  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  // // Generate random name for file
  // const fileName = `${uuidv4()}_${file.name}`;

  // const path = join('public', 'images', 'proofOfPayments', fileName);

  // if (!existsSync(join('public', 'images', 'proofOfPayments'))) {
  //   // If the directory doesn't exist, create it
  //   await mkdir(join('public', 'images', 'proofOfPayments'), {
  //     recursive: true,
  //   });
  // }

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
    .from('proofOfPayments')
    .remove('public/' + fileName);

  if (error != '') {
    return new Response(
      JSON.stringify({ success: false, message: 'File name is required' }),
    );
  }

  return new Response(JSON.stringify({ data: data.fullpath, success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });

  // const path = join('public', 'images', 'proofOfPayments', fileName);
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
