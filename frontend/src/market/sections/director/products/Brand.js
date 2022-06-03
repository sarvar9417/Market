import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkBrand } from "./checkData";
import { Modal } from "./modal/Modal";
import { t } from "i18next";
import { CreateHeader } from "./Brand/CreateHeader";
import { CreateBody } from "./Brand/CreateBody";
import { TableHeader } from "./Brand/TableHeader";
import { TableHead } from "./Brand/TableHead";
import { Rows } from "./Brand/Rows";

export const Brand = () => {
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

  const [brand, setBrand] = useState({
    market: auth.market && auth.market._id,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const clearInputs = useCallback(() => {
    setBrand({
      market: auth.market && auth.market._id,
    });
  }, [auth.market]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [brands, setBrands] = useState([]);
  const [currentBrands, setCurrentBrands] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);

  const getBrands = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/getall`,
        "POST",
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setBrands(data);
      setCurrentBrands(data.slice(indexFirstProduct, indexLastProduct));
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

  const [connectorCount, setConnectorCount] = useState(0);

  const getConnectorsCount = useCallback(async () => {
    try {
      const data = await request(
        "/api/products/brand/getconnectorscount",
        "POST",
        { market: auth.market && auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setConnectorCount(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, notify, request]);

  const getConnectors = useCallback(async () => {
    try {
      const data = await request(
        "/api/products/brand/getconnectors",
        "POST",
        { market: auth.market._id, currentPage, countPage },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrentBrands(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, notify, currentPage, countPage]);

  //====================================================================
  //====================================================================

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/register`,
        "POST",
        { ...brand },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("brеnd yaratildi!")}`,
        description: "",
        status: "success",
      });
      getConnectors();
      setBrand({
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
  }, [request, auth, notify, brand, clearInputs, getConnectors]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/update`,
        "PUT",
        { ...brand, market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("brend yangilandi!")}`,
        description: "",
        status: "success",
      });
      getConnectors();
      setBrand({
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
  }, [request, auth, notify, brand, clearInputs, getConnectors]);

  const saveHandler = () => {
    if (checkBrand(brand)) {
      return notify(checkBrand(brand));
    }
    if (brand._id) {
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
        `/api/products/brand/delete`,
        "DELETE",
        { ...remove, market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("nomli brend o'chirildi!")}`,
        description: "",
        status: "success",
      });
      getConnectors();
      setModal(false);
      setBrand({
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
  }, [auth, request, remove, notify, clearInputs, getConnectors]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setBrand({ ...brand, name: e.target.value });
  };

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
    setCurrentBrands(brands.slice(0, e.target.value));
  };

  const searchBrand = (e) => {
    const searching = searchStorage.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCurrentBrands(searching);
    setBrands(searching);
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  useEffect(() => {
    getConnectors();
  }, [getConnectors, currentPage, countPage]);

  const [n, setN] = useState();
  useEffect(() => {
    if (!n) {
      setN(1);
      getConnectorsCount();
      getBrands();
    }
  }, [getBrands, n, getConnectorsCount]);
  //====================================================================
  //====================================================================

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className='m-3 min-w-[700px]'>
        <CreateHeader />
        <CreateBody
          brand={brand}
          inputHandler={inputHandler}
          saveHandler={saveHandler}
          loading={loading}
          keyPressed={keyPressed}
          clearInputs={clearInputs}
        />
        <br />
        <TableHeader
          setPageSize={setPageSize}
          searchBrand={searchBrand}
          setCurrentPage={setCurrentPage}
          brandsCount={connectorCount}
          countPage={countPage}
        />
        <TableHead
          currentBrands={currentBrands}
          setCurrentBrands={setCurrentBrands}
        />

        {currentBrands &&
          currentBrands.map((s, key) => {
            return (
              <Rows
                index={key}
                currentPage={currentPage}
                key={key}
                c={s}
                brand={brand}
                setBrand={setBrand}
                setRemove={setRemove}
                setModal={setModal}
              />
            );
          })}
      </div>

      <div className='d-none'>
        <table className='table m-0' id='brand-excel-table'>
          <thead>
            <tr>
              <th>№</th>
              <th>{t("Brend")}</th>
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
        text={t("Brendni o'chirishni tasdiqlaysizmi?")}
        handler={deleteHandler}
      />
    </>
  );
};
