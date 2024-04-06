'use server';
import { getLeaderboardFilterByDateService } from './leaderboardService';

async function getLeaderboardFilterByDate(nowDate) {
  try {
    const leaderboards = await getLeaderboardFilterByDateService(nowDate);
    return {
      data: leaderboards,
      success: true,
      message: 'Berhasil mendapatkan data leaderboard',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data leaderboard: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data leaderboard: ' + error.message,
      };
    }
  }
}

export { getLeaderboardFilterByDate };
