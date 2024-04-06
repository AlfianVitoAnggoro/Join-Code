import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
// Fungsi untuk menangani unggahan file avatar
async function handleUploadAvatar(file) {
  try {
    console.log(file);
    const fileName = uuidv4() + path.extname(file.name); // Generate unique file name
    const uploadDir = 'public/images/avatars/';

    // Pastikan direktori untuk menyimpan file sudah ada
    await fs.ensureDir(uploadDir);

    // Path lengkap file yang akan disimpan
    const filePath = path.join(uploadDir, fileName);

    // Simpan file ke dalam server
    await fs.move(file.path, filePath);

    // Kembalikan nama file
    return fileName;
  } catch (error) {
    console.error('Error handling avatar upload:', error);
    throw error; // Meneruskan kembali kesalahan
  }
}

export { handleUploadAvatar };
