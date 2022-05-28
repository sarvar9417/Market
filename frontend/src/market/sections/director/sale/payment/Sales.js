import { faPenAlt, faPlus, faPrint } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { Pagination } from "../components/Pagination";

export const Sales = ({
  editHandler,
  currentPage,
  addProducts,
  saleCounts,
  setCurrentPage,
  setPageSize,
  countPage,
  currentProducts,
  changeCheck,
}) => {
  return (
    <div className='table-container'>
      <div className='table-container'>
        <div className='table-responsive'>
          <table className='table m-0'>
            <thead className='bg-white'>
              <tr>
                <th className=''>
                  <select
                    className='form-control form-control-sm selectpicker'
                    placeholder={t("Bo'limni tanlang")}
                    onChange={setPageSize}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th className='text-center'>
                  <Pagination
                    countPage={countPage}
                    totalDatas={saleCounts.count}
                    setCurrentPage={setCurrentPage}
                  />
                </th>
                <th className='text-center'>
                  <div className='btn btn-primary'>
                    <ReactHtmlTableToExcel
                      id='reacthtmltoexcel'
                      table='products-table'
                      sheet='Sheet'
                      buttonText='Excel'
                      filename={t("Mahsulotlar")}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className='py-1 text-center font-bold border'>№</th>
                <th className='text-center font-bold border'>Id</th>
                <th className='py-1 text-center font-bold border'>
                  {t("Sana")}
                </th>
                <th className='py-1 text-center font-bold border'>
                  {t("Mahsulot turi")}
                </th>
                <th className='py-1 text-center font-bold border'>
                  {t("Summasi")}
                </th>
                <th className='py-1 text-center font-bold border'>
                  {t("Qarz")}
                </th>
                <th className='py-1 text-center font-bold border'>
                  {t("Chek")}
                </th>
                <th className='py-1 text-center font-bold border'>
                  {t("Tahrirlash")}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((saleconnector, index) => {
                return (
                  <tr key={index}>
                    <td className='border text-black font-bold text-center'>
                      {currentPage * 10 + index + 1}
                    </td>
                    <td className='border text-black font-bold text-right'>
                      {new Date(saleconnector.createdAt).toLocaleDateString()}
                    </td>
                    <td className='border text-black font-bold text-right'>
                      {saleconnector.id}
                    </td>
                    <td className='border text-black font-bold text-center'>
                      {saleconnector.products.length}
                    </td>
                    <td className='border text-black font-bold text-right'>
                      {saleconnector.payments
                        .reduce((summ, payment) => {
                          return payment.payment + summ;
                        }, 0)
                        .toLocaleString("de-DE")}{" "}
                      <span className='text-teal-600'>USD</span>
                    </td>
                    <td className='border text-black font-bold text-right '>
                      {saleconnector.debts
                        .reduce((summ, debt) => {
                          return debt.debt + summ;
                        }, 0)
                        .toLocaleString("de-DE")}{" "}
                      <span className='text-teal-600'>USD</span>
                    </td>
                    <td className='border text-black font-bold text-center'>
                      <button
                        onClick={() => changeCheck(saleconnector)}
                        className='bg-teal-500 hover:bg-teal-600 px-3 text-white rounded m-0'>
                        <FontAwesomeIcon icon={faPrint} />
                      </button>
                    </td>
                    <td className='border text-black font-bold text-center'>
                      <button
                        onClick={() => addProducts(saleconnector)}
                        className='bg-orange-400 hover:bg-orange-500 px-3 text-white rounded m-0'>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </td>
                    <td className='border text-black font-bold text-center'>
                      <button
                        onClick={() => editHandler(saleconnector)}
                        className='bg-red-500 hover:bg-red-700 px-3 text-white rounded m-0'>
                        <FontAwesomeIcon icon={faPenAlt} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
