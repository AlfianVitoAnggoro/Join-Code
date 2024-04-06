'use server';
import { updateAdminService, checkAdminByUserId } from './adminService';

async function updateAdmin(userId, data) {
  try {
    const checkUser = await checkAdminByUserId(userId);
    if (!checkUser) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data pengguna tidak ditemukan',
      };
    }

    const organization = await updateAdminService(userId, data);
    return {
      data: organization,
      success: true,
      message: 'Berhasil memperbarui data admin',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal memperbarui data admin: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal memperbarui data admin: ' + error.message,
      };
    }
  }
}

export { updateAdmin };
