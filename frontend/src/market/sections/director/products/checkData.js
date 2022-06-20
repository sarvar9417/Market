import t from 'i18next';

// CatecheckCategory
export const checkCategory = (category) => {
  if (!category.market)
    return {
      title: t("Diqqat! Avtorzatsiyadan o'tilmagan."),
      description: "Iltimos bo'limdan chiqib qayta kiriting.",
      status: 'error',
    };
  if (!category.name)
    return {
      title: t('Diqqat! Kategoriya nomi kiritilmagan.'),
      description: t('Iltimos kategoriya nomini kiriting.'),
      status: 'error',
    };
  if (!category.code) {
    return {
      title: t('Diqqat! Kategoriya kodi kiritilmagan.'),
      description: t('Iltimos kategoriya kodini kiriting.'),
      status: 'error',
    };
  }
  return false;
};

// ProductType
export const checkProductType = (producttype) => {
  if (!producttype.market)
    return {
      title: t("Diqqat! Avtorzatsiyadan o'tilmagan."),
      description: t("Iltimos bo'limdan chiqib qayta kiriting."),
      status: 'error',
    };

  if (!producttype.category || producttype.category === 'all')
    return {
      title: t('Diqqat! Kategoriya tanlanmagan.'),
      description: t('Iltimos Kategoriya tanlang.'),
      status: 'error',
    };

  if (!producttype.name)
    return {
      title: t('Diqqat! Mahsulot turi kiritilmagan.'),
      description: t('Iltimos mahsulot turini kiriting.'),
      status: 'error',
    };
  return false;
};

export const checkUnit = (unit) => {
  if (!unit.market) {
    return {
      title: t("Diqqat! Avtorzatsiyadan o'tilmagan."),
      description: t("Iltimos bo'limdan chiqib qayta kiriting."),
      status: 'error',
    };
  }
  if (!unit.name) {
    return {
      title: t("Diqqat! O'lchov birliki kiritilmagan."),
      description: t('Iltimos ulchov birligini kiriting.'),
      status: 'error',
    };
  }
};

export const checkProduct = (product) => {
  if (!product.market)
    return {
      title: "Diqqat! Avtorzatsiyadan o'tilmagan.",
      description: "Iltimos bo'limdan chiqib qayta kiring.",
      status: 'error',
    };
  // if (!product.category)
  //   return {
  //     title: 'Diqqat! Mahsulot kategoriyasi tanlanmagan.',
  //     description: 'Iltimos kategoriya nomini yoki kodini tanlang.',
  //     status: 'error',
  //   };
  if (!product.code)
    return {
      title: 'Diqqat! Mahsulot kodi kiritilmagan.',
      description: 'Iltimos kodini kiriting.',
      status: 'error',
    };

  if (product.code.length < 6)
    return {
      title: "Diqqat! Mahsulot kodi kamida 6 ta belgidan iborat bo'shi kerak.",
      description: "Iltimos kodi to'g'ri kiriting.",
      status: 'error',
    };

  if (product.code.length > 7)
    return {
      title:
        "Diqqat! Mahsulot kodi ko'pi bilan 7 ta belgidan iborat bo'shi kerak.",
      description: "Iltimos kodi to'g'ri kiriting.",
      status: 'error',
    };

  if (!product.name)
    return {
      title: 'Diqqat! Mahsulot nomi kiritilmagan.',
      description: 'Iltimos mahsulot nomini kiriting.',
      status: 'error',
    };
  if (!product.incomingprice) {
    return {
      title: 'Diqqat! Olish narxi kiritilmagan.',
      description: 'Iltimos olish narxni kiriting.',
      status: 'error',
    };
  }

  if (!product.sellingprice) {
    return {
      title: 'Diqqat! Sotish narxi kiritilmagan.',
      description: 'Iltimos sotish narxni kiriting.',
      status: 'error',
    };
  }
  if (parseFloat(product.incomingprice) > parseFloat(product.sellingprice)) {
    return {
      title: "Diqqat! Sotish narxi olish dan katta bo'lish kerak.",
      description: "Iltimos sotish narxini to'g'ri kiriting.",
      status: 'error',
    };
  }
  if (!product.unit || product.unit === 'delete')
    return {
      title: "Diqqat! O'lchov birligi kiritilmagan.",
      description: "Iltimos o'lchov birlikini kiriting.",
      status: 'error',
    };

  return false;
};

