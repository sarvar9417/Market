import React from "react";
import { Sort } from "./Sort";
import { Tooltip } from "@chakra-ui/react";
import { ExcelUpload } from "./ExcelUpload";
import { Pagination } from "../../components/Pagination";

export const TableProducts = ({
  searchName,
  products,
  setRemove,
  setModal,
  setProducts,
  setProduct,
  setCurrentPage,
  countPage,
  setCountPage,
  currentProducts,
  setCurrentProducts,
  currentPage,
  setPageSize,
  setModal1,
  setImports,
  setModal2,
  loading
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
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th>
                  <input
                    onChange={searchName}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder=""
                  />
                </th>
                <th colSpan={3}>
                  <Pagination
                    setCurrentDatas={setCurrentProducts}
                    datas={products}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={products.length}
                  />
                </th>
                <th className="text-center">
                  <ExcelUpload setData={setImports} setModal={setModal2} loading={loading} />
                </th>
                {/* <th>
                  <Tooltip
                    hasArrow
                    label="Barcha mahsulotlarni import qilish"
                    bg="blue.400"
                  >
                    <button
                      onClick={() => setModal1(true)}
                      className="btn btn-info py-1 px-3 pt-1 align-middle"
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        style={{ fontSize: "12pt" }}
                        icon={faFileExcel}
                      />
                      Export
                    </button>
                  </Tooltip>
                </th> */}
                <th className="text-center">
                  <Tooltip
                    hasArrow
                    label="Barcha mahsulotlarni o'chirish"
                    bg="red.500"
                  >
                    {loading ? <button className="btn btn-danger" disabled>
                      <span class="spinner-border spinner-border-sm"></span>
                      Loading...
                    </button>
                      :
                    <button
                      onClick={() => setModal1(true)}
                      className="btn btn-danger py-0 px-3 pt-1"
                    >
                      <span className="icon-trash-2"></span>
                    </button>
                    }
                  </Tooltip>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border-right">№</th>
                <th className="border-right">
                  Nomi
                  <div className="btn-group-vertical ml-2">
                    <Sort
                      data={currentProducts}
                      setData={setCurrentProducts}
                      property={"name"}
                    />
                  </div>
                </th>
                <th className="border-right">
                  O'lchov birligi
                  <Sort
                    data={currentProducts}
                    setData={setCurrentProducts}
                    property={"unit"}
                  />
                </th>
                <th className="border-right">
                  Narxi
                  <Sort
                    data={currentProducts}
                    setData={setCurrentProducts}
                    property={"price"}
                  />
                </th>
                <th className="border-right">
                  Soni
                  <Sort
                    data={currentProducts}
                    setData={setCurrentProducts}
                    property={"total"}
                  />
                </th>
                <th className="border-right text-center">Tahrirlash</th>
                <th className="text-center">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, key) => {
                return (
                  <tr key={key}>
                    <td className="border-right font-weight-bold">
                      {currentPage * countPage + key + 1}
                    </td>
                    <td className="border-right">{product.name}</td>
                    <td className="border-right">{product.unit}</td>
                    <td className="border-right">{product.price}</td>
                    <td className="border-right">{product.total}</td>
                    <td className="border-right text-center">
                      <button
                        id={`btn${key}`}
                        onClick={(e) => {
                          setProduct(product)
                        }}
                        type="button"
                        className="btn btn-success py-1 px-2"
                        style={{ fontSize: "75%" }}
                      >
                        Tahrirlash
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setRemove(product);
                          setModal(true);
                        }}
                        type="button"
                        className="btn btn-secondary py-1 px-2"
                        style={{ fontSize: "75%" }}
                      >
                        O'chirish
                      </button>
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
