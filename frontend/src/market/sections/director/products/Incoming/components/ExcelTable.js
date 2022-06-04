import { t } from "i18next";
import React from "react";

export const ExcelTable = ({ data, ...props }) => {
  return (
    <>
      <>
        <table className='table m-0' {...props}>
          <thead>
            <tr>
              <th className='border-righ'>№</th>
              <th className='border-righ'>{t("Yetkazib beruvchi")}</th>
              <th className='border-righ'>{t("Kategoriya")}</th>
              <th className='border-righ'>{t("Mahsulot turi")}</th>
              <th className='border-righ'>{t("Brend")}</th>
              <th className='border-righ'>{t("Mahsulot")}</th>
              <th className='border-righ'>{t("O'l.B.")}</th>
              <th className='border-righ'>{t("Soni")}</th>
              <th className='border-righ'>{t("Narxi")}</th>
              <th className='border-righ'>{t("Umumiy narxi")}</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((p, ind) => (
                <tr key={ind}>
                  <td className='border-right font-weight-bold'>{ind + 1}</td>
                  <td className='border-right'>{p.supplier.name}</td>
                  <td className='border-right'>
                    {p.category.code} {p.category.name}
                  </td>
                  <td>
                    {p.producttype.code} {p.producttype.name}
                  </td>
                  <td>{p.brand && p.brand.name}</td>
                  <td className='border-right'>
                    {p.product.code} {p.product.name}
                  </td>
                  <td>{p.unit.name}</td>
                  <td className='border-right'>{p.pieces}</td>
                  <td className='border-right'>{p.unitprice}</td>
                  <td className='border-right'>{p.totalprice}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </>
  );
};