export const checkUploadServices = (
  categorys,
  market,
  services,
  servicetypes
) => {
  let k = 0;
  for (const service of services) {
    k++;
    if (market.name !== service.market) {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          "xizmatda do'kon nomi noto'g'ri ko'rsatilgan."
        )}`,
        description: t("Iltimos do'kon nomini to'g'ri kiriting."),
        status: 'error',
      };
    }
    const d = categorys.find((category) => category.name === service.category);
    if (!d) {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          "xizmatda  bo'lim  ko'rsatilmagan yoki to'g'ri kiritilmagan."
        )}`,
        description: t("Iltimos mavjud bo'lim nomini  kiriting."),
        status: 'error',
      };
    }
    console.log(service);
    console.log(servicetypes);
    const s = servicetypes.find(
      (servicetype) => servicetype.name === service.servicetype
    );
    if (!s) {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          "xizmatda  xizmat turi ko'rsatilmagan."
        )}`,
        description: t('Iltimos mavjud xizmat turini nomini  kiriting.'),
        status: 'error',
      };
    }

    if (typeof service.price !== 'number') {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          "xizmatda xizmat narxi noto'g'ri kiritilmagan."
        )}`,
        description: t(
          "Iltimos xizmat narxini son ko'rinishida, mavjud bo'lmasa 0 kiriting."
        ),
        status: 'error',
      };
    }

    if (service.doctorProcient && typeof service.doctorProcient !== 'number') {
      return {
        title: `${t(
          'Diqqat!'
        )} ${k}-xizmatda shifokor ulushi noto'g'ri kiritilgan.`,
        description:
          "Iltimos shifokor ulushini son ko'rinishida, mavjud bo'lmasa 0 kiriting.",
        status: 'error',
      };
    }

    if (
      service.counterAgentProcient &&
      typeof service.counterAgentProcient !== 'number'
    ) {
      return {
        title: `Diqqat! ${k}-xizmatda kounteragent ulushi noto'g'ri kiritilgan.`,
        description:
          "Iltimos kounteragent ulushini son ko'rinishida, mavjud bo'lmasa 0 kiriting.",
        status: 'error',
      };
    }

    if (
      service.counterDoctorProcient &&
      typeof service.counterDoctorProcient !== 'number'
    ) {
      return {
        title: `Diqqat! ${k}-xizmatda yo'naltiruvchi shifokor ulushi noto'g'ri kiritilgan.`,
        description:
          "Iltimos yo'naltiruvchi shifokor ulushini son ko'rinishida, mavjud bo'lmasa 0 kiriting.",
        status: 'error',
      };
    }
  }
  return false;
};

export const checkSupplier = (supplier) => {
  if (!supplier.market)
    return {
      title: t("Diqqat! Avtorzatsiyadan o'tilmagan."),
      description: t("Iltimos bo'limdan chiqib qayta kiring."),
      status: 'error',
    };
  if (!supplier.name)
    return {
      title: t('Diqqat! Yetkazib beruvchi kiritilmagan.'),
      description: t('Iltimos Yetkazib beruvchi nomini kiriting.'),
      status: 'error',
    };
  return false;
};

export const checkUploadRooms = (market, rooms) => {
  let k = 0;
  for (const room of rooms) {
    k++;
    if (market.name !== room.market) {
      return {
        title: `${t(
          'Diqqat!'
        )} ${k}-qatorda do'kon nomi noto'g'ri ko'rsatilgan.`,
        description: t("Iltimos do'kon nomini to'g'ri kiriting."),
        status: 'error',
      };
    }

    if (typeof room.price !== 'number') {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          "qatorda xizmat narxi noto'g'ri kiritilmagan."
        )}`,
        description: t(
          "Iltimos xona narxini son ko'rinishida, mavjud bo'lmasa 0 kiriting."
        ),
        status: 'error',
      };
    }

    if (!room.number) {
      return {
        title: `${t('Diqqat!')} ${k}-qatorda xona raqami kiritilmagan.`,
        description: 'Iltimos xona raqamini kiriting.',
        status: 'error',
      };
    }

    if (typeof room.place !== 'number') {
      return {
        title: `Diqqat! ${k}-qatorda o'rin to'g'ri kiritilmagan.`,
        description:
          "Iltimos xona o'rnini son ko'rinishida, mavjud bo'lmasa 0 kiriting.",
        status: 'error',
      };
    }
  }
  return false;
};

