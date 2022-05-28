import { faFloppyDisk, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import React from "react";

export const InputProduct = ({
  changeCategory,
  categories,
  setProduct,
  product,
  inputHandler,
  keyPressed,
  saveHandler,
  producttypes,
  loading,
  units,
  brands,
  clearInputs,
}) => {
  return (
    <div className="table-container p-2">
      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 p-2">
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">{t("Kategoriya")}</p>
          <select
            className="form-control form-control-sm selectpicker"
            id="select"
            onChange={changeCategory}
          >
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.code}
                </option>
              ))}
            <option value="delete">{t("Kategoriya")}</option>
          </select>
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">{t("Maxsulot turi")}</p>
          <select
            className="form-control form-control-sm selectpicker"
            id="select"
            onChange={(e) => {
              if (e.target.value === "delete") {
                setProduct({ ...product, producttype: null });
              } else {
                setProduct({
                  ...product,
                  producttype: e.target.value,
                });
              }
            }}
            placeholder={t("Xizmat turini tanlang")}
          >
            {producttypes &&
              producttypes.map((producttype, ind) => (
                <option key={ind} value={producttype._id}>
                  {producttype.name}
                </option>
              ))}
            <option value="delete">{t("Mahsulot turi")}</option>
          </select>
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">{t("Brend")}</p>
          <select
            className="form-control form-control-sm selectpicker"
            id="select"
            onChange={(e) => {
              if (e.target.value === "delete") {
                setProduct({ ...product, brand: null });
              } else {
                setProduct({
                  ...product,
                  brand: e.target.value,
                });
              }
            }}
            placeholder={t("Mahsulot brendini tanlang")}
          >
            {brands &&
              brands.map((b, ind) => (
                <option key={ind} value={b._id}>
                  {b.name}
                </option>
              ))}
            <option value="delete">{t("Brend")}</option>
          </select>
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">{t("O'lchov birligi")}</p>
          <select
            className="form-control form-control-sm selectpicker"
            id="select"
            onChange={(e) => {
              if (e.target.value === "delete") {
                setProduct({ ...product, unit: null });
              } else {
                setProduct({
                  ...product,
                  unit: e.target.value,
                });
              }
            }}
            placeholder={t("Xizmat turini tanlang")}
          >
            {units &&
              units.map((unit, ind) => (
                <option key={ind} value={unit._id}>
                  {unit.name}
                </option>
              ))}
            <option value="delete">{t("O'lchov birligini tanlang")}</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 p-2">
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">{t("Maxsulot kodi")}</p>
          <input
            name="code"
            value={product.code || ""}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type="number"
            className="form-control"
            id="price"
            placeholder={t("Mahsulot kodini kiriting")}
          />
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">{t("Maxsulot nomi")}</p>
          <input
            name="name"
            value={product.name || ""}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="shortname"
            placeholder={t("Mahsulot nomini kiriting")}
          />
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">{t("Maxsulotlar soni")}</p>
          <input
            name="total"
            value={product.total || ""}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type="number"
            className="form-control"
            id="shortname"
            placeholder={t("Sonini kiriting")}
          />
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">{t("Maxsulot narxi")}</p>
          <input
            name="price"
            value={product.price || ""}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type="number"
            className="form-control"
            id="shortname"
            placeholder={t("Narxini kiriting")}
          />
        </div>
      </div>
      <div className="flex justify-end p-2">
        <div className="px-1 mx-2">
          {loading ? (
            <button className="btn btn-info" disabled>
              <span className="spinner-border spinner-border-sm"></span>
              Loading...
            </button>
          ) : (
            <button onClick={saveHandler} className="btn btn-success py-1 px-4">
              <FontAwesomeIcon className="text-base" icon={faFloppyDisk} />
            </button>
          )}
        </div>
        <div>
          {loading ? (
            <button className="btn btn-info" disabled>
              <span className="spinner-border spinner-border-sm"></span>
              Loading...
            </button>
          ) : (
            <button
              onClick={clearInputs}
              className="btn btn-secondary py-1 px-4"
            >
              <FontAwesomeIcon className="text-base" icon={faRepeat} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
