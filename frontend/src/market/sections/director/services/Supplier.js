import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkSupplier } from "./checkData";
import { Modal } from "./modal/Modal";
import { Sort } from "../adver/Sort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPenAlt, faRepeat, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify]);
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
                            <FontAwesomeIcon icon={faFloppyDisk}/>
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
                            <FontAwesomeIcon icon={faRepeat}/>
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
                  <thead className="border text-center">
                    <tr>
                      <th className="border text-center text-bold max-w-[2rem]">№</th>
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
                    {suppliers &&
                      suppliers.map((s, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-bold text-black border">{key + 1}</td>
                            <td className="font-bold text-black border">{s.name}</td>
                            <td className="border text-base">
                              <button
                                onClick={() => {
                                  setSupplier({ ...supplier, ...s });
                                }}
                                className="btn btn-success py-1 px-4"
                                
                              >
                                <FontAwesomeIcon icon={faPenAlt}/>
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
                                <FontAwesomeIcon icon={faTrashCan}/>
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
        text={"yetkazib beruvchi o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />
    </>
  );
};
