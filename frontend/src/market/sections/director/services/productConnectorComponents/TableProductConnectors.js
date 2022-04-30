import React from "react";
import { Sort } from "./Sort";
import { Tooltip } from "@chakra-ui/react";
import { Pagination } from "../../components/Pagination";

export const TableProductConnectors = ({
  productConnector,
  searchProduct,
  searchService,
  productConnectors,
  setRemove,
  setModal,
  setProductConnectors,
  setProductConnector,
  setCurrentPage,
  countPage,
  setCountPage,
  currentProductConnectors,
  setCurrentProductConnectors,
  currentPage,
  setPageSize,
  departments,
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
                    onChange={searchService}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder=""
                  />
                </th>
                <th>
                  <input
                    onChange={searchProduct}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder=""
                    aria-controls="basicExample"
                  />
                </th>
                <th>
                  <Pagination
                    setCurrentDatas={setCurrentProductConnectors}
                    datas={productConnectors}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={productConnectors.length}
                  />
                </th>
                {/* <th>
                  <Tooltip
                    hasArrow
                    label="Barcha xizmatlarni import qilish"
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
                    label="Barcha xizmatlarni o'chirish"
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
                  Xizmt nomi
                  <div className="btn-group-vertical ml-2">
                    <Sort
                      data={currentProductConnectors}
                      setData={setCurrentProductConnectors}
                      property={"service"}
                    />
                  </div>
                </th>
                <th className="border-right">
                  Mahsulot nomi
                  <Sort
                    data={currentProductConnectors}
                    setData={setCurrentProductConnectors}
                    property={"product"}
                  />
                </th>
                <th className="border-right">
                  Soni
                  <Sort
                    data={currentProductConnectors}
                    setData={setCurrentProductConnectors}
                    property={"pieces"}
                  />
                </th>
                <th className="text-center">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {currentProductConnectors.map((productConnector, key) => {
                return (
                  <tr key={key}>
                    <td className="border-right font-weight-bold">
                      {currentPage * countPage + key + 1}
                    </td>
                    <td className="border-right">
                      {productConnector.service.name}
                    </td>
                    <td className="border-right">
                      {productConnector.product.name}
                    </td>
                    <td className="border-right">{productConnector.pieces}</td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setRemove(productConnector);
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
