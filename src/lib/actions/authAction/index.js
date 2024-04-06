'use server';
import {
  registerSoftwareDeveloperService,
  registerOrganizationService,
  checkAvailableEmailService,
  updateEmailVerifiedService,
  loginService,
  checkEmailVerifiedService,
} from './authService';

const registerSoftwareDeveloper = async data => {
  try {
    const checkAvailableEmail = await checkAvailableEmailService(data.email);

    if (checkAvailableEmail) {
      return {
        success: false,
        message: 'Gagal membuat akun, Email sudah terdaftar',
      };
    }

    const result = await registerSoftwareDeveloperService(data);
    return {
      data: result,
      success: true,
      message: 'Berhasil membuat akun, silahkan lakukan verifikasi email !',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal membuat account: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal membuat account: ' + error.message,
      };
    }
  }
};

const registerOrganization = async data => {
  try {
    const checkAvailableEmail = await checkAvailableEmailService(data.email);

    if (checkAvailableEmail) {
      return {
        success: false,
        message: 'Gagal membuat akun, Email sudah terdaftar',
      };
    }

    const result = await registerOrganizationService(data);
    return {
      data: result,
      success: true,
      message: 'Berhasil membuat akun, silahkan lakukan verifikasi email !',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message: 'Gagal membuat akun: Terjadi kesalahan pada server',
      };
    }
  }
};

export { registerSoftwareDeveloper, registerOrganization };
