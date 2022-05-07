import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../components/Pagination";
import { ExcelTable } from "./ExcelTable";
import { DatePickers } from "../../../reseption/offlineclients/clientComponents/DatePickers";

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
                    placeholder="Bo'limni tanlang"
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
                    placeholder="Yetkazib beruvchi"
                  />
                </th>
                <th>
                  <input
                    onChange={searchCategoryTable}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder="Kategoriya"
                    aria-controls="basicExample"
                  />
                </th>
                <th>
                  <input
                    onChange={searchProduct}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder="Mahsulot"
                    aria-controls="basicExample"
                  />
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
                <th
                  className="text-center"
                  style={{ maxWidth: "120px", overflow: "hidden" }}
                >
                  <DatePickers changeDate={changeStart} />
                </th>
                <th
                  className="text-center"
                  style={{ maxWidth: "120px", overflow: "hidden" }}
                >
                  <DatePickers changeDate={changeEnd} />
                </th>
                <th className="text-center">
                  <div className="btn btn-primary">
                    <ReactHTMLTableToExcel
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
                <th className="border-right">№</th>
                <th className="border-right">
                  Yetkazib beruvchi
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
                  Kategoriya
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
                  Mahsulot
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.product.name > b.product.name ? 1 : -1
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
                            b.product.name > a.product.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  Soni
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.pieces > b.pieces ? 1 : -1
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
                            b.pieces > a.pieces ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  Narx "1"
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
                  Umumiy narx
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
                <th className="border-right">
                  Qabul qiluvchi
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentImports(
                          [...currentImports].sort((a, b) =>
                            a.user.name > b.user.name ? 1 : -1
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
                            b.user.name > a.user.name ? 1 : -1
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
                      <td className="border-right font-weight-bold">
                        {currentPage * countPage + key + 1}
                      </td>
                      <td className="border-right">{p.supplier.name}</td>
                      <td className="border-right">
                        {p.category.code} {p.category.name}
                      </td>
                      <td className="border-right">
                        {p.product.code} {p.product.name}
                      </td>
                      <td className="border-right">{p.pieces}</td>
                      <td className="border-right">{p.unitprice}</td>
                      <td className="border-right">{p.totalprice}</td>
                      <td className="border-right">
                        {p.user.firstname} {p.user.lastname}{" "}
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
