import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkProductType } from "./checkData";
import { Modal } from "./modal/Modal";
import { Sort } from "./productComponents/Sort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

export const ProductType = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName("input");
    document.getElementsByTagName("select")[0].selectedIndex = 0;
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

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  const [producttype, setProductType] = useState({
    market: auth.market && auth.market._id,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
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
  const [producttypes, setProductTypes] = useState([]);

  const getProductTypes = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/producttype/getall`,
        "POST",
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setProductTypes(data);
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
        `/api/products/producttype/register`,
        "POST",
        { ...producttype },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} mahsulot turi yaratildi!`,
        description: "",
        status: "success",
      });
      let c = [...producttypes]
      c.unshift({ ...data })
      setProductTypes([...c])
      setProductType({
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
  }, [request, auth, notify, setProductTypes, producttype, clearInputs, producttypes]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/producttype/update`,
        "PUT",
        { ...producttype },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} mahsuloti yangilandi!`,
        description: "",
        status: "success",
      });
      let index = producttypes.findIndex((producttyp) => { return producttype._id === producttyp._id })
      let c = [...producttypes]
      c.splice(index, 1, { ...data })
      setProductTypes([...c])
      setProductType({
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
  }, [request, auth, notify, setProductTypes, producttype, clearInputs, producttypes]);

  const saveHandler = () => {
    if (checkProductType(producttype)) {
      return notify(checkProductType(producttype));
    }
    if (producttype._id) {
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
        `/api/products/producttype/delete`,
        "DELETE",
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} nomli mahsulot turi o'chirildi!`,
        description: "",
        status: "success",
      });
      let index = producttypes.findIndex((producttyp) => { return remove._id === producttyp._id })
      let c = [...producttypes]
      c.splice(index, 1)
      setProductTypes([...c])
      setModal(false);
      setProductType({
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
  }, [auth, request, remove, notify, setProductTypes, clearInputs, producttypes]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const checkHandler = (e) => {
    setProductType({ ...producttype, category: e.target.value });
  };

  const inputHandler = (e) => {
    setProductType({ ...producttype, name: e.target.value });
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [t, setT] = useState();
  useEffect(() => {
    if (!t) {
      setT(1);
      getCategories();
      getProductTypes();
    }
  }, [getCategories, getProductTypes, t]);
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
                      <th className="w-25">Kategoriya nomi</th>
                      <th className="w-25">Mahsulot turi</th>
                      <th className="w-25">Saqlash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select
                          style={{ minWidth: "70px", maxWidth: "200px" }}
                          className="form-control form-control-sm selectpicker"
                          placeholder="Kategoriyani tanlang"
                          onChange={checkHandler}
                        >
                          <option value="all">Kategoriya tanlang</option>
                          {categories &&
                            categories.map((category, index) => {
                              return (
                                <option value={category._id} key={index}>
                                  {category.code}
                                </option>
                              );
                            })}
                        </select>
                      </td>
                      <td>
                        <input
                          style={{ minWidth: "70px" }}
                          name="name"
                          value={producttype.name || ""}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="form-control w-75 py-0"
                          id="name"
                          placeholder="Mahsulot turining nomini kiriting"
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
                      <th>№</th>
                      <th className="w-25">
                        Kategoriya{"  "}
                        <div className="btn-group-vertical ml-2">
                          <FontAwesomeIcon
                            onClick={() =>
                              setProductTypes(
                                [...producttypes].sort((a, b) =>
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
                              setProductTypes(
                                [...producttypes].sort((a, b) =>
                                  b.department.name > a.department.name ? 1 : -1
                                )
                              )
                            }
                          />
                        </div>
                      </th>
                      <th className="w-25">
                        Mahsulot turi{" "}
                        <Sort
                          data={producttypes}
                          setData={setProductTypes}
                          property={"name"}
                        />
                      </th>
                      <th className="w-25">Tahrirlash</th>
                      <th className="w-25">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {producttypes &&
                      producttypes.map((s, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-weight-bold">{key + 1}</td>
                            <td>{s.category.code}</td>
                            <td>{s.name}</td>
                            <td>
                              <button
                                onClick={() => {
                                  const index = categories.findIndex(
                                    (d) => s.category._id === d._id
                                  );
                                  document.getElementsByTagName(
                                    "select"
                                  )[0].selectedIndex = index + 1;
                                  setProductType({ ...producttype, ...s });
                                }}
                                className="btn btn-success py-1 px-2"
                                style={{ fontSize: "75%" }}
                              >
                                Tahrirlash
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setRemove({ ...remove, ...s });
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
        text={"mahsulot turini o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />
    </>
  );
};
