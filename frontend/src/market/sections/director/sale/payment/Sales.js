import { faPenAlt, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'
import { Pagination } from '../../components/Pagination'

export const Sales = ({
  setCurrentPage,
  setCurrentProducts,
  setPageSize,
  countPage,
  currentProducts,
  saleconnectors,
  changeCheck,
}) => {
  return (
    <div className="table-container">
      <div className="table-container">
        <div className="table-responsive">
          <table className="table m-0">
            <thead className="bg-white">
              <tr>
                <th className="">
                  <select
                    className="form-control form-control-sm selectpicker"
                    placeholder="Bo'limni tanlang"
                    onChange={setPageSize}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th className="text-center">
                  <Pagination
                    setCurrentDatas={setCurrentProducts}
                    datas={saleconnectors}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={saleconnectors.length}
                  />
                </th>
                <th className="text-center">
                  <div className="btn btn-primary">
                    <ReactHtmlTableToExcel
                      id="reacthtmltoexcel"
                      table="products-table"
                      sheet="Sheet"
                      buttonText="Excel"
                      filename="Mahsulotlar"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="py-1 text-center font-bold border">№</th>
                <th className="py-1 text-center font-bold border">Sana</th>
                <th className="py-1 text-center font-bold border">
                  Mahsulot turi
                </th>
                <th className="py-1 text-center font-bold border">Summasi</th>
                <th className="py-1 text-center font-bold border">Qarz</th>
                <th className="py-1 text-center font-bold border">Chek</th>
                <th className="py-1 text-center font-bold border">
                  Tahrirlash
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((saleconnector, index) => {
                return (
                  <tr key={index}>
                    <td className="border text-black font-bold text-center">
                      {index + 1}
                    </td>
                    <td className="border text-black font-bold text-center">
                      {new Date(saleconnector.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border text-black font-bold text-center">
                      {saleconnector.products.length}
                    </td>
                    <td className="border text-black font-bold text-center">
                      {saleconnector.payments.reduce((summ, payment) => {
                        return payment.payment + summ
                      }, 0)}{' '}
                      USD
                    </td>
                    <td className="border text-black font-bold text-center">
                      {saleconnector.debts.reduce((summ, debt) => {
                        return debt.debt + summ
                      }, 0)}{' '}
                      USD
                    </td>
                    <td className="border text-black font-bold text-center">
                      <button
                        onClick={() => changeCheck(saleconnector)}
                        className="bg-teal-500 hover:bg-teal-600 px-4 py-1 text-white rounded m-0"
                      >
                        <FontAwesomeIcon icon={faPrint} />
                      </button>
                    </td>
                    <td className="border text-black font-bold text-center">
                      <button className="bg-red-500 hover:bg-red-700 px-4 py-1 text-white rounded m-0">
                        <FontAwesomeIcon icon={faPenAlt} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
