'use server';
import {
  getCompetitionService,
  getCompetitionByRegistrationDateService,
  getDetailCompetitionService,
  updateCompetitionService,
  createCompetitionService,
  deleteCompetitionService,
  completeCompetitionService,
  competitionRegistrationService,
  submitProjectCompetitionService,
} from './competitionService';

async function getCompetition() {
  try {
    const competitions = await getCompetitionService();
    return {
      data: competitions,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data competition: ' + error.message,
      };
    }
  }
}

async function getDetailCompetition(competitionId) {
  try {
    const competition = await getDetailCompetitionService(competitionId);
    return {
      data: competition,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data competition: ' + error.message,
      };
    }
  }
}

async function updateCompetition(competitionId, data) {
  try {
    const detailCompetition = await getDetailCompetitionService(
      Number(competitionId),
    );
    if (!detailCompetition) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data competition tidak ditemukan',
      };
    }
    const competition = await updateCompetitionService(competitionId, data);
    return {
      data: competition,
      success: true,
      message: 'Berhasil memperbarui data competition',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal memperbarui data competition: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal memperbarui data competition: ' + error.message,
      };
    }
  }
}

async function createCompetition(data) {
  try {
    await createCompetitionService(data);
    return {
      success: true,
      message: 'Berhasil membuat data competition',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal membuat data competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal membuat data competition: ' + error.message,
      };
    }
  }
}

async function deleteCompetition(competitionId) {
  try {
    const detailCompetition = await getDetailCompetitionService(
      Number(competitionId),
    );
    if (!detailCompetition) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data competition tidak ditemukan',
      };
    }
    await deleteCompetitionService(competitionId);
    return {
      success: true,
      message: 'Berhasil menghapus data competition',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal menghapus data competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal menghapus data competition: ' + error.message,
      };
    }
  }
}

async function completeCompetition(competitionId, data) {
  try {
    const competition = await getDetailCompetition(competitionId);
    if (!competition) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data competition tidak ditemukan',
      };
    }
    await completeCompetitionService(competitionId, data);
    return {
      success: true,
      message: 'Berhasil mengubah status data competition',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mengubah status data competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mengubah status data competition: ' + error.message,
      };
    }
  }
}

async function competitionRegistration(competitionId, data) {
  try {
    const checkCompetition = await getDetailCompetitionService(competitionId);
    if (!checkCompetition) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data competition tidak ditemukan',
      };
    }
    const competition = await competitionRegistrationService(
      competitionId,
      data,
    );
    console.log(competition);
    return {
      success: true,
      message: 'Success, Berhasil melakukan registrasi',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message: `Gagal melakukan registrasi: Terjadi kesalahan dalam basis data ${error.code}`,
      };
    } else {
      return {
        success: false,
        message: 'Gagal melakukan registrasi: ' + error.message,
      };
    }
  }
}

async function submitProjectCompetition(competitionId, teamId, data) {
  try {
    const competition = await getDetailCompetitionService(competitionId);
    if (!competition) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data competition tidak ditemukan',
      };
    }
    await submitProjectCompetitionService(competitionId, teamId, data);
    return {
      success: true,
      message: 'Success, Berhasil melakukan submit project',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mengubah status data competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mengubah status data competition: ' + error.message,
      };
    }
  }
}

async function getCompetitionByRegistrationDate(nowDate) {
  try {
    const competitions = await getCompetitionByRegistrationDateService(nowDate);
    return {
      data: competitions,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data competition: ' + error.message,
      };
    }
  }
}

export {
  getCompetition,
  getDetailCompetition,
  updateCompetition,
  createCompetition,
  deleteCompetition,
  completeCompetition,
  competitionRegistration,
  submitProjectCompetition,
  getCompetitionByRegistrationDate,
};