// Mahsulotlarni tekshirish
export const checkUploadProducts = (market, products) => {
  let k = 0;
  for (const product of products) {
    k++;
    if (market.name !== product.market) {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          "qatorda do'kon nomi noto'g'ri ko'rsatilgan."
        )}`,
        description: t("Iltimos do'kon nomini to'g'ri kiriting."),
        status: 'error',
      };
    }

    if (typeof product.price !== 'number') {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          "qatorda mahsulot narxi noto'g'ri kiritilgan."
        )}`,
        description: t(
          "Iltimos mahsulot narxini son ko'rinishida, mavjud bo'lmasa 0 kiriting."
        ),
        status: 'error',
      };
    }

    if (!product.name) {
      return {
        title: t("Diqqat! Mahsulot nomi ko'rsatilmagan."),
        description: t('Iltimos mahsulot narxini kiriting.'),
        status: 'error',
      };
    }

    if (!product.price) {
      return {
        title: t('Diqqat! Mahsulot narxi kiritilmagan.'),
        description: t('Iltimos mahsulot narxini kiriting.'),
        status: 'error',
      };
    }

    if (!product.unit) {
      return {
        title: t("Diqqat! o'lchov birligi kiritilmagan."),
        description: t("Iltimos o'lchov birligini kiriting."),
        status: 'error',
      };
    }
  }
  return false;
};

// Omborxona tekshirish
export const checkWarehouse = (warehouse) => {
  if (!warehouse.product) {
    return {
      title: t('Diqqat! Mahsulot nomi tanlanmagan.'),
      description: t('Iltimos mahsulot nomini tanlang.'),
      status: 'error',
    };
  }

  if (!warehouse.price) {
    return {
      title: t('Diqqat! Mahsulot narxi kiritilmagan.'),
      description: t('Iltimos mahsulot narxini kiriting.'),
      status: 'error',
    };
  }

  if (!warehouse.total) {
    return {
      title: t('Diqqat! Mahsulot soni kiritilmagan.'),
      description: t('Iltimos mahsulot sonini kiriting.'),
      status: 'error',
    };
  }

  if (!warehouse.dateofreciept) {
    return {
      title: t('Diqqat! Mahsulot keltirilgan vaqt kiritilmagan.'),
      description: t('Iltimos mahsulot keltirilgan vaqtni kiriting.'),
      status: 'error',
    };
  }
  return false;
};

// Mahsulotlarni tekshirish
export const checkProducts = (products) => {
  let k = 0;
  for (const product of products) {
    k++;
    // if (!product.category) {
    //   return {
    //     title: `${'Diqqat!'} ${k}-${'qatorda kategoriya kodi kiritilmagan.'}`,
    //     description: 'Iltimos kategoriya kodini kiriting.',
    //     status: 'error',
    //   };
    // }

    if (!product.code) {
      return {
        title: `Diqqat! ${k}-qatorda mahsulot kodi kiritilmagan.`,
        description: 'Iltimos mahsulot kodini kiriting.',
        status: 'error',
      };
    }
    if (product.code.toString().length < 6) {
      return {
        title: `Diqqat! ${k}-qatorda mahsulot kodi noto'g'ri kiritilgan.`,
        description:
          "Iltimos mahsulot kodi kamida 6 ta raqamdan iborat bo'lishi kerak.",
        status: 'error',
      };
    }

    if (!product.name) {
      return {
        title: `Diqqat! ${k}-qatorda mahsulot nomi kiritilmagan.`,
        description: 'Iltimos mahsulot nomini kiriting.',
        status: 'error',
      };
    }

    // if (!product.producttype) {
    //   return {
    //     title: `Diqqat! ${k}-qatorda mahsulot turi kiritilmagan.`,
    //     description: 'Iltimos mahsulot turini kiriting.',
    //     status: 'error',
    //   };
    // }

    if (!product.unit) {
      return {
        title: `Diqqat! ${k}-qatorda mahsulot o'lchov birligi kiritilmagan.`,
        description: "Iltimos mahsulot o'lchov birligini kiriting.",
        status: 'error',
      };
    }

    if (product.price && typeof product.price !== 'number') {
      return {
        title: `Diqqat! ${k}-qatorda mahsulot narxi kiritilmagan.`,
        description: 'Iltimos mahsulot narxini kiriting.',
        status: 'error',
      };
    }

    if (product.total && typeof product.total !== 'number') {
      return {
        title: `Diqqat! ${k}-qatorda mahsulot soni to'g'ri kiritilmagan.`,
        description: "Iltimos mahsulot sonini to'g'ri kiriting.",
        status: 'error',
      };
    }
  }
  return false;
};

