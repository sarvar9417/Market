import { t } from "i18next";

export const checkUserData = (user) => {
  if (!user.login)
    return {
      title: t("Diqqat! Login kiritilmagan."),
      description: t("Iltimos loginni kiriting."),
      status: "error",
    };
  if (!user.password)
    return {
      title: t("Diqqat! Parol kiritilmagan."),
      description: t("Iltimos parolni kiriting."),
      status: "error",
    };
  if (user.password.length < 6)
    return {
      title: t("Diqqat! Parol noto'g'ri"),
      description: t("Iltimos parolni qayta kiriting."),
      status: "error",
    };
  return false;
};

export const checkDirectorData = (director) => {
  if (!director.firstname) {
    return {
      title: t("Diqqat! Direktor ismi kiritilmagan."),
      description: t("Iltimos direktor ismini kiriting."),
      status: "error",
    };
  }

  if (!director.lastname) {
    return {
      title: t("Diqqat! Direktor familiyasi kiritilmagan."),
      description:t("Iltimos direktor familiyasini kiriting."),
      status: "error",
    };
  }

  if (!director.phone) {
    return {
      title: t("Diqqat! Direktor telefon raqami kiritilmagan."),
      description: t("Iltimos direktor telefon raqami kiriting."),
      status: "error",
    };
  }

  if (director.phone.length !== 9) {
    return {
      title:
        t("Diqqat! Direktor telefon raqami kiritishda xatolikka yo'l qo'yilgan."),
      description: t("Iltimos direktor telefon raqamini to'g'ri kiriting."),
      status: "error",
    };
  }

  if (!director.login) {
    return {
      title: t("Diqqat! Direktor logini kiritilmagan."),
      description: t("Iltimos direktor logini kiriting."),
      status: "error",
    };
  }

  if (!director.password) {
    return {
      title: t("Diqqat! Direktor paroli kiritilmagan."),
      description: t("Iltimos direktor parolini kiriting."),
      status: "error",
    };
  }

  if (director.password < 6) {
    return {
      title: t("Diqqat!"),
      description: t("Parol uzunligi 6 belgidan kam bo'lmasligi kerak."),
      status: "error",
    };
  }

  if (!director.confirmPassword) {
    return {
      title: t("Diqqat! Parolni tasdiqlash qismini to'ldirilmagan."),
      description:
        t("Iltimos parolni tasdiqlash bo'limiga parolni qayta kiriting."),
      status: "error",
    };
  }
  if (director.password !== director.confirmPassword) {
    return {
      title: t("Diqqat! Parolni qayta kiritishda xatolikka yo'l qo'yilgan."),
      description: t("Iltimos parolni to'g'ri tasdiqlang."),
      status: "error",
    };
  }
  if (!director.image) {
    return {
      title: t("Diqqat! Director surati yuklanmagan."),
      description: t("Iltimos direktor suratini yuklang."),
      status: "error",
    };
  }
  return false;
};

export const checkDirectorUpdateData = (director) => {
  if (!director.firstname) {
    return {
      title: t("Diqqat! Direktor ismi kiritilmagan."),
      description: t("Iltimos direktor ismini kiriting."),
      status: "error",
    };
  }

  if (!director.lastname) {
    return {
      title: t("Diqqat! Direktor familiyasi kiritilmagan."),
      description: t("Iltimos direktor familiyasini kiriting."),
      status: "error",
    };
  }

  if (!director.phone) {
    return {
      title: t("Diqqat! Direktor telefon raqami kiritilmagan."),
      description: t("Iltimos direktor telefon raqami kiriting."),
      status: "error",
    };
  }

  if (!director.image) {
    return {
      title: t("Diqqat!  Direktor surati yuklanmagan."),
      description: t("Iltimos direktor suratini yuklang."),
      status: "error",
    };
  }
  return false;
};

export const checkMarketData = (market) => {
  if (!market.name) {
    return {
      title: t("Diqqat! Do'kon nomi kiritilmagan."),
      description: t("Iltimos do'kon nomini kiriting."),
      status: "error",
    };
  }

  if (!market.phone1) {
    return {
      title: t("Diqqat! Do'kon telefon raqami kiritilmagan."),
      description: t("Iltimos telefon raqamini kiriting."),
      status: "error",
    };
  }

  if (!market.image) {
    return {
      title: t("Diqqat! Do'kon logotipi yoki surati yuklanmagan."),
      description: t("Iltimos do'kon logotipi yoki surati yuklang."),
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
      title: t("Diqqat! Parol 6 belgidan kam bo'lmasligi kerak."),
      description: t("Iltimos parolni to'g'ri kiriting."),
      status: "error",
    };
  }

  if (director.newpassword !== director.confirmpassword) {
    return {
      title:
        t("Diqqat! Yangi parol va uni qayta kiritishdagi nusxasi mos kelmadi."),
      description: t("Iltimos parolni to'g'ri kiriting."),
      status: "error",
    };
  }

  return false;
};
