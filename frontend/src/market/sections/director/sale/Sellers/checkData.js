import { t } from "i18next";
// Check Packman
export const checkSellerId = (seller) => {
  if (seller.firstname.length < 1) {
    return {
      title: t('Diqqat! Sotuvchi ismi kiritilmagan!'),
      description: t('Iltimos! Sotuvchi ismini kiriting.'),
      status: 'error',
    };
  }

  if (seller.firstname.length < 1) {
    return {
      title: t('Diqqat! Sotuvchi familiyasi kiritilmagan!'),
      description: t('Iltimos! Sotuvchi familiyasi kiriting.'),
      status: 'error',
    };
  }

  if (seller.phone.length < 9) {
    return {
      title: t('Diqqat! Sotuvchi telefon raqami kiritilmagan!'),
      description: t('Iltimos! Sotuvchi telefon raqamini kiriting.'),
      status: 'error',
    };
  }

  if (seller.login.length < 3) {
    return {
      title:
        t("Diqqat! Foydalanuvchi loginini kiritish majburiy va u 3 belgidan kam bo'lmasligi kerak!"),
      description: t('Iltimos! Sotuvchi loginini kiriting.'),
      status: 'error',
    };
  }

  if (seller.password && seller.password.length < 6) {
    return {
      title:
        t("Diqqat! Foydalanuvchi parolini kiritish majburiy va u 3 belgidan kam bo'lmasligi kerak!"),
      description: t('Iltimos! Sotuvchi parolini qayta kiriting.'),
      status: 'error',
    };
  }

  if (seller.repassword && seller.password !== seller.repassword) {
    return {
      title:
        t("Diqqat! Foydalanuvchi parolini qayta kiritishda xatolikka yo'l qo'ydingiz!"),
      description: t('Iltimos! Sotuvchi parolini qayta tasdiqlang.'),
      status: 'error',
    };
  }

  return false;
};

export const checkSeller = (seller) => {
  if (seller.firstname.length < 1) {
    return {
      title: t('Diqqat! Sotuvchi ismi kiritilmagan!'),
      description: t('Iltimos! Sotuvchi ismini kiriting.'),
      status: 'error',
    };
  }

  if (seller.lastname.length < 1) {
    return {
      title: t('Diqqat! Sotuvchi familiyasi kiritilmagan!'),
      description: t('Iltimos! Sotuvchi familiyasi kiriting.'),
      status: 'error',
    };
  }

  if (seller.phone.length < 9) {
    return {
      title: t('Diqqat! Sotuvchi telefon raqami kiritilmagan!'),
      description: t('Iltimos! Sotuvchi telefon raqamini kiriting.'),
      status: 'error',
    };
  }

  if (seller.login.length < 3) {
    return {
      title:
        t("Diqqat! Foydalanuvchi loginini kiritish majburiy va u 3 belgidan kam bo'lmasligi kerak!"),
      description: t('Iltimos! Sotuvchi loginini kiriting.'),
      status: 'error',
    };
  }

  if (seller.password.length < 6) {
    return {
      title:
        t("Diqqat! Foydalanuvchi parolini kiritish majburiy va u 3 belgidan kam bo'lmasligi kerak!"),
      description: t('Iltimos! Sotuvchi parolini qayta kiriting.'),
      status: 'error',
    };
  }

  if (seller.password !== seller.confirmPassword) {
    return {
      title:
        t("Diqqat! Foydalanuvchi parolini qayta kiritishda xalikka yo'l qo'ydingiz!"),
      description: t('Iltimos! Sotuvchi parolini qayta tasdiqlang.'),
      status: 'error',
    };
  }

  return false;
};
