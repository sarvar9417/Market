import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkCategory } from "./checkData";
import { Modal } from "./modal/Modal";
import { Sort } from "./productComponents/Sort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPenAlt, faRepeat, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const Category = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
  const [remove, setRemove] = useState();

 
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

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName("input");
    for (const input of inputs) {
      input.value = "";
    }
    setCategory(
      {
        market: auth.market && auth.market._id
      }
    )

  }, [auth]);

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
                      <th className="border text-center"> Kategoriya kodi</th>
                      <th className="border text-center">Kategoriya nomi</th>
                      <th className="border text-center">Saqlash</th>
                      <th className="border text-center">Tozalash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className=" text-center border">
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
                          className="focus: outline-none focus:ring focus: border-blue-500 py-2 px-3 rounded"
                          id="inputName"
                          name="code"
                          placeholder= "Kategoriya kodini kiriting"
                        />
                      </td>
                      <td className=" text-center border">
                        <input
                          style={{ minWidth: "70px" }}
                          value={category.name ? category.name : ""}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="focus: outline-none focus:ring focus: border-blue-500 py-2 px-3 rounded"
                          id="inputName"
                          name="name"
                          placeholder="Kategotiya nomini kiriting"
                        />
                      </td>
                      <td className="text-center border">
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
                            <FontAwesomeIcon className="text-base" icon={faFloppyDisk}/>
                          </button>
                        )}
                      </td>
                       <td className="text-center border">
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
                            <FontAwesomeIcon className="text-base" icon={faRepeat}/>
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
                      <th className="border text-center">№</th>
                      <th className="border text-center">
                        Kodi{"  "}
                        <Sort
                          data={category}
                          setData={setCategory}
                          property={"name"}
                        />
                      </th>
                      <th className=" border text-center ">
                        Nomi{"  "}
                        <Sort
                          data={category}
                          setData={setCategory}
                          property={"name"}
                        />
                      </th>
                      <th className=" border text-center">Tahrirlash</th>
                      <th className=" border text-center">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories &&
                      categories.map((c, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-bold text-center border">{key + 1}</td>
                            <td className="text-black font-bold text-center border">{c.code}</td>
                            <td className=" text-black font-bold text-center border ">{c.name}</td>                            
                            <td className="text-center border">
                              <button 
                                onClick={() =>
                                  setCategory({ ...category, ...c })
                                }
                                className="btn btn-success py-1 px-4"
                                style={{ fontSize: "75%" }}
                              >
                               <FontAwesomeIcon className="text-base" icon={faPenAlt}/>
                              </button>
                            </td>
                            <td className="text-center border">
                              
                              <button
                                onClick={() => {
                                  setRemove(c);
                                  setModal(true);
                                }}
                                className="btn btn-secondary py-1 px-4"
                                style={{ fontSize: "75%" }}
                              >
                                <FontAwesomeIcon className="text-base" icon={faTrashCan}/> 
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