// Bog'lanishni tekshirish
export const checkProductConnector = (productConnector) => {
  if (!productConnector.product) {
    return {
      title: `Diqqat! Mahsulot nomi tanlanmagan.`,
      description: 'Iltimos mahsulot nomini tanlang.',
      status: 'error',
    };
  }

  if (!productConnector.service) {
    return {
      title: `Diqqat! Xizmat nomi tanlanmagan.`,
      description: 'Iltimos xizmat nomini tanlang.',
      status: 'error',
    };
  }

  if (!productConnector.pieces) {
    return {
      title: `Diqqat! Mahsulot soni kiritilmagan.`,
      description: 'Iltimos mahsulot sonini kiriting.',
      status: 'error',
    };
  }
  return false;
};

// Bog'lanishlarni tekshirish
export const checkUploadProductConnectors = (market, productConnectors) => {
  let k = 0;
  for (const productConnector of productConnectors) {
    k++;
    if (productConnector.market) {
      return {
        title: `Diqqat! ${k}-qatorda do'kon nomi kiritilmagan.`,
        description: 'Iltimos mahsulot nomini kiriting.',
        status: 'error',
      };
    }

    if (productConnector.market !== market.name) {
      return {
        title: `Diqqat! ${k}-qatorda do'kon nomi kiritilmagan.`,
        description: 'Iltimos mahsulot nomini kiriting.',
        status: 'error',
      };
    }

    if (!productConnector.product) {
      return {
        title: `Diqqat! ${k}-qatorda mahsulot nomi kiritilmagan.`,
        description: 'Iltimos mahsulot nomini kiriting.',
        status: 'error',
      };
    }

    if (!productConnector.service) {
      return {
        title: `${t('Diqqat!')} ${k}-${t('qatorda xizmat nomi kiritilmagan.')}`,
        description: 'Iltimos xizmat nomini kiriting.',
        status: 'error',
      };
    }

    if (!productConnector.pieces) {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          'qatorda mahsulot soni kiritilmagan.'
        )}`,
        description: 'Iltimos mahsulot sonini kiriting.',
        status: 'error',
      };
    }
  }
  return false;
};

// Exchangerate
export const checkExchangerate = (exchangerate) => {
  if (!exchangerate.market)
    return {
      title: "Diqqat! Avtorzatsiyadan o'tilmagan.",
      description: "Iltimos bo'limdan chiqib qayta kiriting.",
      status: 'error',
    };

  if (!exchangerate.exchangerate)
    return {
      title: "Diqqat! Kurs ko'rsatilmagan.",
      description: 'Iltimos kursni kiriting.',
      status: 'error',
    };
  return false;
};

// CheckBrand
export const checkBrand = (brand) => {
  if (!brand.market)
    return {
      title: "Diqqat! Avtorzatsiyadan o'tilmagan.",
      description: "Iltimos bo'limdan chiqib qayta kiring.",
      status: 'error',
    };
  if (!brand.name)
    return {
      title: 'Diqqat! Yetkazib beruvchi kiritilmagan.',
      description: 'Iltimos Yetkazib beruvchi nomini kiriting.',
      status: 'error',
    };
  return false;
};
