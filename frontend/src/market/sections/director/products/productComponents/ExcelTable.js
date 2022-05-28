import { t } from "i18next";
import React from "react";

export const ExcelTable = ({ data, ...props }) => {
  return (
    <>
      <>
        <table className="table m-0" {...props}>
          <thead>
            <tr>
              <th className="border-righ">№</th>
              <th className="border-righ">{t("Kategoriya")}</th>
              <th className="border-righ">{t("Mahsulot turi va mahsulot")}</th>
              <th className="border-righ">{t("Brend")}</th>
              <th className="border-righ">{t("Soni - O'.B.")}</th>
              <th className="border-righ">{t("Narxi")}</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((p, ind) => (
                <tr key={ind}>
                  <td className="border-right font-weight-bold">{ind + 1}</td>
                  <td className="border-right">
                    {p.category.code} {"|"} {p.code}
                  </td>
                  <td className="border-right">
                    {p.producttype.name} {"|"} {p.name}
                  </td>
                  <td className="border-right">
                    {(p.brand && p.brand.name) || ""}
                  </td>
                  <td className="border-right">
                    {p.total} {p.unit.name}
                  </td>
                  <td className="border-right">
                    {(p.price && p.price.sellingprice) || 0}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </>
  );
};
