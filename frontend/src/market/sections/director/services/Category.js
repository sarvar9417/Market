import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkDepartment } from "./checkData";
import { Modal } from "./modal/Modal";
import { Sort } from "./serviceComponents/Sort";

export const Category = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [remove, setRemove] = useState();

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName("input");
    for (const input of inputs) {
      input.value = "";
    }
  }, []);
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

  const [department, setCategory] = useState({
    clinica: auth.clinica && auth.clinica._id,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [category, setCategorys] = useState();

  const getCategory = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/category/getall`,
        "POST",
        { clinica: auth.clinica._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCategorys(data);
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
        `/api/products/category/register`,
        "POST",
        { ...department },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} bo'limi yaratildi!`,
        description: "",
        status: "success",
      });
      getCategory();
      setCategory({
        clinica: auth.clinica && auth.clinica._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify, getCategory, department, clearInputs]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/category`,
        "PUT",
        { ...department },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} bo'limi yangilandi!`,
        description: "",
        status: "success",
      });
      getCategory();
      setCategory({
        clinica: auth.clinica && auth.clinica._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify, getCategory, department, clearInputs]);

  const saveHandler = () => {
    if (checkDepartment(department)) {
      return notify(checkDepartment(department));
    }
    if (department._id) {
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
        `/api/products/category`,
        "DELETE",
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} bo'limi o'chirildi!`,
        description: "",
        status: "success",
      });
      getCategory();
      setModal(false);
      setCategory({
        clinica: auth.clinica && auth.clinica._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, remove, notify, getCategory, clearInputs]);

  const deleteAll = useCallback(async () => {
    if (category && category.length === 0) {
      return notify({
        title: `Bo'limlar mavjud emas`,
        description: "",
        status: "warning",
      });
    }
    try {
      const data = await request(
        `/api/products/category/deleteall`,
        "DELETE",
        { ...department },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem("delete", data);
      notify({
        title: `Barcha bo'limlar o'chirildi!`,
        description: "",
        status: "success",
      });
      getCategory();
      setModal1(false);
      setCategory({
        clinica: auth.clinica && auth.clinica._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, notify, getCategory, clearInputs, department, category]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  // const checkHandler = (e) => {
  //   setCategory({ ...department, probirka: e.target.checked })
  // }

  const inputHandler = (e) => {
    setCategory({ ...department, name: e.target.value });
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [t, setT] = useState();
  useEffect(() => {
    if (!t) {
      setT(1);
      getCategory();
    }
  }, [getCategory, t]);
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
                      <th className="w-25">Bo'lim nomi</th>
                      <th className="w-25">Saqlash</th>
                      <th className="w-25">Bo'limlarni o'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          style={{ minWidth: "70px" }}
                          value={department.name}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="form-control w-75"
                          id="inputName"
                          placeholder="Bo'lim nomini kiriting"
                        />
                      </td>
                      <td>
                        {loading ? (
                          <button className="btn btn-info" disabled>
                            <span class="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={saveHandler}
                            className="btn btn-info py-1 px-4"
                          >
                            Saqlash
                          </button>
                        )}
                      </td>
                      <td>
                        {loading ? (
                          <button className="btn btn-danger" disabled>
                            <span class="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={() => setModal1(true)}
                            className="btn btn-danger py-0 px-4 pt-1"
                          >
                            <span className="icon-trash-2"></span>
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
                  <thead>
                    <tr>
                      <th className="">№</th>
                      <th className="w-25">
                        Nomi{"  "}
                        <Sort
                          data={category}
                          setData={setCategorys}
                          property={"name"}
                        />
                      </th>
                      <th className="w-25">Tahrirlash</th>
                      <th className="w-25">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category &&
                      category.map((d, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-weight-bold">{key + 1}</td>
                            <td>{d.name}</td>
                            <td>
                              <button
                                onClick={() => setCategory(d)}
                                type="button"
                                className="btn btn-success py-1 px-2"
                                style={{ fontSize: "75%" }}
                              >
                                Tahrirlash
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setRemove(d);
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
        </div>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={"bo'limini o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />

      <Modal
        modal={modal1}
        setModal={setModal1}
        basic={"Barcha"}
        text={"bo'limlarni o'chirishni tasdiqlaysizmi?"}
        handler={deleteAll}
      />
    </>
  );
};
