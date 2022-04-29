import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Sort } from "./Sort";
import { Tooltip } from "@chakra-ui/react";
import { ExcelUpload } from "./ExcelUpload";
import { Pagination } from "../../components/Pagination";

export const TableServices = ({
  servicetypes,
  searchDepartment,
  searchName,
  services,
  setRemove,
  setModal,
  setServices,
  setService,
  setCurrentPage,
  countPage,
  setCountPage,
  currentServices,
  setCurrentServices,
  currentPage,
  setPageSize,
  departments,
  setModal1,
  setImports,
  setModal2,
  loading
}) => {
  const edit = (e, service) => {
    setService(service);
    const index = departments.findIndex(
      (d) => service.department._id === d._id
    );
    document.getElementsByTagName("select")[0].selectedIndex = index + 1;

    const i = departments[index].servicetypes.findIndex(
      (d) => service.servicetype && service.servicetype._id === d._id
    );

    document.getElementsByTagName("select")[1].selectedIndex = i + 1;
    // Xatolik bor birinchi mareta tahrirlash bosilganda xizmat turi tanlay olinmaydi
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
                    style={{  minWidth: "50px" }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th>
                  <input
                    onChange={searchDepartment}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder=""
                  />
                </th>
                <th>
                  <input
                    onChange={searchName}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder=""
                    aria-controls="basicExample"
                  />
                </th>
                <th colSpan={6}>
                  <Pagination
                    setCurrentDatas={setCurrentServices}
                    datas={services}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={services.length}
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
                    {loading ? <button className='btn btn-danger' disabled>
                      <span class="spinner-border spinner-border-sm"></span>
                      Loading...
                    </button> :
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
                  Bo'lim
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentServices(
                          [...currentServices].sort((a, b) =>
                            a.department.name > b.department.name ? 1 : -1
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
                        setCurrentServices(
                          [...currentServices].sort((a, b) =>
                            b.department.name > a.department.name ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border-right">
                  Xizmat turi
                  <Sort
                    data={currentServices}
                    setData={setCurrentServices}
                    property={"serveicetype"}
                  />
                </th>
                <th className="border-right">
                  Xizmat
                  <Sort
                    data={currentServices}
                    setData={setCurrentServices}
                    property={"name"}
                  />
                </th>
                <th className="border-right">
                  Qisqartma nomi
                  <Sort
                    data={currentServices}
                    setData={setCurrentServices}
                    property={"shortname"}
                  />
                </th>
                <th className="border-right">
                  Narxi
                  <Sort
                    data={currentServices}
                    setData={setCurrentServices}
                    property={"price"}
                  />
                </th>
                <th className="border-right">
                  Doktor ulushi
                  <Sort
                    data={currentServices}
                    setData={setCurrentServices}
                    property={"doctorProcient"}
                  />
                </th>
                <th className="border-right">
                  Kontragent ulushi
                  <div className="btn-group-vertical ml-2">
                    <Sort
                      data={currentServices}
                      setData={setCurrentServices}
                      property={"counterAgentProcient"}
                    />
                  </div>
                </th>
                <th className="border-right">
                  Kounterdoktor ulushi
                  <Sort
                    data={currentServices}
                    setData={setCurrentServices}
                    property={"counterDoctorProcient"}
                  />
                </th>
                <th className="border-right text-center">Tahrirlash</th>
                <th className="text-center">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {currentServices.map((service, key) => {
                return (
                  <tr key={key}>
                    <td className="border-right font-weight-bold">
                      {currentPage * countPage + key + 1}
                    </td>
                    <td className="border-right">{service.department.name}</td>
                    <td className="border-right">
                      {service.servicetype && service.servicetype.name}
                    </td>
                    <td className="border-right">{service.name}</td>
                    <td className="border-right">{service.shortname}</td>
                    <td className="border-right">{service.price}</td>
                    <td className="border-right">{service.doctorProcient}</td>
                    <td className="border-right">
                      {service.counterAgentProcient}
                    </td>
                    <td className="border-right">
                      {service.counterDoctorProcient}
                    </td>
                    <td className="border-right text-center">
                      <button
                        id={`btn${key}`}
                        onClick={(e) => {
                          edit(e, service);
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
                          setRemove(service);
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
