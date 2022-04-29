import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { Sort } from "./Sort";
import { Pagination } from "../../components/Pagination";
import { DatePickers } from "./DatePickers";

export const TableClients = ({
  setVisible,
  setModal1,
  setCheck,
  changeStart,
  changeEnd,
  searchPhone,
  setClient,
  searchId,
  searchFullname,
  searchProbirka,
  connectors,
  setConnector,
  setCurrentPage,
  countPage,
  currentConnectors,
  setCurrentConnectors,
  currentPage,
  setPageSize,
  loading,
  setPostRoomBody,
  setModal2,
  searchBornDay,
  searchFinished,
  searchDoctor,
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
                    onChange={searchFullname}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder="F.I.O"
                  />
                </th>
                <th>
                  <input
                    onChange={searchBornDay}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder="Tug'ilgan yili"
                  />
                </th>
                <th>
                  <input
                    onChange={searchPhone}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder="Tel"
                  />
                </th>
                <th>
                  <input
                    onChange={searchId}
                    style={{ maxWidth: "60px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder="ID"
                  />
                </th>
                <th>
                  <input
                    onChange={searchDoctor}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder="Shifokor"
                  />
                </th>
                <th className="text-center">
                  <Pagination
                    setCurrentDatas={setCurrentConnectors}
                    datas={connectors}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={connectors.length}
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
                <th className="text-center" style={{ maxWidth: "120px" }}>
                  <select
                    className="form-control form-control-sm selectpicker"
                    placeholder="Doctors"
                    onChange={searchFinished}
                  >
                    <option value={"hammasi"}>Hammasi</option>
                    <option value={"tugalgan"}>Tugalgan</option>
                    <option value={"tugalmagan"}>Tugalmagan</option>
                  </select>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border py-1">№</th>
                <th className="border py-1">
                  F.I.O
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.fullname > b.client.fullname ? 1 : -1
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
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.fullname > a.client.fullname ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Tug'ilgan yili
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.born.toLocaleDateString() >
                            b.client.toLocaleDateString()
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
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.born.toLocaleDateString() >
                            a.client.born.toLocaleDateString()
                              ? 1
                              : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Tel
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.phone > b.client.phone ? 1 : -1
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
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.phone > a.client.phone ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  ID
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.id > b.client.id ? 1 : -1
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
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.id > a.client.id ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Shikokor
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.doctor.fullname > b.doctor.fullname ? 1 : -1
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
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.doctor.fullname > a.doctor.fullname ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Kelgan vaqti
                  <Sort
                    data={currentConnectors}
                    setData={setCurrentConnectors}
                    property={"createdAt"}
                  />
                </th>
                <th className="border py-1">Qo'shish</th>
                <th className="border py-1 text-center">Chek</th>
                <th className="border py-1 text-center">Tugatish</th>
              </tr>
            </thead>
            <tbody>
              {currentConnectors.map((connector, key) => {
                return (
                  <tr key={key}>
                    <td
                      className="border py-1 font-weight-bold text-right"
                      style={{ maxWidth: "30px !important" }}
                    >
                      {currentPage * countPage + key + 1}
                    </td>
                    <td className="border py-1 font-weight-bold">
                      {connector.client.fullname}
                    </td>
                    <td className="border py-1 text-right">
                      {new Date(connector.client.born).toLocaleDateString()}
                    </td>
                    <td className="border py-1 text-right">
                      +998{connector.client.phone}
                    </td>
                    <td className="border py-1 text-right">
                      {connector.client.id}
                    </td>
                    <td className="border py-1">
                      {connector.doctor.lastname +
                        " " +
                        connector.doctor.firstname}
                    </td>
                    <td className="border py-1 text-right">
                      {new Date(connector.createdAt).toLocaleDateString()}{" "}
                      {new Date(connector.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="border py-1 text-center">
                      {loading ? (
                        <button className="btn btn-success" disabled>
                          <span className="spinner-border spinner-border-sm"></span>
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="btn btn-success py-0"
                          onClick={() => {
                            setClient(connector.client);
                            setConnector({
                              ...connector,
                              _id: connector._id,
                              services: [...connector.services],
                            });
                            setVisible(true);
                          }}
                        >
                          +
                        </button>
                      )}
                    </td>

                    <td className="border py-1 text-center">
                      {loading ? (
                        <button className="btn btn-primary" disabled>
                          <span className="spinner-border spinner-border-sm"></span>
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary py-0"
                          onClick={() => {
                            setCheck(connector);
                            setModal1(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPrint} />
                        </button>
                      )}
                    </td>
                    <td className="border py-1 text-center">
                      {connector.room.endday ? (
                        "Tugalgan"
                      ) : loading ? (
                        <button className="btn btn-danger" disabled>
                          <span className="spinner-border spinner-border-sm"></span>
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger py-0"
                          onClick={() => {
                            setPostRoomBody(connector.room);
                            setModal2(true);
                          }}
                        >
                          Tugatish
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
