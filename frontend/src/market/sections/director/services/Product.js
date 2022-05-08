import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkProduct, checkProducts } from "./checkData";
import { Modal } from "./modal/Modal";
import { TableProduct } from "./productComponents/TableProduct";
import { InputProduct } from "./productComponents/InputProduct";
import { ExcelCols } from "./productComponents/ExcelCols";

export const Product = () => {
  //====================================================================
  //====================================================================
  // Pagenation
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const indexLastProduct = (currentPage + 1) * countPage;
  const indexFirstProduct = indexLastProduct - countPage;
  const [currentProducts, setCurrentProducts] = useState([]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [remove, setRemove] = useState();

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName("input");
    document.getElementsByTagName("select")[0].selectedIndex = 0;
    for (const input of inputs) {
      input.value = "";
    }

    for (let option of document.getElementsByTagName("select")[0].options) {
      if (option.value === "delete") {
        option.selected = true;
      }
    }
    for (let option of document.getElementsByTagName("select")[1].options) {
      if (option.value === "delete") {
        option.selected = true;
      }
    }
    for (let option of document.getElementsByTagName("select")[2].options) {
      if (option.value === "delete") {
        option.selected = true;
      }
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

  const [product, setProduct] = useState({
    market: auth.market && auth.market._id,
  });

  const sections = [
    { name: "Kategoriya kodi", value: "categorycode" },
    { name: "Kategoriya", value: "category" },
    { name: "Mahsulot kodi", value: "code" },
    { name: "Mahsulot", value: "name" },
    { name: "O'lchov birligi", value: "unit" },
  ];

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [products, setProducts] = useState([]);
  const [searchStorage, setSearchStrorage] = useState();
  const [tableExcel, setTableExcel] = useState([]);
  const [changeImports, setChangeImports] = useState([]);
  const [imports, setImports] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/getall`,
        "POST",
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setProducts(data);
      setSearchStrorage(data);
      setCurrentProducts(data.slice(indexFirstProduct, indexLastProduct));
      setTableExcel(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [
    request,
    auth,
    notify,
    setCurrentProducts,
    indexLastProduct,
    indexFirstProduct,
    setSearchStrorage,
  ]);
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

  const [units, setUnits] = useState([]);

  const getUnits = useCallback(async () => {
    try {
      const data = await request(
        "/api/products/unit/getall",
        "POST",
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setUnits(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, notify, auth]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [producttypes, setProductTypes] = useState();

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
  const [brands, setBrands] = useState([]);

  const getBrand = useCallback(async () => {
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
        `/api/products/product/register`,
        "POST",
        { ...product },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} xizmati yaratildi!`,
        description: "",
        status: "success",
      });
      getProducts();
      setProduct({
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
  }, [auth, request, getProducts, product, notify, clearInputs]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/update`,
        "PUT",
        { ...product },

        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} xizmati yangilandi!`,
        description: "",
        status: "success",
      });
      getProducts();
      setProduct({
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
  }, [auth, request, getProducts, product, notify, clearInputs]);

  const saveHandler = () => {
    if (checkProduct(product)) {
      return notify(checkProduct(product));
    }
    if (product._id) {
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
        `/api/products/product/delete`,
        "DELETE",
        { ...remove, market: auth.market && auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} xizmati o'chirildi!`,
        description: "",
        status: "success",
      });
      getProducts();
      setProduct({
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
  }, [auth, request, remove, notify, getProducts, clearInputs]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //====================================================================
  //====================================================================

  const uploadAllProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/registerall`,
        "POST",
        { market: auth.market, products: [...changeImports] },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem("data", data);
      notify({
        title: `Barcha mahsulolar yuklandi!`,
        description: "",
        status: "success",
      });
      getProducts();
      setProduct({
        market: auth.market && auth.market._id,
      });
      clearInputs();
      setModal2(false);
    } catch (e) {
      notify({
        title: e,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, getProducts, notify, clearInputs, changeImports]);

  const checkUploadData = () => {
    if (checkProducts(changeImports)) {
      return notify(checkProducts(changeImports));
    }
    uploadAllProducts();
  };

  //====================================================================
  //====================================================================
  // SEARCH

  const searchCategory = useCallback(
    (e) => {
      const searching = searchStorage.filter(
        (item) =>
          item.category.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          String(item.category.code).includes(e.target.value)
      );
      setProducts(searching);
      setCurrentProducts(searching.slice(0, countPage));
    },
    [searchStorage, countPage]
  );

  const searchProductType = useCallback(
    (e) => {
      const searching = searchStorage.filter((item) =>
        item.producttype.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setProducts(searching);
      setCurrentProducts(searching.slice(0, countPage));
    },
    [searchStorage, countPage]
  );

  const searchName = useCallback(
    (e) => {
      const searching = searchStorage.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          String(item.code).includes(e.target.value)
      );
      setProducts(searching);
      setCurrentProducts(searching.slice(0, countPage));
    },
    [searchStorage, countPage]
  );
  //====================================================================
  //====================================================================
  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0);
      setCountPage(e.target.value);
      setCurrentProducts(products.slice(0, e.target.value));
    },
    [products]
  );
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  const [t, setT] = useState();
  useEffect(() => {
    if (!t) {
      setT(1);
      getCategories();
      getProducts();
      getProductTypes();
      getUnits();
      getBrand();
    }
  }, [getProducts, getUnits, getCategories, getProductTypes, getBrand, t]);
  //====================================================================
  //====================================================================
  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="content-wrapper px-lg-5 px-3">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <InputProduct
              producttypes={producttypes}
              categories={categories}
              setProduct={setProduct}
              product={product}
              keyPressed={keyPressed}
              inputHandler={inputHandler}
              saveHandler={saveHandler}
              loading={loading}
              units={units}
              brands={brands}
            />
            <TableProduct
              producttypes={producttypes}
              setImports={setImports}
              product={product}
              searchName={searchName}
              searchProductType={searchProductType}
              searchCategory={searchCategory}
              categories={categories}
              products={products}
              tableExcel={tableExcel}
              setRemove={setRemove}
              setModal={setModal}
              setProducts={setProducts}
              setProduct={setProduct}
              setCurrentPage={setCurrentPage}
              countPage={countPage}
              setCountPage={setCountPage}
              currentProducts={currentProducts}
              setCurrentProducts={setCurrentProducts}
              currentPage={currentPage}
              setPageSize={setPageSize}
              loading={loading}
              setModal2={setModal2}
            />
          </div>
        </div>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={"mahsulotnti o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />

      <Modal
        modal={modal2}
        setModal={setModal2}
        handler={checkUploadData}
        text={
          <ExcelCols
            createdData={changeImports}
            setData={setChangeImports}
            data={imports}
            sections={sections}
          />
        }
      />
    </>
  );
};
