'use server';
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_PUBLIC_ANON_KEY,
);
export async function uploadAvatars(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload('public/avatar1.png', file, {
        cacheControl: '3600',
        upsert: false,
      });
    return {
      data: data,
      status: error,
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message: 'Gagal mengupload: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mengupload: ' + error.message,
      };
    }
  }
}
