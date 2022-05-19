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
import { Pagination } from "../components/Pagination";
import { Sort } from "../components/Sort";
import { checkClient } from "./checkData";

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

  //====================================================================

  const clearInputs = useCallback(() => {
    setClient({
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

  //====================================================================
  //====================================================================

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
      clearInputs();
      getClients();
      setClient({
        market: auth.market && auth.market._id,
      });
      notify({
        title: `${data.name} degan mijoz yaratildi!`,
        description: "",
        status: "success",
      });
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "",
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
      clearInputs();
      getClients();
      setClient({
        market: auth.market && auth.market._id,
      });
      notify({
        title: `${data.name} degan mijoz yangilandi!`,
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
        title: `${data.name} degan mijoz o'chirildi!`,
        description: "",
        status: "success",
      });
      getClients();
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

  const [t, setT] = useState(false);
  useEffect(() => {
    if (!t) {
      getClients();
      setT(true);
    }
  }, [getClients, t]);

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
                      <th className="border text-center">Mijoz</th>
                      <th className="border text-center">Saqlash</th>
                      <th className="border text-center">Tozalash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border text-center">
                      <td className="border text-center">
                        <input
                          name="name"
                          value={client.name || ""}
                          onKeyUp={keyPressed}
                          onChange={changeHandler}
                          type="text"
                          className="focus: outline-none focus:ring focus:border-blue-500 rounded py-1 px-3"
                          id="name"
                          placeholder="Mijozni kiriting"
                        />
                      </td>
                      <td className="border text-center">
                        {loading ? (
                          <button className="btn btn-info" disabled>
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
                          className="form-control"
                          type="search"
                          onChange={searchClient}
                          style={{ maxWidth: "100px" }}
                          placeholder="Mijozlar"
                        />
                      </th>
                      <th className="text-center">
                        <Pagination
                          setCurrentDatas={setCurrentClients}
                          datas={clients}
                          setCurrentPage={setCurrentPage}
                          countPage={countPage}
                          totalDatas={clients.length}
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
                        Mijoz{" "}
                        <Sort
                          data={clients}
                          setData={setClients}
                          property={"name"}
                        />
                      </th>
                      <th className="border text-center">Tahrirlash</th>
                      <th className="border text-center">O'chirish</th>
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
                              {s.name}
                            </td>
                            <td className="border text-center">
                              <button
                                onClick={() => {
                                  setClient({ ...s });
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
        text={"yetkazuvchini o'chirishni tasdiqlaysizmi?"}
        handler={deleteClient}
      />
    </>
  );
};
