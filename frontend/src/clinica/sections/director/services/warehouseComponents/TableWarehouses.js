import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Sort } from "./Sort";
import { Tooltip } from "@chakra-ui/react";
import { ExcelUpload } from "./ExcelUpload";
import { Pagination } from "../../components/Pagination";

export const TableWarehouses = ({
  searchProduct,
  products,
  setRemove,
  setModal,
  setWarehouses,
  setWarehouse,
  setCurrentPage,
  countPage,
  setCountPage,
  currentWarehouses,
  setCurrentWarehouses,
  currentPage,
  setPageSize,
  setModal1,
  warehouses,
  setImports,
  setModal2,
  loading
}) => {
  const edit = (e, warehouse) => {
    setWarehouse(warehouse);
    const index = products.findIndex((d) => warehouse.product._id === d._id);
    document.getElementsByTagName("select")[0].selectedIndex = index + 1;
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
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th>
                  <input
                    onChange={searchProduct}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder=""
                  />
                </th>
                <th colSpan={3}>
                  <Pagination
                    setCurrentDatas={setCurrentWarehouses}
                    datas={warehouses}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={warehouses.length}
                  />
                </th>
                <th className="text-center">
                  <ExcelUpload setData={setImports} setModal={setModal2} loading={loading} />
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
                  Mahsulot
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentWarehouses(
                          [...currentWarehouses].sort((a, b) =>
                            a.product &&
                            b.product &&
                            a.product.name > b.product.name
                              ? 1
                              : -1
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
                        setCurrentWarehouses(
                          [...currentWarehouses].sort((a, b) =>
                            a.product &&
                            b.product &&
                            b.product.name > a.product.name
                              ? 1
                              : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  Soni
                  <Sort
                    data={currentWarehouses}
                    setData={setCurrentWarehouses}
                    property={"total"}
                  />
                </th>
                <th className="border-right">
                  Narxi
                  <Sort
                    data={currentWarehouses}
                    setData={setCurrentWarehouses}
                    property={"price"}
                  />
                </th>
                <th className="border-right">
                  Keltirilgan vaqti
                  <Sort
                    data={currentWarehouses}
                    setData={setCurrentWarehouses}
                    property={"dateofreciept"}
                  />
                </th>
                <th className="border-right text-center">Tahrirlash</th>
                <th className="text-center">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {currentWarehouses && currentWarehouses.map((warehouse, key) => {
                return (
                  <tr key={key}>
                    <td className="border-right font-weight-bold">
                      {currentPage * countPage + key + 1}
                    </td>
                    <td className="border-right">
                      {warehouse.product && warehouse.product.name}
                    </td>
                    <td className="border-right">{warehouse.total}</td>
                    <td className="border-right">{warehouse.price}</td>
                    <td className="border-right">
                      {warehouse.dateofreciept.day}.
                      {warehouse.dateofreciept.month < 9
                        ? "0" + (warehouse.dateofreciept.month + 1)
                        : warehouse.dateofreciept.month + 1}
                      .{warehouse.dateofreciept.year}
                    </td>
                    <td className="border-right text-center">
                      <button
                        id={`btn${key}`}
                        onClick={(e) => {
                          edit(e, warehouse);
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
                          setRemove(warehouse);
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
