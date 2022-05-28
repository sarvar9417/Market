import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { t } from 'i18next'
import React, { useContext, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { AuthContext } from '../../../../context/AuthContext'

export const Cheque = ({ sales, setCheck }) => {
  const componentRef = useRef()
  const print = () => {
    setCheck(false)
    handlePrint()
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const auth = useContext(AuthContext)
  return (
    <div className="absolute top-0 z-50 w-full min-h-screen bg-white overflow-auto">
      <div className="a4 m-auto w-[21cm]" ref={componentRef}>
        <div className="grid grid-cols-2 items-center">
          <div className="w-full text-xl font-bold">
            <p className="font-bold">{auth.market.name}</p>
            <p className="text-sm font-bold">{t("Mijoz")}: Sarvar Murodullayev</p>
          </div>
          <div>
            <p className="text-right font-bold">
              {t("Tel")}: +998 {auth.market.phone1}
            </p>
            {auth.market.phone2 && (
              <p className="text-right font-bold">
                {t("Tel")}: +998 {auth.market.phone2}
              </p>
            )}
            <p className="text-right font-bold">
              {t("Manzil")}: {auth.market.address}
            </p>
            <p className="text-sm text-right font-bold">
              {t("Sana")}: {new Date().toLocaleDateString()}
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
                {t("Kategoriya")}
              </th>
              <th className="border py-1 bg-slate-200 text-black text-center">
                {t("Mahsulot")}
              </th>
              <th className="border py-1 bg-slate-200 text-black text-center">
                {t("Soni")}
              </th>
              <th className="border py-1 bg-slate-200 text-black text-center">
                {t("Narxi (dona)")}
              </th>
              <th className="border py-1 bg-slate-200 text-black text-center">
                {t("Jami")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.products.map((product, index) => {
              return (
                <tr key={index}>
                  <td className="font-bold text-center border border-black py-1">
                    {index + 1}
                  </td>
                  <td className="font-bold text-right border border-black py-1">
                    {product.category.code}
                  </td>
                  <td className="font-bold border border-black py-1">
                    {product.name}
                  </td>
                  <td className="font-bold text-right border border-black py-1">
                    {product.pieces}
                  </td>
                  <td className="font-bold text-right border border-black py-1">
                    {product.unitprice} USD
                  </td>
                  <td className="font-bold text-right border border-black py-1 text-teal-900">
                    {product.totalprice} USD
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot className="text-base">
            <tr>
              <th colSpan={5} className="py-1">
                {t("Jami")}:
              </th>
              <th className="text-right text-teal-900 py-1">
                {sales.payment.totalprice &&
                  sales.payment.totalprice.toLocaleString('de-DE')}{' '}
                USD
              </th>
            </tr>
            <tr>
              <th colSpan={5} className="py-1">
                {t("To'langan")}:
              </th>
              <th className="text-right text-teal-900 py-1">
                {(
                  sales.payment.cash +
                  sales.payment.card +
                  sales.payment.transfer
                ).toLocaleString('de-DE')}{' '}
                USD
              </th>
            </tr>
            <tr>
              <th colSpan={5} className="py-1">
              {t("Chegirma")}:
              </th>
              <th className="text-right text-teal-900 py-1">
                {sales.payment.discount &&
                  sales.payment.discount.toLocaleString('de-DE')}{' '}
                USD
              </th>
            </tr>
            <tr>
              <th colSpan={5} className="py-1">
                {t("Qarz")}:
              </th>
              <th className="text-right text-teal-900 py-1">
                {sales.payment.debt &&
                  sales.payment.debt.toLocaleString('de-DE')}{' '}
                USD
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="absolute bottom-0 py-4 w-full text-center">
        <button
          onClick={print}
          className="bg-teal-500 hover:bg-teal-600 text-white m-auto px-10 py-2 text-xl  rounded"
        >
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </div>
    </div>
  )
}
