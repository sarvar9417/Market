import { t } from 'i18next'
import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

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
    <div className="bg-white">
      <p className="bg-teal-500 text-center text-2xl text-white py-2 m-0 font-bold">
        {t("Maxsulotlar")}
      </p>
      <div className="px-3 py-2">
        <div className="grid grid-cols-1 gap-4 py-2">
          <div className="w-full">
            <Select
              onChange={changeCategory}
              // isDisabled={loading}
              placeholder={t("Kategoriyalar")}
              // isLoading={loading}
              components={animatedComponents}
              options={categories}
            />
          </div>
          <div className="w-full">
            <Select
              onChange={changeProduct}
              placeholder={t("Mahsulotlar")}
              // isLoading={loading}
              components={animatedComponents}
              options={products}
            />
          </div>
          <div className="w-full">
            <Select
              onChange={changeProductType}
              placeholder={t("Mahsulot turlari")}
              isClearable={true}
              // isLoading={loading}
              components={animatedComponents}
              options={producttypes}
            />
          </div>
          <div className="w-full">
            <Select
              onChange={changeBrand}
              // isDisabled={loading}
              placeholder={t("Brendlar")}
              isClearable={true}
              // isLoading={loading}
              components={animatedComponents}
              options={brands}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
