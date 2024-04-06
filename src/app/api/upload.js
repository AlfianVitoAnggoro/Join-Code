// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = './images/avatars'; // Direktori untuk menyimpan file

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const file = files.file;

    try {
      const filePath = path.join(form.uploadDir, file.name);
      await fs.rename(file.path, filePath); // Pindahkan file ke direktori upload

      res.status(200).json({ filePath });
    } catch (error) {
      console.error('Error saving file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
