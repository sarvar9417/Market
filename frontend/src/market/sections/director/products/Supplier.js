import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkSupplier } from "./checkData";
import { Modal } from "./modal/Modal";
import { Sort } from "../components/Sort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPenAlt,
  faRepeat,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../components/Pagination";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

export const Supplier = () => {
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
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const indexLastProduct = (currentPage + 1) * countPage;
  const indexFirstProduct = indexLastProduct - countPage;

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  const [supplier, setSupplier] = useState({
    market: auth.market && auth.market._id,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const clearInputs = useCallback(() => {
    setSupplier({
      market: auth.market && auth.market._id,
    });
  }, [auth.market]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [suppliers, setSuppliers] = useState([]);
  const [currentSuppliers, setCurrentSuppliers] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);

  const getSuppliers = useCallback(async () => {
    try {
      const data = await request(
        `/api/supplier/getall`,
        "POST",
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setSuppliers(data);
      setCurrentSuppliers(data.slice(indexFirstProduct, indexLastProduct));
      setSearchStorage(data);
      setTableExcel(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify, indexFirstProduct, indexLastProduct]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/supplier/register`,
        "POST",
        { ...supplier },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} o'lchov birliki yaratildi!`,
        description: "",
        status: "success",
      });
      getSuppliers();
      setSupplier({
        market: auth.market && auth.market._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify, getSuppliers, supplier, clearInputs]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/supplier/update`,
        "PUT",
        { ...supplier },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} o'lchov birliki yangilandi!`,
        description: "",
        status: "success",
      });
      getSuppliers();
      setSupplier({
        market: auth.market && auth.market._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify, getSuppliers, supplier, clearInputs]);

  const saveHandler = () => {
    if (checkSupplier(supplier)) {
      return notify(checkSupplier(supplier));
    }
    if (supplier._id) {
      return updateHandler();
    } else {
      return createHandler();
    }
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      return saveHandler();
    }
  };

  const deleteHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/supplier/delete`,
        "DELETE",
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} nomli o'lchov birliki o'chirildi!`,
        description: "",
        status: "success",
      });
      getSuppliers();
      setModal(false);
      setSupplier({
        market: auth.market && auth.market._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, remove, notify, getSuppliers, clearInputs]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setSupplier({ ...supplier, name: e.target.value });
  };

  const searchSupplier = (e) => {
    const searching = searchStorage.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSuppliers(searching);
    setCurrentSuppliers(searching);
  };

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
    setCurrentSuppliers(suppliers.slice(0, e.target.value));
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [t, setT] = useState();
  useEffect(() => {
    if (!t) {
      setT(1);
      getSuppliers();
    }
  }, [getSuppliers, t]);
  //====================================================================
  //====================================================================

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="content-wrapper px-lg-5 px-3">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="table-container">
              <div className="table-responsive">
                <table className="table m-0">
                  <thead>
                    <tr>
                      <th className="border text-center">Yetkazib beruvchi</th>
                      <th className="border text-center">Saqlash</th>
                      <th className="border text-center">Tozalash</th>
                    </tr>
                  </thead>
                  <tbody className="border text-center">
                    <tr>
                      <td className="border text-center">
                        <input
                          name="name"
                          value={supplier.name || ""}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="focus: outline-none focus:ring focus: border-blue-500 rounded py-1 px-3"
                          id="name"
                          placeholder="Yetkazib beruvchi kiriting"
                        />
                      </td>
                      <td className="border text-center text-base">
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
                            <FontAwesomeIcon icon={faFloppyDisk} />
                          </button>
                        )}
                      </td>
                      <td className="border text-center text-base">
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
                            <FontAwesomeIcon icon={faRepeat} />
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
                          onChange={searchSupplier}
                          style={{ maxWidth: "100px" }}
                          placeholder="Brand"
                        />
                      </th>
                      <th className="text-center">
                        <Pagination
                          setCurrentDatas={setCurrentSuppliers}
                          datas={suppliers}
                          setCurrentPage={setCurrentPage}
                          countPage={countPage}
                          totalDatas={suppliers.length}
                        />
                      </th>
                      <th className="text-center">
                        <div className="btn btn-primary">
                          <ReactHtmlTableToExcel
                            id="reacthtmltoexcel"
                            table="supplier-excel-table"
                            sheet="Sheet"
                            buttonText="Excel"
                            filename="Yetkazib beruvchilar"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <thead className="border text-center">
                    <tr>
                      <th className="border text-center text-bold max-w-[2rem]">
                        №
                      </th>
                      <th className="border text-center">
                        Yetkazib beruvchi{" "}
                        <Sort
                          data={suppliers}
                          setData={setSuppliers}
                          property={"name"}
                        />
                      </th>
                      <th className="border">Tahrirlash</th>
                      <th className="border">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody className="text-center border">
                    {currentSuppliers &&
                      currentSuppliers.map((s, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-bold text-black border">
                              {currentPage * countPage + key + 1}
                            </td>
                            <td className="font-bold text-black border">
                              {s.name}
                            </td>
                            <td className="border text-base">
                              <button
                                onClick={() => {
                                  setSupplier({ ...supplier, ...s });
                                }}
                                className="btn btn-success py-1 px-4"
                              >
                                <FontAwesomeIcon icon={faPenAlt} />
                              </button>
                            </td>
                            <td className="border text-base">
                              <button
                                onClick={() => {
                                  setRemove({ ...remove, ...s });
                                  setModal(true);
                                }}
                                className="btn btn-secondary py-1 px-4"
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
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

      <div className="d-none">
        <table className="table m-0" id="supplier-excel-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Yetkazib beruvchilar</th>
            </tr>
          </thead>
          <tbody>
            {tableExcel &&
              tableExcel.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={"yetkazib beruvchi o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />
    </>
  );
};
