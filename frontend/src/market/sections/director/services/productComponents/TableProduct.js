import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../components/Pagination";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

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
}) => {
  return (
    <div className="table-container">
      <div className="table-container">
        <div className="table-responsive">
          <table className="table m-0" id="products-table">
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
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder="Mahsulot turi"
                    aria-controls="basicExample"
                  />
                </th>
                <th>
                  <input
                    onChange={searchName}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder="Mahsulot"
                    aria-controls="basicExample"
                  />
                </th>
                <th>
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
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border-right">№</th>
                <th className="border-right">
                  Kategoriya
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
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
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            b.category.name > a.category.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  Mahsulot turi
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
                <th className="border-right">
                  Mahsulot
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            a.name > b.name ? 1 : -1
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
                            b.name > a.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  Mahsulot kodi
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentProducts(
                          [...currentProducts].sort((a, b) =>
                            a.code > b.code ? 1 : -1
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
                            b.code > a.code ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  Mahsulot o'lchov birliki
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
                <th className="border-right text-center">Tahrirlash</th>
                <th className="text-center">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts &&
                currentProducts.map((p, key) => {
                  return (
                    <tr key={key}>
                      <td className="border-right font-weight-bold">
                        {currentPage * countPage + key + 1}
                      </td>
                      <td className="border-right">{p.category.name}</td>
                      <td className="border-right">
                        {p.producttype && p.producttype.name}
                      </td>
                      <td className="border-right">{p.name}</td>
                      <td className="border-right">{p.code}</td>
                      <td className="border-right">{p.unit.name}</td>
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
                            onClick={() => setProduct(p)}
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
                            Saqlash
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};