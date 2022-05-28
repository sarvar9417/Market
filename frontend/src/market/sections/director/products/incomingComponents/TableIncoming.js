import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../components/Pagination";
import { ExcelTable } from "./ExcelTable";
import { DatePickers } from "../../components/DatePickers";
import { t } from "i18next";

export const TableIncoming = ({
  currentImports,
  setCurrentImports,
  imports,
  countPage,
  currentPage,
  setCurrentPage,
  setPageSize,
  searchCategoryTable,
  searchSupplier,
  searchProduct,
  dataExcel,
  changeStart,
  changeEnd,
  searchBrand,
}) => {
  return (
    <div className="table-container">
      <div className="table-container">
        <div className="table-responsive">
          <table className="table m-0">
            <thead className="bg-white">
              <tr>
                <th>
                  <select
                    className="form-control form-control-sm selectpicker"
                    placeholder={t("Bo'limni tanlang")}
                    onChange={setPageSize}
                    style={{ minWidth: "50px" }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th>
                  <input
                    onChange={searchSupplier}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder={t("Yetkazib beruvchi")}
                  />
                </th>
                <th>
                  <input
                    onChange={searchCategoryTable}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder={t("Kategoriya")}
                    aria-controls="basicExample"
                  />
                </th>
                <th>
                  <input
                    onChange={searchProduct}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder={t("Mahsulot")}
                    aria-controls="basicExample"
                  />
                </th>
                <th>
                  <input
                    onChange={searchBrand}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder={t("Brend")}
                    aria-controls="basicExample"
                  />
                </th>
                <th>
                  <div className="btn btn-primary">
                    <ReactHTMLTableToExcel
                      id="reacthtmltoexcel"
                      table="products-table"
                      sheet="Sheet"
                      buttonText="Excel"
                      filename={t("Mahsulotlar")}
                    />
                  </div>
                </th>
                <th>
                  <Pagination
                    setCurrentDatas={setCurrentImports}
                    datas={imports}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={imports.length}
                  />
                </th>
                <th className="text-center" style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "200px",
                    }}
                  >
                    <DatePickers changeDate={changeStart} />
                    <DatePickers changeDate={changeEnd} />
                  </div>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border-right">№</th>
                <th className="border-right d-flex">
                  <div>{t("Yetkazib beruvchi")}</div>
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.supplier.name > b.supplier.name ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            b.supplier.name > a.supplier.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  {t("Kategoriya")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.category.name > b.category.name ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            b.category.name > a.category.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  {t("Mahsulot turi")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.producttype.name > b.producttype.name ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            b.producttype.name > a.producttype.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  {t("Brend")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.brand.name > b.brand.name ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            b.brand.name > a.brand.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right d-flex">
                  {t("Soni - O'l.B.")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.pieces.name > b.pieces.name ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            b.pieces.name > a.pieces.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  {t("Narx '1'")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.unitprice > b.unitprice ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            b.unitprice > a.unitprice ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  {t("Umumiy narx")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.totalprice > b.totalprice ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            b.totalprice > a.totalprice ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentImports &&
                currentImports.map((p, key) => {
                  return (
                    <tr key={key}>
                      <td className="border-right font-bold text-black">
                        {currentPage * countPage + key + 1}
                      </td>
                      <td className="border-right font-bold text-black">
                        {p.supplier.name}
                      </td>
                      <td className="border-right font-bold text-black">
                        {p.category.code} {" | "} {p.product.code}
                      </td>
                      <td className="border-right font-bold text-black">
                        {p.producttype && p.producttype.name}
                        {" | "}
                        {p.product && p.product.name}
                      </td>
                      <td className="border-right font-bold text-black">
                        {p.brand && p.brand.name}
                      </td>
                      <td className="border-right font-bold text-black">
                        {p.pieces} {p.unit.name}
                      </td>
                      <td className="border-right font-bold text-black">
                        {p.unitprice}
                      </td>
                      <td className="border-right font-bold text-black">
                        {p.totalprice}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="d-none">
            <ExcelTable data={dataExcel} id="products-table" />
          </div>
        </div>
      </div>
    </div>
  );
};
