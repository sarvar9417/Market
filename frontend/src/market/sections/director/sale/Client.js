import { useToast } from "@chakra-ui/react";
import { Modal } from "../products/modal/Modal";
import {
  faFloppyDisk,
  faPenAlt,
  faRepeat,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Pagination } from "./components/Pagination";
import { Sort } from "../components/Sort";
import { checkClient } from "./checkData";
import { t } from "i18next";

export const Client = () => {
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

  const indexLastClient = (currentPage + 1) * countPage;
  const indexFirstClient = indexLastClient - countPage;

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  //====================================================================

  const [client, setClient] = useState({
    market: auth.market && auth.market._id,
  });

  //====================================================================

  const changeHandler = (e) => {
    setClient({ ...client, name: e.target.value });
  };

  const selectHandler = (e) => {
    if (e.target.value === "delete") {
      setClient({ ...client, packman: null });
    } else {
      setClient({ ...client, packman: e.target.value });
    }
  };

  const updateInputs = (client) => {
    setClient({
      market: auth.market && auth.market._id,
      ...client,
    });
    if (client.packman) {
      for (const option of document.getElementsByTagName("select")[0]) {
        if (option.value === client.packman._id) {
          option.selected = true;
        }
      }
    }
  };

  const deleteHandler = (client) => {
    setRemove({
      market: auth.market && auth.market._id,
      name: client.name,
      _id: client._id,
      packman: client.packman ? client.packman._id : null,
    });
  };

  //====================================================================

  const clearInputs = useCallback(() => {
    setClient({
      market: auth.market && auth.market._id,
    });

    for (let option of document.getElementsByTagName("select")[0].options) {
      if (option.value === "delete") {
        option.selected = true;
      }
    }
  }, [auth.market]);

  //====================================================================

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      return saveHandler();
    }
  };

  //====================================================================

  const changeData = (method, data) => {
    let arr = [];
    if (method === "POST") {
      arr = [{ ...data }, ...searchStorage];
    }
    if (method === "UPDATE") {
      arr = searchStorage.map((item) => {
        if (item._id === data._id) {
          return (item = { ...data });
        }
        return item;
      });
    }
    if (method === "DELETE") {
      arr = searchStorage.filter((item) => item._id !== data._id);
    }
    setClients(arr);
    setCurrentClients(arr);
    setSearchStorage(arr);
  };

  //====================================================================

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
    setCurrentClients(clients.slice(0, e.target.value));
  };

  //====================================================================

  const searchClient = (e) => {
    const searching = searchStorage.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setClients(searching);
    setCurrentClients(searching);
  };

  const searchPackman = (e) => {
    const searching = searchStorage.filter(
      (item) =>
        item.packman &&
        item.packman.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setClient(searching);
    setCurrentClients(searching);
  };

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
      setCurrentClients(data);
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

  const saveHandler = () => {
    if (checkClient(client)) {
      return notify(checkClient(client));
    }

    if (client._id) {
      return updateClient();
    } else {
      return createClient();
    }
  };

  const [clients, setClients] = useState([]);
  const [currentClients, setCurrentClients] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  const getClients = useCallback(async () => {
    try {
      const data = await request(
        "/api/sales/client/getall",
        "POST",
        { market: auth.market && auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setClients(data);
      setSearchStorage(data);
      setCurrentClients(data.slice(indexFirstClient, indexLastClient));
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, notify, indexFirstClient, indexLastClient, request]);

  const [packmans, setPackmans] = useState([]);

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
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [notify, auth, request]);

  const createClient = async () => {
    try {
      const data = await request(
        "/api/sales/client/register",
        "POST",
        { ...client },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      changeData("POST", data);
      clearInputs();
      setClient({
        market: auth.market && auth.market._id,
      });
      notify({
        title: `${data.name} ${t("nomli mijoz yaratildi!")}`,
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

  const updateClient = async () => {
    try {
      const data = await request(
        "/api/sales/client/update",
        "PUT",
        { ...client },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      changeData("UPDATE", data);
      clearInputs();
      setClient({
        market: auth.market && auth.market._id,
      });
      notify({
        title: `${data.name} ${t("nomli mijoz yangilandi!")}`,
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

  const deleteClient = async () => {
    try {
      const data = await request(
        "/api/sales/client/delete",
        "DELETE",
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("nomli mijoz o'chirildi!")}`,
        description: "",
        status: "success",
      });
      changeData("DELETE", data);
      setRemove({
        market: auth.market && auth.market._id,
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

  const [n, setN] = useState(false);
  useEffect(() => {
    if (!n) {
      getClients();
      getPackmans();
      getConnectorsCount();
      setN(true);
    }
  }, [getClients, getPackmans, getConnectorsCount, n]);

  //====================================================================
  //====================================================================

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
                      <th className="border text-center">
                        {t("Yetkazuvchilar")}
                      </th>
                      <th className="border text-center">{t("Mijoz")}</th>
                      <th className="border text-center">{t("Saqlash")}</th>
                      <th className="border text-center">{t("Tozalash")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border text-center">
                      <td className="border text-center">
                        <div>
                          <select
                            onChange={(e) => {
                              selectHandler(e);
                            }}
                            placeholder={t("yetkazuvchini tanlang")}
                            className="form-control form-control-sm selectpicker"
                            style={{ minWidth: "50px" }}
                          >
                            <option value="delete">None</option>
                            {packmans.map((item, index) => {
                              return (
                                <option key={index} value={item._id}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </td>
                      <td className="border text-center">
                        <input
                          name="name"
                          value={client.name || ""}
                          onKeyUp={keyPressed}
                          onChange={changeHandler}
                          type="text"
                          className="focus: outline-none focus:ring focus:border-blue-500 rounded py-1 px-3"
                          id="name"
                          placeholder={t("Mijozni kiriting")}
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
                          <button className="btn btn-info" disabled>
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
                          placeholder={t("Yetkazuvchi")}
                        />
                      </th>
                      <th>
                        <input
                          className="form-control"
                          type="search"
                          onChange={searchClient}
                          style={{ maxWidth: "100px" }}
                          placeholder={t("Mijozlar")}
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
                          data={clients}
                          setData={setClients}
                          property={"name"}
                        />
                      </th>
                      <th className="border text-center">
                        {t("Mijoz")}{" "}
                        <Sort
                          data={clients}
                          setData={setClients}
                          property={"name"}
                        />
                      </th>
                      <th className="border text-center">{t("Tahrirlash")}</th>
                      <th className="border text-center">{t("O'chirish")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentClients &&
                      currentClients.map((s, key) => {
                        return (
                          <tr className="border text-center" key={key}>
                            <td className="border text-center font-bold text-bold text-black">
                              {currentPage * countPage + key + 1}
                            </td>
                            <td className="border text-center font-bold text-bold text-black">
                              {(s.packman && s.packman.name) || ""}
                            </td>
                            <td className="border text-center font-bold text-bold text-black">
                              {s.name}
                            </td>
                            <td className="border text-center">
                              <button
                                onClick={() => {
                                  updateInputs(s);
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
                                  deleteHandler(s);
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
        handler={deleteClient}
      />
    </>
  );
};
