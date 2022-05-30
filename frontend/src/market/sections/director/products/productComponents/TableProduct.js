import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faPenAlt,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../productComponents/Pagination";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ExcelTable } from "./ExcelTable";
import { ExcelUpload } from "./ExcelUpload";
import { t } from "i18next";

export const TableProduct = ({
  searchName,
  searchProductTypeAndProductName,
  searchCategory,
  products,
  setRemove,
  setModal,
  setProduct,
  setCurrentPage,
  countPage,
  setCountPage,
  currentProducts,
  setCurrentProducts,
  currentPage,
  setPageSize,
  loading,
  tableExcel,
  setImports,
  setModal2,
  categories,
  producttypes,
  product,
  searchBrand,
  selectRef,
  market,
  connectorCount,
}) => {
  const edit = (e, p) => {
    selectRef.category.current.selectOption({
      label: p.category.code,
      value: p.category._id,
    });
    selectRef.producttype.current.selectOption({
      label: p.producttype.name,
      value: p.producttype._id,
    });
    selectRef.brand.current.selectOption({
      label: p.brand.name,
      value: p.brand._id,
    });
    selectRef.unit.current.selectOption({
      label: p.unit.name,
      value: p.unit._id,
    });
    setProduct({
      market: market && market._id,
      _id: p._id,
      name: p.name,
      code: p.code,
      category: p.category._id,
      unit: p.unit._id,
      producttype: p.producttype._id,
      brand: p.brand ? p.brand._id : "",
      total: p.total || 0,
      priceid: (p.price && p.price._id) || 0,
      incomingprice: p.price.incomingprice || 0,
      sellingprice: p.price.sellingprice || 0,
    });
  };

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
                    placeholder={t("Bo'limni tanlang")}
                    onChange={setPageSize}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th>
                  <input
                    onChange={searchCategory}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder={t("Kategoriya")}
                  />
                </th>
                <th>
                  <input
                    onChange={searchProductTypeAndProductName}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder={t("Mahsulot turi")}
                  />
                </th>
                <th>
                  <input
                    onChange={searchBrand}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder={t("Brend")}
                  />
                </th>
                <th className="text-center" colSpan={2}>
                  <Pagination
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={connectorCount.count}
                  />
                </th>
                <th className="text-center">
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
                <th className="text-center">
                  <ExcelUpload
                    setData={setImports}
                    setModal={setModal2}
                    loading={loading}
                  />
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border text-center">№</th>
                <th className="border text-center">
                  {t("Kategoriya")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            a.category.code > b.category.code ? 1 : -1
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
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            b.category.code > a.category.code ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border text-center">
                  {t("Mahsulot turi va mahsulot")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
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
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            b.producttype.name > a.producttype.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border text-center">
                  {t("Brend")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
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
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            b.brand.name > a.brand.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border text-center">
                  {t("Soni - O'.B.")}
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            a.unit.name > b.unit.name ? 1 : -1
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
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            b.uni.name > a.unit.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border text-center">
                  Olish
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            a.unit.name > b.unit.name ? 1 : -1
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
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            b.uni.name > a.unit.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border text-center">
                  Sotish
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            a.unit.name > b.unit.name ? 1 : -1
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
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            b.uni.name > a.unit.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border text-center">{t("Tahrirlash")}</th>
                <th className="border text-center">{t("O'chirish")}</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts &&
                currentProducts.map((p, key) => {
                  return (
                    <tr key={key}>
                      <td className="border font-bold text-center text-black">
                        {currentPage * countPage + key + 1}
                      </td>
                      <td className="border text-center font-bold text-black">
                        {p.category.code} {p.code}
                      </td>
                      <td className="border text-black px-5 font-bold ">
                        <span className="uppercase ">
                          {p.producttype && p.producttype.name}
                        </span>{" "}
                        - {p.name}
                      </td>
                      <td className="border text-center font-bold text-black">
                        {p.brand && p.brand.name}
                      </td>
                      <td className="border text-center font-bold text-black">
                        {p.total} {p.unit.name}
                      </td>
                      <td className="border text-center font-bold text-black">
                        {(p.price && p.price.incomingprice) || 0} $
                      </td>
                      <td className="border text-center font-bold text-black">
                        {(p.price && p.price.sellingprice) || 0} $
                      </td>
                      <td className="border text-center text-base">
                        {loading ? (
                          <button className="btn btn-success py-1 px-2">
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            id={`btn${key}`}
                            onClick={(e) => {
                              edit(e, p);
                            }}
                            className="btn btn-success py-1 px-4"
                          >
                            <FontAwesomeIcon
                              className="text-base"
                              icon={faPenAlt}
                            />
                          </button>
                        )}
                      </td>
                      <td className="text-center border">
                        {loading ? (
                          <button
                            className="btn btn-secondary py-1 px-4"
                            disabled
                          >
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setRemove(p);
                              setModal(true);
                            }}
                            className="btn btn-secondary py-1 px-4"
                          >
                            <FontAwesomeIcon
                              className="text-base"
                              icon={faTrashCan}
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="d-none">
            <ExcelTable data={tableExcel} id="products-table" />
          </div>
        </div>
      </div>
    </div>
  );
};
