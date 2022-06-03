import React, { useCallback, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkCategory } from "./checkData";
import { Modal } from "./modal/Modal";
import { t } from "i18next";
import { CreateHeader } from "./Category/CreateHeader";
import { CreateBody } from "./Category/CreateBody";
import { TableHeader } from "./Category/TableHeader";
import { TableHead } from "./Category/TableHead";
import { Rows } from "./Category/Rows";

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
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const indexLastProduct = (currentPage + 1) * countPage;
  const indexFirstProduct = indexLastProduct - countPage;
  const [categoryCount, setCategoryCount] = useState(0);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [category, setCategory] = useState({
    market: auth.market && auth.market._id,
    name: null,
    code: null,
  });

  const changeHandler = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName("input");
    for (const input of inputs) {
      input.value = "";
    }
    setCategory({
      market: auth.market && auth.market._id,
    });
  }, [auth]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);

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
      setCurrentCategories(data.slice(indexFirstProduct, indexLastProduct));
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

  const searchCategory = (e) => {
    const searching = searchStorage.filter(
      (item) =>
        (item.name &&
          item.name.toLowerCase().includes(e.target.value.toLowerCase())) ||
        String(item.code).includes(e.target.value)
    );
    console.log(searching);
    setCategories(searching);
    setCurrentCategories(searching);
  };

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
    setCurrentCategories(categories.slice(0, e.target.value));
  };

  //====================================================================
  //====================================================================

  const getCategoryConnectors = useCallback(async () => {
    try {
      const data = await request(
        "/api/products/category/getconnectors",
        "POST",
        { market: auth.market && auth.market._id, countPage, currentPage },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrentCategories(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, notify, countPage, currentPage]);

  const getCategoryCount = useCallback(async () => {
    try {
      const data = await request(
        "/api/products/category/datacount",
        "POST",
        { market: auth.market && auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCategoryCount(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [notify, request, auth]);

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
        title: `${data.name} ${t("kategoriyasi yaratildi!")}`,
        description: "",
        status: "success",
      });
      getCategoryConnectors();
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
  }, [request, auth, notify, category, clearInputs, getCategoryConnectors]);

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
      getCategoryConnectors();
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
  }, [request, auth, notify, category, clearInputs, getCategoryConnectors]);

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
      getCategoryConnectors();
      setCategory({
        market: auth.market && auth.market._id,
      });
      clearInputs();
      setModal(false);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, remove, notify, clearInputs, getCategoryConnectors]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  useEffect(() => {
    getCategoryConnectors();
  }, [currentPage, countPage, getCategoryConnectors]);

  const [n, setN] = useState();
  useEffect(() => {
    if (!n) {
      setN(1);
      getCategory();
      getCategoryCount();
    }
  }, [getCategory, n, getCategoryCount]);
  //====================================================================
  //====================================================================

  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w-[700px]'>
        <CreateHeader />
        <CreateBody
          category={category}
          changeHandler={changeHandler}
          saveHandler={saveHandler}
          loading={loading}
          keyPressed={keyPressed}
          clearInputs={clearInputs}
        />
        <br />
        <TableHeader
          setPageSize={setPageSize}
          searchCategory={searchCategory}
          setCurrentPage={setCurrentPage}
          categoryCount={categoryCount}
          countPage={countPage}
        />
        <TableHead
          currentCategories={currentCategories}
          setCurrentCategories={setCurrentCategories}
        />
        {currentCategories &&
          currentCategories.map((c, key) => {
            return (
              <Rows
                index={key}
                currentPage={currentPage}
                key={key}
                c={c}
                category={category}
                setCategory={setCategory}
                setRemove={setRemove}
                setModal={setModal}
              />
            );
          })}
      </div>

      <div className='hidden'>
        <table className='table m-0' id='data-excel-table'>
          <thead>
            <tr className='bg-blue-700'>
              <th className='border border-black'>№</th>
              <th className='border'>{t("Kategoriya kodi")}</th>
              <th>{t("Kategoriya nomi")}</th>
            </tr>
          </thead>
          <tbody>
            {tableExcel &&
              tableExcel.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.code}
        text={"kategoriyasini o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />
    </div>
  );
};
