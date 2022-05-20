import { faPenAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Select from 'react-select'

export const Selling = ({
  editProducts,
  saleproducts,
  packmans,
  clients,
  changePackman,
  changeClient,
}) => {
  return (
    <div className=" bg-white text ">
      <p className="bg-[#31C2A0] text-center text-2xl text-white py-2 font-bold">
        CHEK: № 00134
      </p>
      <div className="px-3 py-2">
        <div className="flex justify-end py-2 px-2 ">
          <button className="btn bg-[#31C2A0] py-1 px-3 text-white text-base">
            Xaridor
          </button>
        </div>
        <div className="grid grid-cols-1 py-2 sm:grid-cols-2  gap-4">
          <div>
            <Select
              // isDisabled={loading}
              onChange={changePackman}
              placeholder="Yetkazuvchi"
              isClearable={true}
              // isLoading={loading}
              // components={}
              options={packmans}
            />
          </div>
          <div>
            <Select
              // isDisabled={loading}
              onChange={changeClient}
              placeholder="Xaridor"
              isClearable={true}
              // isLoading={loading}
              // components={}
              options={clients}
            />
          </div>
          <div className="sm:col-span-2">
            <input
              name="name"
              type="text"
              className="form-control rounded px-3"
              id=""
              placeholder="Xaridor"
            />
          </div>
        </div>
        <div className="max-h-96 overflow-y-scroll">
          <table className="bg-white w-full text-base relative">
            <thead className="z-10 border text-center text-base  text-white py-4">
              <tr>
                <th className="border sticky top-0 bg-[#31C2A0]">№</th>
                <th className="border sticky top-0 bg-[#31C2A0]">
                  Kategoriyasi
                </th>
                <th className="border sticky top-0 bg-[#31C2A0]">Nomi</th>
                <th className="border sticky top-0 bg-[#31C2A0]">Soni</th>
                <th className="border sticky top-0 bg-[#31C2A0]">Narxi</th>
                <th className="border sticky top-0 bg-[#31C2A0]">Edit</th>
                <th className="border sticky top-0 bg-[#31C2A0]">Delete</th>
              </tr>
            </thead>
            <tbody className="border text-black">
              {saleproducts.map((product, index) => {
                return (
                  <tr key={index}>
                    <td className="border font-bold text-black text-center w-1/12">
                      {index + 1}
                    </td>
                    <td className="border font-bold text-black text-center w-1/6">
                      {product.category.code}
                    </td>
                    <td className="border font-bold text-black px-1">
                      {product.name}
                    </td>
                    <td className="border font-bold text-black text-right px-2 w-14">
                      {product.pieces}
                    </td>
                    <td className="border font-bold text-black text-right px-2 w-1/6">
                      {product.totalprice} $
                    </td>
                    <td className="border font-bold text-black text-right px-2">
                      <button
                        className="px-3 bg-teal-500 hover:bg-teal-600 text-white rounded my-1"
                        onClick={() => {
                          editProducts(product, index, 'edit')
                        }}
                      >
                        <FontAwesomeIcon icon={faPenAlt} />
                      </button>
                    </td>
                    <td className="border font-bold text-black text-right px-2">
                      <button
                        className="px-3 bg-red-600 hover:bg-red-500 text-white rounded my-1"
                        onClick={() => {
                          editProducts(product, index, 'delete')
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="py-3 text-lg">
          <div className="flex justify-between ">
            <span className="text-black font-bold">Umumiy summa:</span>
            <span className="text-black font-bold">
              {saleproducts.reduce((summ, product) => {
                return summ + product.totalprice
              }, 0)}{' '}
              $
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-black font-bold">Chegirma:</span>
            <span className="text-yellow-500 font-bold">30.000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black font-bold">To'lanayotgan:</span>
            <span className="text-green-700 font-bold">340.000</span>
          </div>
        </div>
      </div>
    </div>
  )
}
