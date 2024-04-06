import { join } from 'path';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const acceptedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/svg',
  ];

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

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate random name for file
  const fileName = `${uuidv4()}_${file.name}`;

  const path = join('public', 'images', 'proofOfPayments', fileName);

  if (!existsSync(join('public', 'images', 'proofOfPayments'))) {
    // If the directory doesn't exist, create it
    await mkdir(join('public', 'images', 'proofOfPayments'), {
      recursive: true,
    });
  }

  await writeFile(path, buffer);

  return new Response(JSON.stringify({ data: fileName, success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const data = await request.formData();
  const fileName = data.get('nowFile');

  if (!fileName) {
    return new Response(
      JSON.stringify({ success: false, message: 'File name is required' }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const path = join('public', 'images', 'proofOfPayments', fileName);
  try {
    await unlink(path);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error deleting file' }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
