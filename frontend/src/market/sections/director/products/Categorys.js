import React, { useCallback, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkCategory } from "./checkData";
import { Modal } from "./modal/Modal";
import { Sort } from "./productComponents/Sort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPenAlt,
  faRepeat,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "./productComponents/Pagination";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { t } from "i18next";

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
    <div>
      <div className='m-3'>
        <div className=''>
          <div className=''>
            <div className='mb-3'>
              <ul className='grid grid-cols-12  shadow-xl bg-white rounded border-b text-white'>
                <li className='text-center font-bold border-r py-2 col-span-4 bg-alo24'>
                  {t("Kategoriya kodi")}
                </li>
                <li className='border-r font-bold text-center col-span-4 bg-alo24 py-2'>
                  {t("Kategoriya nomi")}
                </li>
                <li className='border-r font-bold text-center col-span-2 bg-alo24 py-2 '>
                  {t("Saqlash")}
                </li>
                <li className='text-center font-bold col-span-2 bg-alo24 py-2 '>
                  {t("Tozalash")}
                </li>
              </ul>
              <ul className='grid grid-cols-12 shadow-xl bg-white rounded text-white'>
                <li className='text-center font-bold border-r py-2 col-span-4'>
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
                    type='text'
                    className='border-blue border px-2 outline-none'
                    id='inputName'
                    name='code'
                    placeholder={t("Kategoriya kodini kiriting")}
                  />
                </li>
                <li className='border-r text-center col-span-4 py-2'>
                  <input
                    style={{ minWidth: "70px" }}
                    value={category.name ? category.name : ""}
                    onKeyUp={keyPressed}
                    onChange={inputHandler}
                    type='text'
                    className='border px-2 outline-none'
                    id='inputName'
                    name='name'
                    placeholder={t("Kategotiya nomini kiriting")}
                  />
                </li>
                <li className='border-r text-center col-span-2  py-2'>
                  {loading ? (
                    <button className='btn btn-info' disabled>
                      <span className='spinner-border spinner-border-sm'></span>
                      Loading...
                    </button>
                  ) : (
                    <button
                      onClick={saveHandler}
                      className='px-4 py-0 text-white shadow rounded-xl bg-darkblue-300 hover:bg-darkblue-200'>
                      <FontAwesomeIcon
                        className='text-sm'
                        icon={faFloppyDisk}
                      />
                    </button>
                  )}
                </li>
                <li className='text-center col-span-2  py-2'>
                  {loading ? (
                    <button className='btn btn-info' disabled>
                      <span className='spinner-border spinner-border-sm'></span>
                      Loading...
                    </button>
                  ) : (
                    <button
                      onClick={clearInputs}
                      className='px-4 py-0 text-white shadow rounded-xl bg-red-400 hover:opacity-80'>
                      <FontAwesomeIcon className='text-sm' icon={faRepeat} />
                    </button>
                  )}
                </li>
              </ul>
            </div>
            <ul className='grid grid-cols-12 shadow-xl bg-white bg-alo24 border-b'>
              <li className='text-center font-bold border-r py-2 bg-alo24'>
                <select
                  className='rounded w-[70px] outline-none px-2 py-1 font-bold '
                  placeholder={t("Bo'limni tanlang")}
                  onChange={setPageSize}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </li>
              <li className='text-center font-bold border-r py-2 bg-alo24 px-1'>
                <input
                  type='search'
                  className='px-2 py-1  outline-none text-white bg-alo24 font-bold placeholder:text-white w-full placeholder:text-white'
                  placeholder={t("Kategoriya kodi")}
                  onChange={searchCategory}
                />
              </li>
              <li className='text-center font-bold border-r py-2 col-span-6 bg-alo24'>
                <input
                  type='search'
                  className='px-2 py-1 outline-none text-white font-bold placeholder:text-white bg-alo24'
                  placeholder={t("Kategoriya nomi")}
                  onChange={searchCategory}
                />
              </li>
              <li className='text-center font-bold border-r py-2 col-span-2 bg-alo24'>
                <Pagination
                  setCurrentPage={setCurrentPage}
                  countPage={countPage}
                  totalDatas={categoryCount.count}
                />
              </li>
              <li className='text-center flex justify-center items-center font-bold border-r py-2 col-span-2 bg-alo24'>
                <div className='px-3 py-1 bg-blue-100 font-bold text-white rounded inline'>
                  <ReactHtmlTableToExcel
                    id='reacthtmltoexcel'
                    table='category-excel-table'
                    sheet='Sheet'
                    buttonText='Excel'
                    filename={t("Kategoriya")}
                  />
                </div>
              </li>
            </ul>
            <ul className='grid grid-cols-12 shadow-xl bg-white bg-alo24 text-white'>
              <li className='text-center font-bold border-r py-2 bg-alo24'>
                №
              </li>
              <li className='text-center font-bold border-r py-2 bg-alo24 px-1 text-white'>
                Kodi
              </li>
              <li className='text-center font-bold border-r py-2 col-span-6 bg-alo24'>
                Nomi
              </li>
              <li className='text-center font-bold border-r py-2 col-span-2 bg-alo24'>
                Tahrirlash
              </li>
              <li className='text-center flex justify-center items-center font-bold border-r py-2 col-span-2 bg-alo24'>
                O'chirish
              </li>
            </ul>
            {currentCategories &&
              currentCategories.map((category, key) => {
                return (
                  <ul
                    key={key}
                    className='grid grid-cols-12 my-2 shadow-xl bg-white rounded border hover:transition hover:translate-x-1 hover:translate-y-1 cursor-pointer'>
                    <li className='text-center font-bold border-r py-2'>
                      {key + 1}
                    </li>
                    <li className='text-center font-bold border-r py-2'>
                      {category.code}
                    </li>
                    <li className='col-span-6 py-2 border-r px-3'>
                      {category.name}
                    </li>
                    <li className='col-span-2 py-2 border-r text-center'>
                      <button
                        // onClick={() => setCategory({ ...category, ...c })}
                        className='px-4 py-0 text-white shadow rounded-xl bg-darkblue-300 hover:bg-darkblue-200'>
                        <FontAwesomeIcon className='text-sm' icon={faPenAlt} />
                      </button>
                    </li>
                    <li className='col-span-2 py-2 text-center'>
                      <button
                        // onClick={() => {
                        //   setRemove(c);
                        //   setModal(true);
                        // }}
                        className='px-4 py-0 text-white shadow rounded-xl bg-red-400 hover:opacity-80'>
                        <FontAwesomeIcon
                          className='text-sm'
                          icon={faTrashCan}
                        />
                      </button>
                    </li>
                  </ul>
                );
              })}
          </div>
        </div>
      </div>

      <div className='d-none'>
        <table className='table m-0' id='category-excel-table'>
          <thead>
            <tr>
              <th>№</th>
              <th>{t("Kategoriya kodi")}</th>
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
        basic={remove && remove.name}
        text={"kategoriyasini o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />
    </div>
  );
};
