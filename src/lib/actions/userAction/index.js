'use server';
import {
  getUserService,
  createUserService,
  getDetailUserService,
  updateUserService,
  deleteUserService,
  getCollaborationIdService,
  changePasswordService,
  getUserSelectPasswordService,
} from './userService';
import { compare } from 'bcrypt';

async function getUsers() {
  try {
    const users = await getUserService();
    return {
      data: users,
      success: true,
      message: 'Berhasil mendapatkan data pengguna',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message: 'Gagal mendapatkan data user: Terjadi kesalahan pada server',
      };
    }
  }
}

async function createUser(data) {
  try {
    await createUserService(data);
    return {
      success: true,
      message: 'Berhasil membuat account',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message: 'Gagal membuat account: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal membuat account: ' + error.message,
      };
    }
  }
}

async function getDetailUser(nickname) {
  try {
    const user = await getDetailUserService(nickname);
    return {
      data: user,
      success: true,
      message: 'Berhasil mendapatkan data detail pengguna',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data detail pengguna: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data detail pengguna: ' + error.message,
      };
    }
  }
}

async function updateUser(userId, data) {
  try {
    const detailUser = await getDetailUser(userId);
    if (!detailUser.success) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data pengguna tidak ditemukan',
      };
    }

    const user = await updateUserService(userId, data);
    return {
      data: user,
      success: true,
      message: 'Berhasil memperbarui data pengguna',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal memperbarui data pengguna: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal memperbarui data pengguna: ' + error.message,
      };
    }
  }
}

async function deleteUser(nickname) {
  try {
    const detailUser = await getDetailUserService(nickname);
    if (!detailUser) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data pengguna tidak ditemukan',
      };
    }
    await deleteUserService(detailUser?.userId);
    return {
      success: true,
      message: 'Berhasil menghapus pengguna',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal manghapus pengguna: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal menghapus data pengguna: ' + error.message,
      };
    }
  }
}

async function getCollaborationId(userId) {
  try {
    const user = await getCollaborationIdService(userId);
    return {
      data: user,
      success: true,
      message: 'Berhasil mendapatkan data detail pengguna',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data detail pengguna: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data detail pengguna: ' + error.message,
      };
    }
  }
}

async function changePassword(userId, data) {
  try {
    const user = await getUserSelectPasswordService(userId);
    const passwordConfirm = await compare(data.oldPassword, user.password);
    if (!passwordConfirm) {
      return {
        success: false,
        message: 'Password lama tidak sesuai',
      };
    }
    await changePasswordService(userId, data);
    return {
      success: true,
      message: 'Berhasil mengganti password',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Gagal mengganti password: ' + error.message,
    };
  }
}

export {
  getUsers,
  createUser,
  getDetailUser,
  updateUser,
  deleteUser,
  getCollaborationId,
  changePassword,
};
