import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkProductType } from "./checkData";
import { Modal } from "./modal/Modal";
import { t } from "i18next";
import { CreateBody } from "./ProductType/CreateBody";
import { CreateHeader } from "./ProductType/CreateHeader";
import { TableHeader } from "./ProductType/TableHeader";
import { TableHead } from "./ProductType/TableHead";
import { Rows } from "./ProductType/Rows";

export const ProductType = () => {
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
  const [producttypeCount, setProductTypeCount] = useState(0);
  const [searchingEl, setSearchingEl] = useState({
    type: "",
    search: "",
    searchcode: "",
    searchname: "",
  });

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  const [producttype, setProductType] = useState({
    market: auth.market && auth.market._id,
  });
  //====================================================================
  //====================================================================
  console.log(producttype);
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
      console.log(data);
      setCategories(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify]);

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName("input");
    document.getElementsByTagName("select")[0].selectedIndex = 0;
    for (const input of inputs) {
      input.value = "";
    }
    setProductType({ market: auth.market._id });
  }, [auth]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [producttypes, setProductTypes] = useState([]);
  const [currentProductTypes, setCurrentProductTypes] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);

  const getProductTypes = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/producttype/getproducttypes`,
        "POST",
        { market: auth.market._id, currentPage, countPage, searching: null },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      console.log(data);
      setProductTypes(data.producttypes);
      setCurrentProductTypes(data.producttypes);
      setSearchStorage(data.producttypes);
      setTableExcel(data.producttypes);
      setProductTypeCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify, currentPage, countPage]);

  const getSearchedProductType = async () => {
    try {
      const data = await request(
        "/api/products/producttype/getproducttypes",
        "POST",
        {
          market: auth.market._id,
          currentPage,
          countPage,
          searching: searchingEl,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setProductTypeCount(data.count);
      setCurrentProductTypes(data.producttypes);
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

  const checkHandler = (e) => {
    setProductType({ ...producttype, category: e.target.value });
  };

  const inputHandler = (e) => {
    setProductType({ ...producttype, name: e.target.value });
  };

  //====================================================================
  //====================================================================

  const searchProductType = (e) => {
    if (e.target.name === "code") {
      setSearchingEl({
        type: "code",
        search: e.target.value,
        searchcode: e.target.value,
        searchname: "",
      });

      const searched = searchStorage.filter(
        (item) => item.category && item.category.code.includes(e.target.value)
      );
      setProductTypes(searched);
      setCurrentProductTypes(searched);
    }
    if (e.target.name === "name") {
      setSearchingEl({
        type: "name",
        search: e.target.value.toLowerCase(),
        searchname: e.target.value.toLowerCase(),
        searchcode: "",
      });
      const searched = searchStorage.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProductTypes(searched);
      setCurrentProductTypes(searched);
    }
    if (e.target.value === "") {
      setSearchingEl(null);
    }
  };

  const searchKeypress = (e) => {
    if (e.key === "Enter") {
      if (searchingEl) {
        return getSearchedProductType();
      }
      return getProductTypes();
    }
  };

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
    setCurrentProductTypes(producttypes.slice(0, e.target.value));
  };

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
      getProductTypes();
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
  }, [request, auth, notify, clearInputs, getProductTypes, producttype]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/producttype/update`,
        "PUT",
        { ...producttype, user: auth.userId },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} mahsulot turi yangilandi!`,
        description: "",
        status: "success",
      });
      getProductTypes();
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
  }, [request, auth, notify, producttype, clearInputs, getProductTypes]);

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
      getProductTypes();
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
  }, [auth, request, remove, notify, clearInputs, getProductTypes]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  useEffect(() => {
    getProductTypes();
  }, [currentPage, countPage, getProductTypes]);

  const [n, setN] = useState();
  useEffect(() => {
    if (!n) {
      setN(1);
      getCategories();
    }
  }, [getCategories, n]);
  //====================================================================
  //====================================================================

  return (
    <div className="overflow-x-auto">
      {loading ? <Loader /> : ""}
      <div className="m-3 min-w-[700px]">
        <CreateHeader />
        <CreateBody
          checkHandler={checkHandler}
          producttype={producttype}
          categories={categories}
          changeHandler={inputHandler}
          saveHandler={saveHandler}
          loading={loading}
          keyPressed={keyPressed}
          clearInputs={clearInputs}
        />
        <br />
        <TableHeader
          searchProductType={searchProductType}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          producttypeCount={producttypeCount}
          countPage={countPage}
          valueCategory={(searchingEl && searchingEl.searchcode) || ""}
          valueName={(searchingEl && searchingEl.searchname) || ""}
          keyPressed={searchKeypress}
        />
        <TableHead
          currentProductTypes={currentProductTypes}
          setCurrentProductTypes={setCurrentProductTypes}
        />
        {currentProductTypes &&
          currentProductTypes.map((s, key) => {
            return (
              <Rows
                index={key}
                currentPage={currentPage}
                key={key}
                c={s}
                producttype={producttype}
                setProductType={setProductType}
                setRemove={setRemove}
                setModal={setModal}
              />
            );
          })}
      </div>

      <div className="d-none">
        <table className="table m-0" id="data-excel-table">
          <thead>
            <tr>
              <th>№</th>
              <th>{t("Kategoriya")}</th>
              <th>{t("Mahsulot turi")}</th>
            </tr>
          </thead>
          <tbody>
            {tableExcel &&
              tableExcel.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.category.code}</td>
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
        text={t("mahsulot turini o'chirishni tasdiqlaysizmi?")}
        handler={deleteHandler}
      />
    </div>
  );
};
