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
  const [categoryCount, setCategoryCount] = useState(0);
  const [searchingEl, setSearchingEl] = useState({});
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
        "/api/products/category/getcategories",
        "POST",
        {
          market: auth.market && auth.market._id,
          countPage,
          currentPage,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCategories(data.categories);
      setCurrentCategories(data.categories);
      setSearchStorage(data.categories);
      setTableExcel(data.categories);
      setCategoryCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, notify, countPage, currentPage]);

  const getSearchedCategory = async () => {
    try {
      const data = await request(
        "/api/products/category/getcategories",
        "POST",
        {
          market: auth.market._id,
          currentPage: 0,
          countPage,
          searching: { ...searchingEl },
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrentCategories(data.categories);
      setCategoryCount(data.count);
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

  const searchKeypress = (e) => {
    if (e.key === "Enter") {
      if (searchingEl) {
        return getSearchedCategory();
      }
      return getCategory();
    }
  };

  const searchCategory = (e) => {
    if (e.target.name === "code") {
      setSearchingEl({
        type: "code",
        search: e.target.value.toLowerCase(),
        searchcode: e.target.value.toLowerCase(),
        searchname: "",
      });
    }
    if (e.target.name === "name") {
      setSearchingEl({
        type: "name",
        search: e.target.value.toLowerCase(),
        searchname: e.target.value.toLowerCase(),
        searchcode: "",
      });
    }
    if (e.target.value === "") {
      setSearchingEl(null);
    }
    const searching = searchStorage.filter(
      (item) =>
        (item.name &&
          item.name.toLowerCase().includes(e.target.value.toLowerCase())) ||
        String(item.code).includes(e.target.value)
    );
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
      getCategory();
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
  }, [request, auth, notify, category, clearInputs, getCategory]);

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
      getCategory();
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
  }, [request, auth, notify, category, clearInputs, getCategory]);

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
      getCategory();
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
  }, [auth, request, remove, notify, clearInputs, getCategory]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  useEffect(() => {
    getCategory();
  }, [currentPage, countPage, getCategory]);

  // const [n, setN] = useState();
  // useEffect(() => {
  //   if (!n) {
  //     setN(1);
  //     getCategory();
  //   }
  // }, [getCategory, n]);
  //====================================================================
  //====================================================================

  return (
    <div className="overflow-x-auto">
      <div className="m-3 min-w-[700px]">
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
          totalDatas={categoryCount}
          countPage={countPage}
          nameValue={(searchingEl && searchingEl.searchname) || ""}
          codeValue={(searchingEl && searchingEl.searchcode) || ""}
          nameKeyPressed={searchKeypress}
          codeKeyPressed={searchKeypress}
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

      <div className="hidden">
        <table className="table m-0" id="data-excel-table">
          <thead>
            <tr className="bg-blue-700">
              <th className="border border-black">№</th>
              <th className="border">{t("Kategoriya kodi")}</th>
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
