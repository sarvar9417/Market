import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../components/Pagination";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ExcelTable } from "./ExcelTable";
import { ExcelUpload } from "../productComponents/ExcelUpload";

export const TableProduct = ({
  searchName,
  searchProductType,
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
}) => {
  const edit = (e, p) => {
    setProduct({
      ...product,
      _id: p._id,
      name: p.name,
      code: p.code,
      category: p.category._id,
      unit: p.unit._id,
      producttype: p.producttype._id,
      brand: p.brand ? p.brand._id : "",
      price: p.price && p.price,
    });
    for (let option of document.getElementsByTagName("select")[0].options) {
      if (option.value === p.category._id) {
        option.selected = true;
      }
    }
    for (let option of document.getElementsByTagName("select")[3].options) {
      if (option.value === p.unit._id) {
        option.selected = true;
      }
    }
    for (let option of document.getElementsByTagName("select")[1].options) {
      if (option.value === p.producttype._id) {
        option.selected = true;
      }
    }
    if (p.brand) {
      for (let option of document.getElementsByTagName("select")[2].options) {
        if (option.value === p.brand._id) {
          option.selected = true;
        }
      }
    }
  };

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
                    onChange={searchCategory}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder="Kategoriya"
                  />
                </th>
                <th>
                  <input
                    onChange={searchProductType}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder="Mahsulot turi"
                  />
                </th>
                <th>
                  <input
                    onChange={searchBrand}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder="Brand"
                  />
                </th>
                <th className="text-center">
                  <Pagination
                    setCurrentDatas={setCurrentProducts}
                    datas={products}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={products.length}
                  />
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
                <th className="text-center">
                  <ExcelUpload
                    setData={setImports}
                    setModal={setModal2}
                    loading={loading}
                  />
                </th>
                <th></th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border-right">№</th>
                <th className="border-right" style={{ maxWidth: "200px" }}>
                  Kategoriya
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
                <th className="border-right" style={{ maxWidth: "200px" }}>
                  Mahsulot turi va mahsulot
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
                <th className="border-right" style={{ maxWidth: "200px" }}>
                  Brend
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
                <th className="border-right">
                  Mahsulot o'lchov birliki
                  <div
                    className="btn-group-vertical ml-2"
                    style={{ maxWidth: "30px" }}
                  >
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
                <th className="border-right">
                  Narxi
                  <div
                    className="btn-group-vertical ml-2"
                    style={{ maxWidth: "30px" }}
                  >
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
                <th className="border-right text-center">Tahrirlash</th>
                <th className="text-center">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts &&
                currentProducts.map((p, key) => {
                  return (
                    <tr key={key}>
                      <td
                        className="border-right font-weight-bold"
                        style={{ width: "10%" }}
                      >
                        {currentPage * countPage + key + 1}
                      </td>
                      <td className="border-right">
                        {p.category.code} {p.code}
                      </td>
                      <td className="border-right">
                        {p.producttype && p.producttype.name} {p.name}
                      </td>
                      <td className="border-right">
                        {p.brand && p.brand.name}
                      </td>
                      <td className="border-right mx-auto">
                        {p.total && p.total} {p.unit.name}
                      </td>
                      <td className="border-right mx-auto">
                        {(p.price && p.price) || 0}
                      </td>
                      <td className="border-right text-center">
                        {loading ? (
                          <button
                            className="btn btn-success py-1 px-2"
                            style={{ fontSize: "75%" }}
                          >
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            id={`btn${key}`}
                            onClick={(e) => {
                              edit(e, p);
                            }}
                            className="btn btn-success py-1 px-2"
                            style={{ fontSize: "75%" }}
                          >
                            Tahrirlash
                          </button>
                        )}
                      </td>
                      <td className="text-center">
                        {loading ? (
                          <button
                            className="btn btn-secondary py-1 px-2"
                            style={{ fontSize: "75%" }}
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
                            className="btn btn-secondary py-1 px-2"
                            style={{ fontSize: "75%" }}
                          >
                            O'chirish
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
