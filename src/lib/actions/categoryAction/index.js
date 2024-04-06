'use server';
import { getCategoryService } from './categoryService';
export async function getCategories() {
  try {
    const categories = await getCategoryService();
    return {
      data: categories,
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
