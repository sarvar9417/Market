import React from "react";
import { EditBtn, SaveBtnLoad } from "../../components/TableButtons";

export const Rows = ({ data, currentPage, index, loading, editHandler }) => {
  return (
    <div>
      <ul className="tr">
        <li className="no col-span-1">{currentPage * 10 + 1 + index}</li>
        <li className="no col-span-3">{data.name}</li>
        <li className="col-span-3 td border-r">{data.phone1}</li>
        <li className="col-span-3 td border-r">{data.market.name}</li>
        <li className="td-btn col-span-2 border-r">
          {loading ? (
            <SaveBtnLoad />
          ) : (
            <EditBtn editHandler={() => editHandler(data)} />
          )}
        </li>
      </ul>
    </div>
  );
};
