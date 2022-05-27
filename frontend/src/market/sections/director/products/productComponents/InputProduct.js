import React, { useRef } from "react";
import Select from "react-select";
import { faFloppyDisk, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

export const InputProduct = ({
  changeCategory,
  changeProductType,
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
  changeBrand,
  changeUnit,
  selectRef,
}) => {
  return (
    <div className="table-container p-2">
      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 p-2">
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">Kategoriya</p>
          <Select
            id="select"
            ref={selectRef.category}
            onChange={(e) => changeCategory(e)}
            components={animatedComponents}
            options={categories}
            isLoading={loading}
            theme={(theme) => ({
              ...theme,
              color: "black",
              borderRadius: 0,
              padding: 0,
              height: 0,
            })}
          />
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">Maxsulot turi</p>
          <Select
            id="select"
            ref={selectRef.producttype}
            isClearable={true}
            isLoading={loading}
            onChange={(e) => changeProductType(e)}
            components={animatedComponents}
            options={producttypes}
            theme={(theme) => ({
              ...theme,
              color: "black",
              borderRadius: 0,
              padding: 0,
              height: 0,
            })}
          />
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">Brend</p>
          <Select
            id="select"
            ref={selectRef.brand}
            onChange={(e) => changeBrand(e)}
            components={animatedComponents}
            options={brands}
            isLoading={loading}
            theme={(theme) => ({
              ...theme,
              color: "black",
              borderRadius: 0,
              padding: 0,
              height: 0,
            })}
          />
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">O'lchov birligi</p>
          <Select
            id="select"
            isClearable={true}
            ref={selectRef.unit}
            isLoading={loading}
            onChange={(e) => changeUnit(e)}
            components={animatedComponents}
            options={units}
            theme={(theme) => ({
              ...theme,
              color: "black",
              borderRadius: 0,
              padding: 0,
              height: 0,
            })}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 p-2">
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">Maxsulot kodi</p>
          <input
            name="code"
            value={product.code || ""}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type="number"
            className="form-control"
            id="price"
            placeholder="Mahsulot kodini kiriting"
          />
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">Maxsulot nomi</p>
          <input
            name="name"
            value={product.name || ""}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="shortname"
            placeholder="Mahsulot nomini kiriting"
          />
        </div>
        <div className="p-1">
          <p className="bg-zinc-50 p-2 font-bold text-base">Maxsulotlar soni</p>
          <input
            name="total"
            value={product.total || ""}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type="number"
            className="form-control"
            id="shortname"
            placeholder="Sonini kiriting"
          />
        </div>
        <div className="p-1 flex">
          <div>
            <p className="bg-zinc-50 p-2 font-bold text-base">Kiritish narxi</p>
            <input
              name="incomingprice"
              value={product.incomingprice || ""}
              onKeyUp={keyPressed}
              onChange={inputHandler}
              type="number"
              className="form-control"
              id="shortname"
              placeholder="Narxini kiriting"
            />
          </div>
          <div>
            <p className="bg-zinc-50 p-2 font-bold text-base">Sotish narxi</p>
            <input
              name="sellingprice"
              value={product.sellingprice || ""}
              onKeyUp={keyPressed}
              onChange={inputHandler}
              type="number"
              className="form-control"
              id="shortname"
              placeholder="Narxini kiriting"
            />
          </div>
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
              onClick={() => clearInputs()}
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
