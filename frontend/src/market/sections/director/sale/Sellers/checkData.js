// Check Packman
export const checkSellerId = (seller) => {
  if (!seller.firstname.length < 1) {
    return {
      title: 'Diqqat! Sotuvchi ismi kiritilmagan!',
      description: 'Iltimos! Sotuvchi ismini kiriting.',
      status: 'error',
    };
  }

  if (!seller.firstname.length < 1) {
    return {
      title: 'Diqqat! Sotuvchi familiyasi kiritilmagan!',
      description: 'Iltimos! Sotuvchi familiyasi kiriting.',
      status: 'error',
    };
  }

  if (!seller.phone.length < 9) {
    return {
      title: 'Diqqat! Sotuvchi telefon raqami kiritilmagan!',
      description: 'Iltimos! Sotuvchi telefon raqamini kiriting.',
      status: 'error',
    };
  }

  if (!seller.login.length < 3) {
    return {
      title:
        "Diqqat! Foydalanuvchi loginini kiritish majburiy va u 3 belgidan kam bo'lmasligi kerak!",
      description: 'Iltimos! Sotuvchi loginini kiriting.',
      status: 'error',
    };
  }

  if (!seller.password.length < 6) {
    return {
      title:
        "Diqqat! Foydalanuvchi parolini kiritish majburiy va u 3 belgidan kam bo'lmasligi kerak!",
      description: 'Iltimos! Sotuvchi parolini qayta kiriting.',
      status: 'error',
    };
  }

  if (seller.password !== seller.repassword) {
    return {
      title:
        "Diqqat! Foydalanuvchi parolini ayta kiritishda xalikka yo'l qo'ydingiz!",
      description: 'Iltimos! Sotuvchi parolini qayta tasdiqlang.',
      status: 'error',
    };
  }

  return false;
};

export const checkSeller = (seller) => {
  if (seller.firstname.length < 1) {
    return {
      title: 'Diqqat! Sotuvchi ismi kiritilmagan!',
      description: 'Iltimos! Sotuvchi ismini kiriting.',
      status: 'error',
    };
  }

  if (seller.lastname.length < 1) {
    return {
      title: 'Diqqat! Sotuvchi familiyasi kiritilmagan!',
      description: 'Iltimos! Sotuvchi familiyasi kiriting.',
      status: 'error',
    };
  }

  if (seller.phone.length < 9) {
    return {
      title: 'Diqqat! Sotuvchi telefon raqami kiritilmagan!',
      description: 'Iltimos! Sotuvchi telefon raqamini kiriting.',
      status: 'error',
    };
  }

  if (seller.login.length < 3) {
    return {
      title:
        "Diqqat! Foydalanuvchi loginini kiritish majburiy va u 3 belgidan kam bo'lmasligi kerak!",
      description: 'Iltimos! Sotuvchi loginini kiriting.',
      status: 'error',
    };
  }

  if (seller.password.length < 6) {
    return {
      title:
        "Diqqat! Foydalanuvchi parolini kiritish majburiy va u 3 belgidan kam bo'lmasligi kerak!",
      description: 'Iltimos! Sotuvchi parolini qayta kiriting.',
      status: 'error',
    };
  }

  if (seller.password !== seller.repassword) {
    return {
      title:
        "Diqqat! Foydalanuvchi parolini qayta kiritishda xalikka yo'l qo'ydingiz!",
      description: 'Iltimos! Sotuvchi parolini qayta tasdiqlang.',
      status: 'error',
    };
  }

  return false;
};
