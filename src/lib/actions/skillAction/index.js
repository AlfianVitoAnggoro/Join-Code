'use server';
import { getSkillService } from './skillService';
export async function getSkills() {
  try {
    const skills = await getSkillService();
    return {
      data: skills,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data skills: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data skills: ' + error.message,
      };
    }
  }
}
