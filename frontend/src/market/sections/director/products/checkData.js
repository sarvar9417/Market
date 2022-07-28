import { t } from 'i18next';

// CatecheckCategory
export const checkCategory = (category) => {
  if (!category.market)
    return {
      title: t("Diqqat! Avtorzatsiyadan o'tilmagan."),
      description: t("Iltimos bo'limdan chiqib qayta kiriting."),
      status: 'error',
    };
  if (category.name.length === 0)
    return {
      title: t('Diqqat! Kategoriya nomi kiritilmagan.'),
      description: t('Iltimos kategoriya nomini kiriting.'),
      status: 'error',
    };
  if (category.code.length === 0) {
    return {
      title: t('Diqqat! Kategoriya kodi kiritilmagan.'),
      description: t('Iltimos kategoriya kodini kiriting.'),
      status: 'error',
    };
  }

  if (category.code.length !== 3) {
    return {
      title: t("Diqqat! Kategoriya kodi 3 ta raqamdan iborat bo'lishi kerak."),
      description: t("Iltimos kategoriya kodini to'g'ri kiriting."),
      status: 'error',
    };
  }
  return false;
};

// ProductType
export const checkProductType = (producttype) => {
  if (!producttype.market)
    return {
      title: t("Diqqat! Avtorizatsiyadan o'tilmagan."),
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

export const checkProduct = (product, t) => {
  if (!product.market)
    return {
      title: t("Diqqat! Avtorzatsiyadan o'tilmagan."),
      description: t("Iltimos bo'limdan chiqib qayta kiring."),
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
      title: t('Diqqat! Mahsulot kodi kiritilmagan.'),
      description: t('Iltimos kodini kiriting.'),
      status: 'error',
    };

  if (product.code.length < 4)
    return {
      title: t(
        "Diqqat! Mahsulot kodi kamida 4 ta belgidan iborat bo'shi kerak."
      ),
      description: t("Iltimos kodni to'g'ri kiriting."),
      status: 'error',
    };

  if (!product.name)
    return {
      title: t('Diqqat! Mahsulot nomi kiritilmagan.'),
      description: t('Iltimos mahsulot nomini kiriting.'),
      status: 'error',
    };
  if (!product.incomingprice) {
    return {
      title: t('Diqqat! Olish narxi kiritilmagan.'),
      description: t('Iltimos olish narxni kiriting.'),
      status: 'error',
    };
  }

  if (!product.sellingprice) {
    return {
      title: t('Diqqat! Sotish narxi kiritilmagan.'),
      description: t('Iltimos sotish narxni kiriting.'),
      status: 'error',
    };
  }
  if (parseFloat(product.incomingprice) > parseFloat(product.sellingprice)) {
    return {
      title: t("Diqqat! Sotish narxi olish dan katta bo'lish kerak."),
      description: t("Iltimos sotish narxini to'g'ri kiriting."),
      status: 'error',
    };
  }
  if (!product.unit || product.unit === 'delete')
    return {
      title: t("Diqqat! O'lchov birligi kiritilmagan."),
      description: t("Iltimos o'lchov birlikini kiriting."),
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
        title: `${t('Diqqat!')} ${k}-${t(
          "qatorda do'kon nomi noto'g'ri ko'rsatilgan"
        )}.`,
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
    if (!product.category) {
      return {
        title: `${'Diqqat!'} ${k}-${'qatorda kategoriya kodi kiritilmagan.'}`,
        description: 'Iltimos kategoriya kodini kiriting.',
        status: 'error',
      };
    }
    console.log(product.category.length);
    if (product.category >= 1000 || product.category < 100) {
      return {
        title: `Diqqat! Kategoriya kodi 3 ta belgidan iborat bo'lishi kerak`,
        description: `Iltimos ${k}-qatorda kategoriya kodini to'g'ri kiriting.`,
        status: 'error',
      };
    }

    if (!product.code) {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          'qatorda mahsulot kodi kiritilmagan.'
        )}`,
        description: t('Iltimos mahsulot kodini kiriting.'),
        status: 'error',
      };
    }
    if (product.code.toString().length < 4) {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          "qatorda mahsulot kodi noto'g'ri kiritilgan."
        )}`,
        description: t(
          "Iltimos mahsulot kodi kamida 4 ta raqamdan iborat bo'lishi kerak."
        ),
        status: 'error',
      };
    }

    if (!product.name) {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          'qatorda mahsulot nomi kiritilmagan.'
        )}`,
        description: t('Iltimos mahsulot nomini kiriting.'),
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
        title: `${t('Diqqat!')} ${k}-${t(
          "qatorda mahsulot o'lchov birligi kiritilmagan."
        )}`,
        description: t("Iltimos mahsulot o'lchov birligini kiriting."),
        status: 'error',
      };
    }

    if (product.price && typeof product.price !== 'number') {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          'qatorda mahsulot narxi kiritilmagan.'
        )}`,
        description: t('Iltimos mahsulot narxini kiriting.'),
        status: 'error',
      };
    }

    if (product.total && typeof product.total !== 'number') {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          "qatorda mahsulot soni to'g'ri kiritilmagan."
        )}`,
        description: t("Iltimos mahsulot sonini to'g'ri kiriting."),
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
      title: t(`Diqqat! Mahsulot nomi tanlanmagan.`),
      description: t('Iltimos mahsulot nomini tanlang.'),
      status: 'error',
    };
  }

  if (!productConnector.service) {
    return {
      title: t(`Diqqat! Xizmat nomi tanlanmagan.`),
      description: t('Iltimos xizmat nomini tanlang.'),
      status: 'error',
    };
  }

  if (!productConnector.pieces) {
    return {
      title: t(`Diqqat! Mahsulot soni kiritilmagan.`),
      description: t('Iltimos mahsulot sonini kiriting.'),
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
        title: `${t('Diqqat!')} ${k}-${t("qatorda do'kon nomi kiritilmagan.")}`,
        description: t('Iltimos mahsulot nomini kiriting.'),
        status: 'error',
      };
    }

    if (productConnector.market !== market.name) {
      return {
        title: `${t('Diqqat!')} ${k}-${t("qatorda do'kon nomi kiritilmagan.")}`,
        description: t('Iltimos mahsulot nomini kiriting.'),
        status: 'error',
      };
    }

    if (!productConnector.product) {
      return {
        title: `${t('Diqqat!')} ${k}-${t(
          'qatorda mahsulot nomi kiritilmagan.'
        )}`,
        description: t('Iltimos mahsulot nomini kiriting.'),
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
        description: t('Iltimos mahsulot sonini kiriting.'),
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
      title: t("Diqqat! Avtorzatsiyadan o'tilmagan."),
      description: t("Iltimos bo'limdan chiqib qayta kiriting."),
      status: 'error',
    };

  if (!exchangerate.exchangerate)
    return {
      title: t("Diqqat! Kurs ko'rsatilmagan."),
      description: t('Iltimos kursni kiriting.'),
      status: 'error',
    };
  return false;
};

// CheckBrand
export const checkBrand = (brand) => {
  if (!brand.market)
    return {
      title: t("Diqqat! Avtorzatsiyadan o'tilmagan."),
      description: t("Iltimos bo'limdan chiqib qayta kiring."),
      status: 'error',
    };
  if (!brand.name)
    return {
      title: t('Diqqat! Yetkazib beruvchi kiritilmagan.'),
      description: t('Iltimos Yetkazib beruvchi nomini kiriting.'),
      status: 'error',
    };
  return false;
};
