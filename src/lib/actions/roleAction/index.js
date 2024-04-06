'use server';
import { getRoleService } from './roleService';
export async function getRoles() {
  try {
    const roles = await getRoleService();
    return {
      data: roles,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data role: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data role: ' + error.message,
      };
    }
  }
}
