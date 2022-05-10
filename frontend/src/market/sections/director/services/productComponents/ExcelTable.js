import React from "react";

export const ExcelTable = ({ data, ...props }) => {
  return (
    <>
      <>
        <table className="table m-0" {...props}>
          <thead>
            <tr>
              <th className="border-righ">№</th>
              <th className="border-righ">Kategoriya kodi</th>
              <th className="border-righ">Mahsulot turi</th>
              <th className="border-righ">Brend</th>
              <th className="border-righ">Mahsulot kodi</th>
              <th className="border-righ">Mahsulot nomi</th>
              <th className="border-righ">O'lchov birliki</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((p, ind) => (
                <tr key={ind}>
                  <td className="border-right font-weight-bold">{ind + 1}</td>
                  <td className="border-right">{p.category.code}</td>
                  <td className="border-right">{p.producttype.name}</td>
                  <td className="border-right">{p.brand && p.brand.name}</td>
                  <td className="border-right">{p.code}</td>
                  <td className="border-right">{p.name}</td>
                  <td className="border-right">{p.unit.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </>
  );
};
