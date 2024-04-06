'use server';
import { getTypeService } from './typeService';
export async function getTypes() {
  try {
    const types = await getTypeService();
    return {
      data: types,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if ('code' in error) {
      return {
        status: 'fail',
        message: 'Terjadi kesalahan, data role tidak ditemukan',
      };
    }
    return { error, success: false, message: error.message };
  }
}
