import { t } from "i18next";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export const Products = ({
  changeProduct,
  changeBrand,
  changeProductType,
  changeCategory,
  categories,
  producttypes,
  brands,
  products,
}) => {
  return (
    <div className='shadow-xl mb-3'>
      <p className='card-header'>{t("Maxsulotlar")}</p>
      <div className='px-3 py-2 grid md:grid-cols-4 sm:grid-cols-2  gap-4 '>
        <Select
          onChange={changeCategory}
          placeholder={t("Kategoriyalar")}
          components={animatedComponents}
          options={categories}
        />
        <Select
          onChange={changeProduct}
          placeholder={t("Mahsulotlar")}
          components={animatedComponents}
          options={products}
        />
        <Select
          onChange={changeProductType}
          placeholder={t("Mahsulot turlari")}
          isClearable={true}
          components={animatedComponents}
          options={producttypes}
        />
        <Select
          onChange={changeBrand}
          placeholder={t("Brendlar")}
          isClearable={true}
          components={animatedComponents}
          options={brands}
        />
      </div>
    </div>
  );
};
