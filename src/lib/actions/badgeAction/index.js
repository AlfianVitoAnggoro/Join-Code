'use server';
import {
  getBadgeService,
  getDetailBadgeService,
  updateBadgeService,
  createBadgeService,
  deleteBadgeService,
} from './badgeService';

async function getBadge() {
  try {
    const badges = await getBadgeService();
    return {
      data: badges,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data badge: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data badge: ' + error.message,
      };
    }
  }
}

async function getDetailBadge(badgeId) {
  try {
    const badge = await getDetailBadgeService(badgeId);
    return {
      data: badge,
      success: true,
      message: 'Berhasil mendapatkan data',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mendapatkan data badge: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mendapatkan data badge: ' + error.message,
      };
    }
  }
}

async function updateBadge(badgeId, data) {
  try {
    const detailBadge = await getDetailBadgeService(Number(badgeId));
    if (!detailBadge) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data badge tidak ditemukan',
      };
    }
    const badge = await updateBadgeService(badgeId, data);
    return {
      data: badge,
      success: true,
      message: 'Berhasil memperbarui data badge',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal memperbarui data badge: Terjadi kesalahan dalam basis data' +
          error.code,
      };
    } else {
      return {
        success: false,
        message: 'Gagal memperbarui data badge: ' + error.message,
      };
    }
  }
}

async function createBadge(data) {
  try {
    await createBadgeService(data);
    return {
      success: true,
      message: 'Berhasil membuat data badge',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message: 'Gagal membuat data badge: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal membuat data badge: ' + error.message,
      };
    }
  }
}

async function deleteBadge(badgeId) {
  try {
    const detailBadge = await getDetailBadgeService(Number(badgeId));
    if (!detailBadge) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data badge tidak ditemukan',
      };
    }
    await deleteBadgeService(badgeId);
    return {
      success: true,
      message: 'Berhasil menghapus data badge',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal menghapus data badge: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal menghapus data badge: ' + error.message,
      };
    }
  }
}

async function completeBadge(badgeId, data) {
  try {
    const badge = await getDetailBadge(badgeId);
    if (!badge) {
      return {
        success: false,
        message: 'Terjadi kesalahan, data badge tidak ditemukan',
      };
    }
    await completeBadgeService(badgeId, data);
    return {
      success: true,
      message: 'Berhasil mengubah status data badge',
    };
  } catch (error) {
    if (error.code) {
      return {
        success: false,
        message:
          'Gagal mengubah status data badge: Terjadi kesalahan dalam basis data',
      };
    } else {
      return {
        success: false,
        message: 'Gagal mengubah status data badge: ' + error.message,
      };
    }
  }
}

export { getBadge, getDetailBadge, updateBadge, createBadge, deleteBadge };
