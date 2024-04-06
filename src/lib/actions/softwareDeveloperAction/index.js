'use server';
import {
  getSoftwareDeveloperService,
  getDetailSoftwareDeveloperService,
  checkSoftwareDeveloperByUserId,
  updateSoftwareDeveloperService,
  getDetailSoftwareDeveloperStatusTeamCompetitionFinishService,
} from './softwareDeveloperService';
async function getSoftwareDevelopers() {
  try {
    const softwareDevelopers = await getSoftwareDeveloperService();
    return {
      data: softwareDevelopers,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data software developer: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data software developer: ' + error.message,
      };
    }
  }
}

async function getDetailSoftwareDeveloper(softwareDeveloperId) {
  try {
    const softwareDeveloper = await getDetailSoftwareDeveloperService(
      softwareDeveloperId,
    );
    return {
      data: softwareDeveloper,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data software developer: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data software developer: ' + error.message,
      };
    }
  }
}

async function getDetailSoftwareDeveloperStatusTeamCompetitionFinish(nickname) {
  try {
    const softwareDeveloper =
      await getDetailSoftwareDeveloperStatusTeamCompetitionFinishService(
        nickname,
      );
    return {
      data: softwareDeveloper,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data software developer: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data software developer: ' + error.message,
      };
    }
  }
}

async function updateSoftwareDeveloper(userId, data) {
  try {
    const checkUser = await checkSoftwareDeveloperByUserId(userId);
    if (!checkUser) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data pengguna tidak ditemukan',
      };
    }

    const softwareDeveloper = await updateSoftwareDeveloperService(
      userId,
      data,
    );
    return {
      data: softwareDeveloper,
      success: true,
      message: 'Berhasil memperbarui data software developer',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal memperbarui data software developer: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal memperbarui data software developer: ' + error.message,
      };
    }
  }
}

export {
  getSoftwareDevelopers,
  getDetailSoftwareDeveloper,
  getDetailSoftwareDeveloperStatusTeamCompetitionFinish,
  updateSoftwareDeveloper,
};
