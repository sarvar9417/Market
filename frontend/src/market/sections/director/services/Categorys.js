import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkCategory } from "./checkData";
import { Modal } from "./modal/Modal";
import { Sort } from "./productComponents/Sort";

export const Category = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
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
  const [category, setCategory] = useState({
    market: auth.market && auth.market._id,
    name: null,
    code: null,
  });

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [categories, setCategories] = useState();

  const getCategory = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/category/getall`,
        "POST",
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCategories(data);
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
        { ...category, code: `${category.code}` },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} kategoriyasi yaratildi!`,
        description: "",
        status: "success",
      });
      let c = [...categories]
      c.unshift({ ...data })
      setCategories([...c])
      setCategory({
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
  }, [request, auth, notify, setCategory, category, clearInputs, categories]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/category/update`,
        "PUT",
        { ...category, code: `${category.code}` },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} kategoriyasi yangilandi!`,
        description: "",
        status: "success",
      });
      let index = categories.findIndex((categor) => { return category._id === categor._id })
      let c = [...categories]
      c.splice(index, 1, { ...data })
      setCategories([...c])
      setCategory({
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
  }, [request, auth, notify, category, clearInputs, categories]);

  const saveHandler = () => {
    if (checkCategory(category)) {
      return notify(checkCategory(category));
    }
    if (category._id) {
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
        `/api/products/category/delete`,
        "DELETE",
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} kategoriyasi o'chirildi!`,
        description: "",
        status: "success",
      });
      let index = categories.findIndex((categor) => { return remove._id === categor._id })
      let c = [...categories]
      c.splice(index, 1)
      setCategories([...c])
      setModal(false);
      setCategory({
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
  }, [auth, request, remove, notify, clearInputs, categories]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  // const checkHandler = (e) => {
  //   setCategory({ ...category, probirka: e.target.checked })
  // }

  const inputHandler = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
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
                      <th className="">Kategoriya nomi</th>
                      <th className="">Kategoriya kodi</th>
                      <th className="">Saqlash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          style={{ minWidth: "70px" }}
                          value={category.name ? category.name : ""}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="form-control w-75"
                          id="inputName"
                          name="name"
                          placeholder="Bo'lim nomini kiriting"
                        />
                      </td>
                      <td>
                        <input
                          style={{ minWidth: "70px" }}
                          value={category.code ? category.code : ""}
                          onKeyUp={keyPressed}
                          onChange={(e) =>
                            setCategory({
                              ...category,
                              [e.target.name]: parseInt(e.target.value),
                            })
                          }
                          type="text"
                          className="form-control w-75"
                          id="inputName"
                          name="code"
                          placeholder="Bo'lim nomini kiriting"
                        />
                      </td>
                      <td>
                        {loading ? (
                          <button className="btn btn-info" disabled>
                            <span className="spinner-border spinner-border-sm"></span>
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
                      <th className="hidden sm:block">
                        Nomi{"  "}
                        <Sort
                          data={category}
                          setData={setCategory}
                          property={"name"}
                        />
                      </th>
                      <th className="">
                        Kodi{"  "}
                        <Sort
                          data={category}
                          setData={setCategory}
                          property={"name"}
                        />
                      </th>
                      <th className="">Tahrirlash</th>
                      <th className="">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories &&
                      categories.map((c, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-weight-bold">{key + 1}</td>
                            <td className="hidden sm:block">{c.name}</td>
                            <td>{c.code}</td>
                            <td>
                              <button
                                onClick={() =>
                                  setCategory({ ...category, ...c })
                                }
                                className="btn btn-success py-1 px-2"
                                style={{ fontSize: "75%" }}
                              >
                                Tahrirlash
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setRemove(c);
                                  setModal(true);
                                }}
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
        text={"kategoriyasini o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />
    </>
  );
};
