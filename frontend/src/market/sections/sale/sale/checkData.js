import { t } from "i18next";

// Check Packman
export const checkPackman = (packman) => {
  if (!packman.market) {
    return {
      title: t("Diqqat! Avtorizatsiyadan o'tilmagan!"),
      description: t("Iltimos bo'limdan chiqib qayta kiring"),
      status: "error",
    };
  }

  if (!packman.name) {
    return {
      title: t("Diqqat! Yetkazuvchi kiritilmagan!"),
      description: t("Iltimos yetkazuvchini kiriting!"),
      status: "error",
    };
  }

  return false;
};
export const checkClient = (client) => {
  if (!client.market) {
    return {
      title: t("Diqqat! Avtorizatsiyadan o'tilmagan!"),
      description: t("Iltimos bo'limdan chiqib qayta kiring"),
      status: "error",
    };
  }

  if (!client.name) {
    return {
      title: t("Diqqat! Mijoz kiritilmagan!"),
      description: t("Iltimos mijozni kiriting!"),
      status: "error",
    };
  }

  return false;
};
