'use server';
import {
  registerSoftwareDeveloperService,
  registerOrganizationService,
  checkAvailableEmailService,
  updateEmailVerifiedService,
  loginService,
  checkEmailVerifiedService,
  changePasswordService,
} from './authService';
import {
  addVerifyToken,
  checkValidToken,
  deleteToken,
  checkValidTokenExpired,
} from './verifyTokenService';
import { Resend } from 'resend';

const registerSoftwareDeveloper = async data => {
  try {
    const checkAvailableEmail = await checkAvailableEmailService(data.email);

    if (checkAvailableEmail) {
      return {
        success: false,
        message: 'Gagal membuat akun, Email sudah terdaftar',
      };
    }

    const dataVerifyToken = {
      identifier: data.email,
      token: generateRandomTokenOTP(),
    };
    const result = await registerSoftwareDeveloperService(data);
    await addVerifyToken(dataVerifyToken);

    await sendVerificationEmail(dataVerifyToken);

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

    const dataVerifyToken = {
      identifier: data.email,
      token: generateRandomTokenOTP(),
    };
    const result = await registerOrganizationService(data);
    await addVerifyToken(dataVerifyToken);

    await sendVerificationEmail(dataVerifyToken);
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

const updateEmailVerified = async data => {
  try {
    const checkAvailableEmail = await checkAvailableEmailService(data.email);

    if (!checkAvailableEmail) {
      return {
        success: false,
        message: 'Failed, Email not found',
      };
    }

    const result = await updateEmailVerifiedService(data);
    return {
      data: result,
      success: true,
      message: 'Success, Email verified',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message: 'Failed, error in server',
      };
    }
  }
};

const generateRandomTokenOTP = () => {
  const token = Math.floor(Math.random() * 999999 - 100000 + 1) + 100000;
  return String(token);
};

const sendVerificationEmail = async data => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const res = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: data.identifier,
    subject: 'Verification Email',
    html: generateTemplateHTML({ email: data.identifier, token: data.token }),
  });
  return res;
};

const generateTemplateHTML = ({ email, token }) => {
  return `
  <div style="padding: 2em; text-align: left;background: #f5f5f5">
  <div class="our-class" style="display:flex; align-items:center; margin-bottom: 3em; gap: 30px">
    <h3>JOIN CODE</h3>
  </div>
  <h2>VERIFICATION YOUR EMAIL</h2>
  <div style="margin-bottom: 1em">
    <div>Below is your email verification link in 1 hours
    <small style="display:block;">Don't share this link to anyone!</small>
    </div>
  </div>
  <div style="margin-bottom:2em">
  <p>Verification your email with this link </p>
    <a href="${process.env.NEXT_PUBLIC_API_URL}/verify-email?email=${email}&token=${token}">Link Verification</a>
  </div>
  <div style="margin-bottom:2em">If you need help, please contact our support 
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=atokemen12@gmail.com&su=verification-email&body=Give+your+problem">disini</a>
  </div>
  <h4>- JOIN CODE SECURITY</h4>
</div>`;
};

const verificationUser = async data => {
  try {
    const verifyToken = await checkValidToken(data);
    if (!verifyToken) {
      return {
        success: false,
        message: 'Failed, Token not found or expired',
      };
    }

    await updateEmailVerifiedService(data.email);
    await deleteToken(data);
    return {
      success: true,
      message: 'Success, Email verified',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal verification user: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal verification user: ' + error.message,
      };
    }
  }
};

const checkEmailVerified = async email => {
  try {
    const result = await checkEmailVerifiedService(email);
    if (!result) {
      return {
        success: false,
        message: 'Gagal check email verified: Email not found',
      };
    }
    return {
      data: result,
      success: true,
      message: 'Berhasil check email verified',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal check email verified: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal check email verified: ' + error.message,
      };
    }
  }
};

const resendVerificationEmail = async data => {
  try {
    await checkValidTokenExpired(data);
    await deleteToken(data);

    const dataVerifyToken = {
      identifier: data.email,
      token: generateRandomTokenOTP(),
    };
    await addVerifyToken(dataVerifyToken);
    await sendVerificationEmail(dataVerifyToken);
    return {
      success: true,
      message: 'Success resend verification email, please check your email !',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal resend verification email: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal resend verification email: ' + error.message,
      };
    }
  }
};

const forgotPassword = async email => {
  try {
    const dataVerifyToken = {
      identifier: email,
      token: generateRandomTokenOTP(),
    };
    await addVerifyToken(dataVerifyToken);

    await sendForgotPassword(dataVerifyToken);
    return {
      success: true,
      message: 'Success send forgot password, please check your email !',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Failed send forgot password: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Failed send forgot password: ' + error.message,
      };
    }
  }
};

const sendForgotPassword = async data => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const res = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: data.identifier,
    subject: 'Forgot Password',
    html: generateTemplateHTMLForgotPassword({
      email: data.identifier,
      token: data.token,
    }),
  });
  return res;
};

const generateTemplateHTMLForgotPassword = ({ email, token }) => {
  return `
  <div style="padding: 2em; text-align: left;background: #f5f5f5">
  <div class="our-class" style="display:flex; align-items:center; margin-bottom: 3em; gap: 30px">
    <h3>JOIN CODE</h3>
  </div>
  <h2>FORGOT PASSWORD</h2>
  <div style="margin-bottom: 1em">
    <div>Below is your link to reset your password
    <small style="display:block;">Don't share this link to anyone!</small>
    </div>
  </div>
  <div style="margin-bottom:2em">
  <p>Change your password with this link in 1 hours </p>
    <a href="${process.env.NEXT_PUBLIC_API_URL}/forgot-password/change-password?email=${email}&token=${token}">Link Change Password</a>
  </div>
  <div style="margin-bottom:2em">If you need help, please contact our support 
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=atokemen12@gmail.com&su=verification-email&body=Give+your+problem">disini</a>
  </div>
  <h4>- JOIN CODE SECURITY</h4>
</div>`;
};

const changePasswordByForgotPassword = async data => {
  try {
    const tokenExpired = await checkValidTokenExpired(data);
    if (tokenExpired) {
      await deleteToken(data);
      return {
        success: false,
        message: 'Token expired, please resend verification email',
      };
    }

    const result = await changePasswordService(data);
    await deleteToken(data);
    if (!result) {
      return {
        success: false,
        message: 'Gagal change password: Email not found',
      };
    }
    return {
      data: result,
      success: true,
      message: 'Success, change password',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal Change Password: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal Change Password: ' + error.message,
      };
    }
  }
};

export {
  registerSoftwareDeveloper,
  registerOrganization,
  updateEmailVerified,
  verificationUser,
  checkEmailVerified,
  resendVerificationEmail,
  forgotPassword,
  changePasswordByForgotPassword,
};
