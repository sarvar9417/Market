export const checkUserData = (user) => {
  if (!user.firstname) {
    return {
      title: "Diqqat! Foydalanuvchi ismi kiritilmagan.",
      description: "Iltimos foydalanuvchi ismini kiriting.",
      status: "error",
    };
  }

  if (!user.lastname) {
    return {
      title: "Diqqat! Foydalanuvchi familiyasi kiritilmagan.",
      description: "Iltimos foydalanuvchi familiyasini kiriting.",
      status: "error",
    };
  }

  if (!user.phone) {
    return {
      title: "Diqqat! Foydalanuvchi telefon raqami kiritilmagan.",
      description: "Iltimos foydalanuvchi telefon raqamini kiriting.",
      status: "error",
    };
  }

  if (user.phone.length !== 9) {
    return {
      title:
        "Diqqat! Foydalanuvchi telefon raqami kiritishda xatolikka yo'l qo'yilgan.",
      description: "Iltimos foydalanuvchi telefon raqamini to'g'ri kiriting.",
      status: "error",
    };
  }

  if (!user._id && !user.password) {
    return {
      title: "Diqqat! Foydalanuvchi paroli kiritilmagan.",
      description: "Iltimos foydalanuvchi parolini kiriting.",
      status: "error",
    };
  }

  if (
    (!user._id && user.password < 6) ||
    (user._id && user.password && user.password < 6)
  ) {
    return {
      title: "Diqqat! Foydalanuvchi paroli 6 belgidan kam bo'lmasligi kerak.",
      description: "Iltimos foydalanuvchi parolini qayta kiriting.",
      status: "error",
    };
  }

  if (
    (!user._id && !user.confirmPassword) ||
    (user._id && user.password && !user.confirmPassword)
  ) {
    return {
      title: "Diqqat! Parolni tasdiqlash qismini to'ldirilmagan.",
      description:
        "Iltimos parolni tasdiqlash bo'limiga parolni qayta kiriting.",
      status: "error",
    };
  }
  if (
    (!user._id && user.password !== user.confirmPassword) ||
    (user._id &&
      user.password &&
      user.confirmPassword &&
      user.password !== user.confirmPassword)
  ) {
    return {
      title: "Diqqat! Parolni qayta kiritishda xatolikka yo'l qo'yilgan.",
      description: "Iltimos parolni to'g'ri tasdiqlang.",
      status: "error",
    };
  }

  if (!user.image) {
    return {
      title: "Diqqat! Foydalanuvchi surati yuklanmagan.",
      description: "Iltimos foydalanuvchi suratini yuklang.",
      status: "error",
    };
  }

  if (user.type === "Doctor" && !user.specialty) {
    return {
      title: "Diqqat! Shifokor mutaxasisligi tanlanmagan.",
      description: "Iltimos shifokor mutaxasisligi tanlang.",
      status: "error",
    };
  }

  return false;
};

export const checkDirectorUpdateData = (director) => {
  if (!director.firstname) {
    return {
      title: "Diqqat! Direktor ismi kiritilmagan.",
      description: "Iltimos direktor ismini kiriting.",
      status: "error",
    };
  }

  if (!director.lastname) {
    return {
      title: "Diqqat! Direktor familiyasi kiritilmagan.",
      description: "Iltimos direktor familiyasini kiriting.",
      status: "error",
    };
  }

  if (!director.phone) {
    return {
      title: "Diqqat! Direktor telefon raqami kiritilmagan.",
      description: "Iltimos direktor telefon raqami kiriting.",
      status: "error",
    };
  }

  if (!director.image) {
    return {
      title: "Diqqat!  Direktor surati yuklanmagan.",
      description: "Iltimos direktor suratini yuklang.",
      status: "error",
    };
  }
  return false;
};

export const checkClinicaData = (clinica) => {
  if (!clinica.name) {
    return {
      title: "Diqqat! Shifoxona nomi kiritilmagan.",
      description: "Iltimos shifoxona nomini kiriting.",
      status: "error",
    };
  }

  if (!clinica.phone1) {
    return {
      title: "Diqqat! Shifoxona telefon raqami kiritilmagan.",
      description: "Iltimos telefon raqamini kiriting.",
      status: "error",
    };
  }

  if (!clinica.image) {
    return {
      title: "Diqqat! Shifoxona logotipi yoki surati yuklanmagan.",
      description: "Iltimos shifoxona logotipi yoki surati yuklang.",
      status: "error",
    };
  }

  return false;
};

export const checkDirectorUpdatePassword = (director) => {
  if (
    director.oldpassword.length < 6 ||
    director.newpassword.length < 6 ||
    director.confirmpassword.length < 6
  ) {
    return {
      title: "Diqqat! Parol 6 belgidan kam bo'lmasligi kerak.",
      description: "Iltimos parolni to'g'ri kiriting.",
      status: "error",
    };
  }

  if (director.newpassword !== director.confirmpassword) {
    return {
      title:
        "Diqqat! Yangi parol va uni qayta kiritishdagi nusxasi mos kelmadi.",
      description: "Iltimos parolni to'g'ri kiriting.",
      status: "error",
    };
  }

  return false;
};
