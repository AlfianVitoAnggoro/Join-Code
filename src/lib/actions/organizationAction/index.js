'use server';
import {
  getOrganizationService,
  updateOrganizationService,
  checkOrganizationByUserId,
  getDetailOrganizationService,
} from './organizationService';
async function getOrganizations() {
  try {
    const organizations = await getOrganizationService();
    return {
      data: organizations,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data organization: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data organization: ' + error.message,
      };
    }
  }
}

async function getDetailOrganization(userId) {
  try {
    const organization = await getDetailOrganizationService(userId);
    return {
      data: organization,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data organization: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data organization: ' + error.message,
      };
    }
  }
}

async function updateOrganization(userId, data) {
  try {
    const checkUser = await checkOrganizationByUserId(userId);
    if (!checkUser) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data pengguna tidak ditemukan',
      };
    }

    const organization = await updateOrganizationService(userId, data);
    return {
      data: organization,
      success: true,
      message: 'Berhasil memperbarui data organization',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal memperbarui data organization: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal memperbarui data organization: ' + error.message,
      };
    }
  }
}

export { updateOrganization, getOrganizations, getDetailOrganization };
