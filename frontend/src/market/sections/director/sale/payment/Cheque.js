import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { AuthContext } from '../../../../context/AuthContext'

export const Cheque = () => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const auth = useContext(AuthContext)
  return (
    <div className="absolute top-0 z-50 w-full h-full bg-white overflow-auto">
      <div className="a4 m-auto w-[21cm]" ref={componentRef}>
        <div className="grid grid-cols-2 items-center">
          <div className="w-full text-xl font-bold">
            <p className="font-bold">{auth.market.name}</p>
            <p className="text-sm font-bold">Mijoz: Sarvar Murodullayev</p>
          </div>
          <div>
            <p className="text-right font-bold">
              Tel: +998 {auth.market.phone1}
            </p>
            {auth.market.phone2 && (
              <p className="text-right font-bold">
                Tel: +998 {auth.market.phone2}
              </p>
            )}
            <p className="text-right font-bold">
              Manzil: {auth.market.address}
            </p>
            <p className="text-sm text-right font-bold">
              Sana: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <hr />
        <table className="table text-black border-collapse my-3">
          <thead>
            <tr>
              <th className="border py-1 bg-slate-200 text-black text-center">
                №
              </th>
              <th className="border py-1 bg-slate-200 text-black text-center">
                Kategoriya
              </th>
              <th className="border py-1 bg-slate-200 text-black text-center">
                Mahsulot
              </th>
              <th className="border py-1 bg-slate-200 text-black text-center">
                Soni
              </th>
              <th className="border py-1 bg-slate-200 text-black text-center">
                Narxi (dona)
              </th>
              <th className="border py-1 bg-slate-200 text-black text-center">
                Jami
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-bold text-center border border-black py-1">
                1
              </td>
              <td className="font-bold text-right border border-black py-1">
                111
              </td>
              <td className="font-bold border border-black py-1">
                Elektronika mhsulotlari
              </td>
              <td className="font-bold text-right border border-black py-1">
                11
              </td>
              <td className="font-bold text-right border border-black py-1">
                3.2 $
              </td>
              <td className="font-bold text-right border border-black py-1 text-teal-900">
                33.68 $
              </td>
            </tr>
          </tbody>
          <tfoot className="text-base">
            <tr>
              <th colSpan={5} className="py-1">
                Jami:
              </th>
              <th className="text-right text-teal-900 py-1">678.78 $</th>
            </tr>
            <tr>
              <th colSpan={5} className="py-1">
                To'langan:
              </th>
              <th className="text-right text-teal-900 py-1">600.78 $</th>
            </tr>
            <tr>
              <th colSpan={5} className="py-1">
                Chegirma:
              </th>
              <th className="text-right text-teal-900 py-1">1.02 $</th>
            </tr>
            <tr>
              <th colSpan={5} className="py-1">
                Qarz:
              </th>
              <th className="text-right text-teal-900 py-1">50.76 $</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="absolute bottom-0 py-4 w-full text-center">
        <button
          onClick={handlePrint}
          className="bg-teal-500 hover:bg-teal-600 text-white m-auto px-10 py-2 text-xl  rounded"
        >
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </div>
    </div>
  )
}
