import React, { useCallback, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Modal } from "../products/modal/Modal";
import {
  faFloppyDisk,
  faPenAlt,
  faRepeat,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Pagination } from "./components/Pagination";
import { Sort } from "../components/Sort";
import { checkPackman } from "./checkData";
import { t } from "i18next";

export const Packman = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const toast = useToast();

  const notify = useCallback(
    (data) => {
      toast({
        title: data.title && data.title,
        description: data.description && data.description,
        status: data.status && data.status,
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
    [toast]
  );

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const { loading, request } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const indexLastPackman = (currentPage + 1) * countPage;
  const indexFirstPackman = indexLastPackman - countPage;

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  //====================================================================

  const [packman, setPackman] = useState({
    market: auth.market && auth.market._id,
  });

  //====================================================================

  const changeHandler = (e) => {
    setPackman({ ...packman, name: e.target.value });
  };

  //====================================================================

  const clearInputs = useCallback(() => {
    setPackman({
      market: auth.market && auth.market._id,
    });
  }, [auth.market]);

  //====================================================================

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      return saveHandler();
    }
  };

  //====================================================================

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
    setCurrentPackmans(packmans.slice(0, e.target.value));
  };

  //====================================================================

  const searchPackman = (e) => {
    const searching = searchStorage.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setPackmans(searching);
    setCurrentPackmans(searching);
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const saveHandler = () => {
    if (checkPackman(packman)) {
      return notify(checkPackman(packman));
    }

    if (packman._id) {
      return updatePackman();
    } else {
      return createPackman();
    }
  };

  //====================================================================
  //====================================================================

  const [packmans, setPackmans] = useState([]);
  const [currentPackmans, setCurrentPackmans] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  const getPackmans = useCallback(async () => {
    try {
      const data = await request(
        "/api/sales/packman/getall",
        "POST",
        { market: auth.market && auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setPackmans(data);
      setSearchStorage(data);
      setCurrentPackmans(data.slice(indexFirstPackman, indexLastPackman));
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, notify, indexFirstPackman, indexLastPackman, request]);

  //====================================================================
  //====================================================================

  const [connectorCount, setConnectorCount] = useState(0);

  const getConnectorsCount = useCallback(async () => {
    try {
      const data = await request(
        "/api/sales/packman/getcount",
        "POST",
        { market: auth.market && auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setConnectorCount(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, notify, request]);

  const getConnectors = useCallback(async () => {
    try {
      const data = await request(
        "/api/sales/packman/getconnectors",
        "POST",
        { market: auth.market._id, currentPage, countPage },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrentPackmans(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, notify, currentPage, countPage]);

  useEffect(() => {
    getConnectors();
  }, [getConnectors, currentPage, countPage]);

  //====================================================================
  //====================================================================

  const createPackman = async () => {
    try {
      const data = await request(
        "/api/sales/packman/register",
        "POST",
        { ...packman },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      getConnectors();
      clearInputs();
      setPackman({
        market: auth.market && auth.market._id,
      });
      notify({
        title: `${data.name} ${t("degan yetkazuvchi yaratildi!")}`,
        description: "",
        status: "success",
      });
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  };

  //====================================================================
  //====================================================================

  const updatePackman = async () => {
    try {
      const data = await request(
        "/api/sales/packman/update",
        "PUT",
        { ...packman },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      clearInputs();
      setPackman({
        market: auth.market && auth.market._id,
      });
      getConnectors();
      notify({
        title: `${data.name} ${t("degan yetkazuvchi yangilandi!")}`,
        description: "",
        status: "success",
      });
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  };

  //====================================================================
  //====================================================================

  const deletePackman = async () => {
    try {
      const data = await request(
        "/api/sales/packman/delete",
        "DELETE",
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setRemove({
        market: auth.market && auth.market._id,
      });
      getConnectors();
      notify({
        title: `${data.name} ${t("degan yetkazuvchi o'chirildi!")}`,
        description: "",
        status: "success",
      });
      setModal(false);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  };

  //====================================================================
  //====================================================================

  const [n, setN] = useState(false);
  useEffect(() => {
    if (!n) {
      getPackmans();
      getConnectorsCount();
      setN(true);
    }
  }, [getPackmans, n, getConnectorsCount]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  return (
    <>
      <div className="content-wrapper px-lg-5 px-3">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="table-container">
              <div className="table-responsive">
                <table className="table m-0">
                  <thead>
                    <tr>
                      <th className="border text-center">{t("Yetkazuvchi")}</th>
                      <th className="border text-center">{t("Saqlash")}</th>
                      <th className="border text-center">{t("Tozalash")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border text-center">
                      <td className="border text-center">
                        <input
                          name="name"
                          value={packman.name || ""}
                          onKeyUp={keyPressed}
                          onChange={changeHandler}
                          type="text"
                          className="focus: outline-none focus:ring focus:border-blue-500 rounded py-1 px-3"
                          id="name"
                          placeholder={t("Yetkazuvchini kiriting")}
                        />
                      </td>
                      <td className="border text-center">
                        {loading ? (
                          <button className="btn btn-success" disabled>
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={saveHandler}
                            className="btn btn-success py-1 px-4"
                          >
                            <FontAwesomeIcon
                              className="text-base"
                              icon={faFloppyDisk}
                            />
                          </button>
                        )}
                      </td>
                      <td className="border text-center">
                        {loading ? (
                          <button className="btn btn-success" disabled>
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={clearInputs}
                            className="btn btn-secondary py-1 px-4"
                          >
                            <FontAwesomeIcon
                              className="text-base"
                              icon={faRepeat}
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
                          className="form-control"
                          type="search"
                          onChange={searchPackman}
                          style={{ maxWidth: "100px" }}
                          placeholder={t("Yetkazuvchilar")}
                        />
                      </th>
                      <th className="text-center">
                        <Pagination
                          setCurrentPage={setCurrentPage}
                          countPage={countPage}
                          totalDatas={connectorCount.count}
                        />
                      </th>
                      {/* <th className="text-center">
                        <div className="btn btn-primary">
                          <ReactHtmlTableToExcel
                            id="reacthtmltoexcel"
                            table="brand-excel-table"
                            sheet="Sheet"
                            buttonText="Excel"
                            filename="Brendlar"
                          />
                        </div>
                      </th> */}
                    </tr>
                  </thead>
                  <thead>
                    <tr className="border text-center">
                      <th className="border text-center">№</th>
                      <th className="border text-center">
                        {t("Yetkazuvchi")}{" "}
                        <Sort
                          data={packmans}
                          setData={setPackmans}
                          property={"name"}
                        />
                      </th>
                      <th className="border text-center">{t("Tahrirlash")}</th>
                      <th className="border text-center">{t("O'chirish")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPackmans &&
                      currentPackmans.map((s, key) => {
                        return (
                          <tr className="border text-center" key={key}>
                            <td className="border text-center font-bold text-bold text-black">
                              {currentPage * countPage + key + 1}
                            </td>
                            <td className="border text-center font-bold text-bold text-black">
                              {s.name}
                            </td>
                            <td className="border text-center">
                              <button
                                onClick={() => {
                                  setPackman({ ...s });
                                }}
                                className="btn btn-success py-1 px-4"
                                style={{ fontSize: "75%" }}
                              >
                                <FontAwesomeIcon
                                  className="text-base"
                                  icon={faPenAlt}
                                />
                              </button>
                            </td>
                            <td className="border text-center">
                              <button
                                onClick={() => {
                                  setRemove({ ...s });
                                  setModal(true);
                                }}
                                className="btn btn-secondary py-1 px-4"
                              >
                                <FontAwesomeIcon
                                  className="text-base"
                                  icon={faTrashCan}
                                />
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
        </div>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={t("yetkazuvchini o'chirishni tasdiqlaysizmi?")}
        handler={deletePackman}
      />
    </>
  );
};
