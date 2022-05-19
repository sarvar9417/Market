// Check Packman
export const checkPackman = (packman) => {
  if (!packman.market) {
    return {
      title: "Diqqat! Avtorizatsiyadan o'tilmagan!",
      description: "Iltimos bo'limdan chiqib qayta kiring",
      status: "error",
    };
  }

  if (!packman.name) {
    return {
      title: "Diqqat! Yetkazuvchi kiritilmagan!",
      description: "Iltimos yetkazuvchini kiriting!",
      status: "error",
    };
  }

  return false;
};
export const checkClient = (client) => {
  if (!client.market) {
    return {
      title: "Diqqat! Avtorizatsiyadan o'tilmagan!",
      description: "Iltimos bo'limdan chiqib qayta kiring",
      status: "error",
    };
  }

  if (!client.name) {
    return {
      title: "Diqqat! Mijoz kiritilmagan!",
      description: "Iltimos mijozni kiriting!",
      status: "error",
    };
  }

  return false;
};
