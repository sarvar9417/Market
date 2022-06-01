import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import React from "react";
import Select from "react-select";
import { Input } from "../../../components/Input";

export const AddClient = ({
  setBtn,
  btn,
  changePackman,
  packmans,
  changeClient,
  clients,
  inputClient,
}) => {
  return (
    <div>
      <div className='flex justify-end py-2 px-2 '>
        <button
          onClick={() => setBtn(!btn)}
          className='btn bg-blue-800 py-1 px-3 text-white hover:bg-blue-700'>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
      <div
        className={`grid grid-cols-1 py-2 md:grid-cols-3  gap-4 ${
          btn ? "hidden" : ""
        }`}>
        <Select
          onChange={changePackman}
          placeholder={t("Yetkazuvchi")}
          isClearable={true}
          options={packmans}
        />
        <Select
          onChange={changeClient}
          placeholder={t("Xaridor")}
          isClearable={true}
          options={clients}
        />
        <Input
          classes={"py-2"}
          name='name'
          changeHandler={inputClient}
          placeholder={"Xaridor"}
        />
      </div>
    </div>
  );
};
