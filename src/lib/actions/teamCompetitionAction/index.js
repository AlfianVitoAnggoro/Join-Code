'use server';
import {
  getTeamCompetitionService,
  getDetailTeamCompetitionService,
  getTeamCompetitionByFilterService,
  deleteTeamCompetitionService,
  checkAvailableUserInTeamCompetititonService,
  checkAvailableUserInTeamCompetititonWithoutTeamIdService,
  acceptTeamCompetitionService,
  updateStatusTeamCompetitionService,
} from './teamCompetitionService';
async function getTeamCompetitions() {
  try {
    const skills = await getTeamCompetitionService();
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
          'Gagal mendapatkan data team competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data team competition: ' + error.message,
      };
    }
  }
}

async function getDetailTeamCompetition(competitionId, teamId) {
  try {
    const competition = await getDetailTeamCompetitionService(
      competitionId,
      teamId,
    );
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
          'Gagal mendapatkan data team competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data team competition: ' + error.message,
      };
    }
  }
}

async function getTeamCompetitionByFilter(competitionId) {
  try {
    const teamCompetition = await getTeamCompetitionByFilterService(
      competitionId,
    );
    return {
      data: teamCompetition,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data team competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data team competition: ' + error.message,
      };
    }
  }
}

async function deleteTeamCompetition(competitionId, teamId) {
  try {
    const getDetailTeamCompetition = await getDetailTeamCompetitionService(
      competitionId,
      teamId,
    );
    if (!getDetailTeamCompetition) {
      return {
        success: false,
        message:
          'Gagal menghapus data team competition: data team competition tidak ditemukan',
      };
    }
    const teamCompetition = await deleteTeamCompetitionService(
      competitionId,
      teamId,
    );
    return {
      data: teamCompetition,
      success: true,
      message: 'Berhasil menghapus data team competition',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal menghapus data team competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal menghapus data team competition: ' + error.message,
      };
    }
  }
}

async function checkAvailableUserInTeamCompetititon(
  competitionId,
  teamId,
  collaborationId,
) {
  try {
    const teamCompetition = await checkAvailableUserInTeamCompetititonService(
      competitionId,
      teamId,
      collaborationId,
    );
    return {
      data: teamCompetition,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data team competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data team competition: ' + error.message,
      };
    }
  }
}

async function checkAvailableUserInTeamCompetititonWithoutTeamId(
  competitionId,
  collaborationId,
) {
  try {
    const teamCompetition =
      await checkAvailableUserInTeamCompetititonWithoutTeamIdService(
        competitionId,
        collaborationId,
      );
    return {
      data: teamCompetition,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data team competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data team competition: ' + error.message,
      };
    }
  }
}

async function acceptTeamCompetition(competitionId, teamId) {
  try {
    const teamCompetition = await acceptTeamCompetitionService(
      competitionId,
      teamId,
    );
    return {
      data: teamCompetition,
      success: true,
      message: 'Berhasil memperbarui data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal memperbarui data team competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal memperbarui data team competition: ' + error.message,
      };
    }
  }
}

async function updateStatusTeamCompetition(competitionId, teamId) {
  try {
    const teamCompetition = await updateStatusTeamCompetitionService(
      competitionId,
      teamId,
    );
    return {
      data: teamCompetition,
      success: true,
      message: 'Berhasil memperbarui data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal memperbarui data team competition: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal memperbarui data team competition: ' + error.message,
      };
    }
  }
}

export {
  getTeamCompetitions,
  getDetailTeamCompetition,
  getTeamCompetitionByFilter,
  deleteTeamCompetition,
  checkAvailableUserInTeamCompetititon,
  checkAvailableUserInTeamCompetititonWithoutTeamId,
  acceptTeamCompetition,
  updateStatusTeamCompetition,
};
