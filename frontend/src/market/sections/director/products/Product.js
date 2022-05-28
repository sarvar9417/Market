import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Loader } from "../../../loader/Loader";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { checkProduct, checkProducts } from "./checkData";
import { Modal } from "./modal/Modal";
import { TableProduct } from "./productComponents/TableProduct";
import { InputProduct } from "./productComponents/InputProduct";
import { ExcelCols } from "./productComponents/ExcelCols";
import { t } from "i18next";

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

  const selectRef = {
    category: useRef(),
    producttype: useRef(),
    brand: useRef(),
    unit: useRef(),
  };

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
    total: 0,
    incomingprice: 0,
    sellingprice: 0,
  });

  const sections = [
    { name: t("Kategoriya kodi"), value: "category" },
    { name: t("Mahsulot turi"), value: "producttype" },
    { name: t("Brend"), value: "brand" },
    { name: t("Mahsulot kodi"), value: "code" },
    { name: t("Mahsulot nomi"), value: "name" },
    { name: t("O'lchov birligi"), value: "unit" },
    { name: t("Narxi"), value: "price" },
    { name: t("Soni"), value: "total" },
  ];

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName("input");
    for (const input of inputs) {
      input.value = "";
    }
    selectRef.category.current.selectOption({
      label: "Kategoriya",
      value: "delete",
    });
    selectRef.producttype.current.selectOption({
      label: "Mahsulot",
      value: "delete",
    });
    selectRef.brand.current.selectOption({
      label: "Brand",
      value: "delete",
    });
    selectRef.unit.current.selectOption({
      label: "O'lchov birligi",
      value: "delete",
    });
    setProduct({
      market: auth.market && auth.market._id,
      total: 0,
      incomingprice: 0,
      sellingprice: 0,
    });
  }, [
    auth,
    selectRef.category,
    selectRef.producttype,
    selectRef.brand,
    selectRef.unit,
  ]);
  //====================================================================
  //====================================================================
  const [products, setProducts] = useState([]);
  const [searchStorage, setSearchStrorage] = useState([]);
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

  const changeData = useCallback(
    (method, data) => {
      let arr = [];
      if (method === "POST") {
        arr = [{ ...data }, ...searchStorage];
      }
      if (method === "UPDATE") {
        arr = searchStorage.map((item) => {
          if (item._id === data._id) {
            return (item = { ...data });
          }
          return item;
        });
      }
      if (method === "DELETE") {
        arr = searchStorage.filter((item) => item._id !== data._id);
      }
      setProducts(arr);
      setCurrentProducts(arr.slice(indexFirstProduct, indexLastProduct));
      setSearchStrorage(arr);
    },
    [
      searchStorage,
      setProducts,
      setCurrentProducts,
      setSearchStrorage,
      indexFirstProduct,
      indexLastProduct,
    ]
  );

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
      let s = [
        {
          label: "Kategoriya",
          value: "delete",
        },
      ];
      data.map((category) => {
        return s.push({
          label: category.code,
          value: category._id,
        });
      });
      setCategories(s);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify]);

  const changeCategory = (e) => {
    if (e.value === "delete") {
      setProductTypes(allproducttypes);
      setProduct({ ...product, category: null });
    }
    setProduct({ ...product, category: e.value });
    const filter = allproducttypes.filter((item) => {
      return item.producttype && item.producttype.category._id === e.value;
    });
    setProductTypes(filter);
  };
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
      let s = [
        {
          label: "O'lchov birligi",
          value: "delete",
        },
      ];
      data.map((unit) => {
        return s.push({
          label: unit.name,
          value: unit._id,
        });
      });
      setUnits(s);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, notify, auth]);

  const changeUnit = (e) => {
    if (e.value === "delete") {
      setProduct({ ...product, unit: null });
    }
    setProduct({ ...product, unit: e.value });
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [producttypes, setProductTypes] = useState();
  const [allproducttypes, setAllProductTypes] = useState();

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
      let s = [
        {
          label: "Mahsulot turi",
          value: "delete",
        },
      ];
      data.map((producttype) => {
        return s.push({
          label: producttype.name,
          value: producttype._id,
          producttype: { ...producttype },
        });
      });
      setProductTypes(s);
      setAllProductTypes(s);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify]);

  const changeProductType = (e) => {
    if (e.value === "delete") {
      setProduct({ ...product, producttype: null });
    }
    setProduct({ ...product, producttype: e.value });
  };

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
      let s = [
        {
          label: "Brend",
          value: "delete",
        },
      ];
      data.map((brand) => {
        return s.push({
          label: brand.name,
          value: brand._id,
        });
      });
      setBrands(s);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify]);

  const changeBrand = (e) => {
    if (e.value === "delete") {
      setProduct({ ...product, brand: null });
    }
    setProduct({ ...product, brand: e.value });
  };
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
        title: `${data.name} ${t("mahsuloti yaratildi!")}`,
        description: "",
        status: "success",
      });
      changeData("POST", data);
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, product, notify, clearInputs, changeData]);

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
        title: `${data.name} ${t("mahsuloti yangilandi!")}`,
        description: "",
        status: "success",
      });
      changeData("UPDATE", data);
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, product, notify, clearInputs, changeData]);

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
        title: `${data.name} ${t("mahsuloti o'chirildi!")}`,
        description: "",
        status: "success",
      });
      changeData("DELETE", data);
      clearInputs();
      setModal(false);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, request, remove, notify, clearInputs, changeData]);

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
      notify({
        title: `${t("Barcha mahsulolar yuklandi!")}`,
        description: "",
        status: "success",
      });
      setProducts(data);
      setSearchStrorage(data);
      setCurrentProducts(data.slice(indexFirstProduct, indexLastProduct));
      setTableExcel(data);
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
  }, [
    auth,
    request,
    notify,
    clearInputs,
    changeImports,
    indexFirstProduct,
    indexLastProduct,
  ]);

  const checkUploadData = () => {
    if (checkProducts(changeImports)) {
      return notify(checkProducts(changeImports));
    }
    for (let product of changeImports) {
      product.code = String(product.code);
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
          item.category.code.includes(e.target.value) ||
          item.code.includes(e.target.value)
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

  const searchProductTypeAndProductName = useCallback(
    (e) => {
      const searching = searchStorage.filter(
        (item) =>
          item.producttype.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProducts(searching);
      setCurrentProducts(searching.slice(0, countPage));
    },
    [searchStorage, countPage]
  );
  const searchBrand = useCallback(
    (e) => {
      const searching = searchStorage.filter(
        (item) =>
          (item.brand &&
            item.brand.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (e.target.value === "" && item)
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
  const [n, setN] = useState();
  useEffect(() => {
    if (!n) {
      setN(1);
      getCategories();
      getProducts();
      getProductTypes();
      getUnits();
      getBrand();
    }
  }, [getProducts, getUnits, getCategories, getProductTypes, getBrand, n]);
  //====================================================================
  //====================================================================
  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="content-wrapper px-lg-5 px-3">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <InputProduct
              changeCategory={changeCategory}
              producttypes={producttypes}
              changeProductType={changeProductType}
              categories={categories}
              setProduct={setProduct}
              product={product}
              keyPressed={keyPressed}
              inputHandler={inputHandler}
              saveHandler={saveHandler}
              loading={loading}
              units={units}
              brands={brands}
              clearInputs={clearInputs}
              changeBrand={changeBrand}
              changeUnit={changeUnit}
              selectRef={selectRef}
            />
            <TableProduct
              producttypes={producttypes}
              setImports={setImports}
              product={product}
              searchName={searchName}
              searchProductTypeAndProductName={searchProductTypeAndProductName}
              searchBrand={searchBrand}
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
              selectRef={selectRef}
              market={auth.market}
            />
          </div>
        </div>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={t("mahsulotnti o'chirishni tasdiqlaysizmi?")}
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
