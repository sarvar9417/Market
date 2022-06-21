import { t } from "i18next";
import React from "react";
import { Input } from "../../components/Input";
import {
  ClearBtn,
  ClearBtnLoad,
  SaveBtn,
  SaveBtnLoad,
} from "../../components/TableButtons";

export const CreateBody = ({
  producttype,
  checkHandler,
  categories,
  changeHandler,
  saveHandler,
  loading,
  keyPressed,
  clearInputs,
}) => {
  return (
    <ul className='tbody'>
      <li className='td text-center font-bold border-r col-span-4'>
        <select
          style={{ minWidth: "70px", maxWidth: "200px" }}
          className='text-center py-1 px-3 border focus:ring focus:outline-green-800 rounded'
          placeholder={t("Kategoriyani tanlang")}
          onChange={checkHandler}>
          <option value='all'>{t("Kategoriya tanlang")}</option>
          {categories &&
            categories.map((category, index) => {
              return (
                <option value={category._id} key={index}>
                  {category.code}
                </option>
              );
            })}
        </select>
      </li>
      <li className='border-r col-span-4 td'>
        <Input
          name={"name"}
          data={producttype.name}
          placeholder={t("Kategotiya nomini kiriting")}
          type={"text"}
          keyPressed={keyPressed}
          changeHandler={changeHandler}
        />
      </li>
      <li className='border-r col-span-2  td-btn'>
        {loading ? <SaveBtnLoad /> : <SaveBtn saveHandler={saveHandler} />}
      </li>
      <li className=' col-span-2  td-btn'>
        {loading ? <ClearBtnLoad /> : <ClearBtn clearDatas={clearInputs} />}
      </li>
    </ul>
  );
};
