import { useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Modal } from "../components/Modal";
import { InputProduct } from "./components/InputProduct";
// import { Payment } from './Payment'

import { Products } from "./Products";
import { Selling } from "./Selling";
import { Card } from "./payment/Card";
import { Cheque } from "./payment/Cheque";
export const Sale = () => {
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
  // AUTH

  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [categories, setCategories] = useState([
    {
      label: "Barcha kategoriyalar",
      value: "all",
    },
  ]);

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
      let c = [
        {
          label: "Barcha kategoriyalar",
          value: "all",
        },
      ];
      data.map((category) => {
        return c.push({
          label: category.code,
          type: "Category",
          value: category,
        });
      });
      setCategories(c);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify]);

  const changeCategory = (e) => {
    if (e.value === "all") {
      return setProductTypes(allproducttypes);
    }
    const filter = allproducttypes.filter((producttype) => {
      return producttype.value.category._id === e.value._id;
    });
    setProductTypes(filter);
    getProducts(e);
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [baseUrl, setBaseUrl] = useState();

  const getBaseUrl = useCallback(async () => {
    try {
      const data = await request("/api/baseurl", "GET", null);
      setBaseUrl(data.baseUrl);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, notify]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [allproducttypes, setAllProductTypes] = useState([]);
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
      let c = [];
      data.map((type) => {
        return c.push({
          label: type.name,
          type: "ProductType",
          value: type,
        });
      });
      setProductTypes(c);
      setAllProductTypes(c);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify]);

  const changeProductType = (e) => {
    getProducts(e);
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
      let c = [];
      data.map((type) => {
        return c.push({
          label: type.name,
          type: "Brand",
          value: type,
        });
      });
      setBrands(c);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify]);

  const changeBrand = (e) => {
    getProducts(e);
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [products, setProducts] = useState([]);
  const [saleproduct, setSaleProduct] = useState();
  const [saleproducts, setSaleProducts] = useState([]);
  const [totalprice, setTotalPrice] = useState(123);

  const getProducts = useCallback(
    async (type) => {
      try {
        const data = await request(
          `/api/products/product/getsale`,
          "POST",
          { market: auth.market._id, type: type.type, typeid: type.value._id },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        let c = [];
        data.map((type) => {
          return c.push({
            label: type.code + " " + type.name,
            type: "product",
            value: type,
          });
        });
        setProducts(c);
      } catch (error) {
        notify({
          title: error,
          description: "",
          status: "error",
        });
      }
    },
    [request, auth, notify]
  );

  const changeProduct = (e) => {
    setModal(true);
    setSaleProduct({
      ...e.value,
      totalprice: e.value.price.sellingprice,
      pieces: 1,
      unitprice: e.value.price.sellingprice,
    });
  };

  const setCounts = (e) => {
    let pieces = saleproduct.pieces;
    let unitprice = saleproduct.unitprice;
    let totalprice = saleproduct.totalprice;
    if (e.target.name === "pieces") {
      totalprice = (!unitprice ? 0 : unitprice) * parseFloat(e.target.value);
      setSaleProduct({
        ...saleproduct,
        pieces: e.target.value === "" ? "" : parseFloat(e.target.value),
        totalprice: e.target.value === "" ? 0 : totalprice,
      });
    }
    if (e.target.name === "unitprice") {
      totalprice = (!pieces ? 0 : pieces) * parseFloat(e.target.value);
      setSaleProduct({
        ...saleproduct,
        unitprice: e.target.value === "" ? "" : parseFloat(e.target.value),
        totalprice: e.target.value === "" ? 0 : totalprice,
      });
    }
  };

  const pushSaleProduct = () => {
    let sales = [...saleproducts];
    sales.unshift(saleproduct);
    setSaleProduct();
    setModal(false);
    setSaleProducts(sales);
    setTotalPrice(
      sales.reduce((summ, sale) => {
        return sale.totalprice + summ;
      }, 0)
    );
  };

  const editProducts = (product, index, type) => {
    let sales = [...saleproducts];
    sales.splice(index, 1);
    if (type === "edit") {
      setSaleProduct(product);
      setModal(true);
    }
    setSaleProducts(sales);
    setTotalPrice(
      sales.reduce((summ, sale) => {
        return sale.totalprice + summ;
      }, 0)
    );
  };

  const changeTotalPrice = (e) => {
    setTotalPrice(e.target.value);
  };
  //====================================================================
  //====================================================================

  // ===================================================================
  // ===================================================================
  const [packmans, setPackmans] = useState([]);

  const getPackmans = useCallback(
    async (type) => {
      try {
        const data = await request(
          `/api/sales/packman/getall`,
          "POST",
          { market: auth.market._id },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        let v = [];

        data.map((type) => {
          return v.push({
            label: type.name,
            value: type._id,
          });
        });
        setPackmans(v);
      } catch (error) {
        notify({
          title: error,
          description: "",
          status: "error",
        });
      }
    },
    [request, auth, notify]
  );
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [clients, setClients] = useState([]);
  const [storageClients, setStorageClients] = useState([]);

  const getClients = useCallback(
    async (type) => {
      try {
        const data = await request(
          `/api/sales/client/getall`,
          "POST",
          { market: auth.market._id },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        let v = [
          {
            label: "Barcha mijozlar",
            value: "all",
          },
        ];

        data.map((type) => {
          return v.push({
            label: type.name,
            value: type._id,
            packman: type.packman && type.packman._id,
          });
        });
        setStorageClients(v);
        setClients(v);
      } catch (error) {
        notify({
          title: error,
          description: "",
          status: "error",
        });
      }
    },
    [request, auth, notify]
  );
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [packman, setPackman] = useState({});

  const changePackman = (e) => {
    setPackman({
      name: e.label,
      _id: e.value,
    });
    if (e.value === "all") {
      setClients(storageClients);
    } else {
      const filter = storageClients.filter((item) => item.packman === e.value);
      setClients(filter);
    }
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [client, setClient] = useState({});

  const changeClient = (e) => {
    setClient({
      name: e.label,
      _id: e.value,
      packman: e.packman || null,
    });
  };

  const inputClient = (e) => {
    setClient({
      name: e.target.value,
    });
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Discount and Payment
  const [discount, setDiscount] = useState({
    price: 0,
    procient: 0,
  });

  const [debt, setDebt] = useState({
    debt: 0,
    comment: "",
  });

  const [payment, setPayment] = useState({
    payment: totalprice,
    type: "",
    cash: totalprice,
    card: 0,
    transfer: 0,
  });

  const [discountedPrice, setDiscountedPrice] = useState(totalprice);

  const [valueName, setValueName] = useState("payment");
  const [valueProperty, setValueProperty] = useState("cash");

  const showInput = (e) => {
    setValueName(e.target.name);
    setValueProperty(e.target.dataset.property);
    if (e.target.name === "payment") {
      setPayment({
        type: e.target.dataset.property,

        payment: 0,
        cash: 0,
        card: 0,
        transfer: 0,
      });
      setDebt({
        ...debt,
        debt: parseFloat(discountedPrice),
      });
    }
    if (e.target.dataset.property === "mixed") {
      setPayment({
        type: "mixed",
        payment: 0,
        cash: 0,
        card: 0,
        transfer: 0,
      });
      setDebt({
        ...debt,
        debt: parseFloat(discountedPrice),
      });
    }

    if (e.target.name === "discount") {
      setPayment({
        ...payment,
        payment: 0,
        cash: 0,
        card: 0,
        transfer: 0,
      });
    }
  };

  const changePay = (e) => {
    let num = parseFloat(e.target.value);
    if (valueName === "discount") {
      if (valueProperty === "price") {
        if (num > totalprice) {
          return notify({
            title: "Diqqat! Chegirma summasi qarz summasidan oshmaslik kerak!",
            description: "",
            status: "error",
          });
        } else {
          setDiscountedPrice(parseFloat(totalprice - num));
          setDiscount({
            price: num || 0,
            procient: parseFloat((num / (totalprice / 100)).toFixed(1)) || 0,
          });
          setDebt({
            ...debt,
            debt: num > 0 ? parseFloat(totalprice - num) : totalprice,
          });
        }
      }
      if (valueProperty === "procient") {
        let discountedprice = parseFloat(num * (totalprice / 100));
        if (discountedprice > totalprice) {
          return notify({
            title: "Diqqat! Chegirma summasi qarz summasidan oshmaslik kerak!",
            description: "",
            status: "error",
          });
        } else {
          setDiscountedPrice(parseFloat(totalprice - discountedprice));
          setDiscount({
            procient: parseFloat(num),
            price: discountedprice > 0 ? discountedprice : 0,
          });
          setDebt({
            ...debt,
            debt:
              parseFloat(num * (totalprice / 100)) > 0
                ? parseFloat(totalprice - parseFloat(num * (totalprice / 100)))
                : totalprice,
          });
        }
      }
    }

    if (valueName === "payment") {
      if (num > discountedPrice) {
        return notify({
          title: "Diqqat! To'lov summasi umumiy summasidan oshmaslik keraki!",
          description: "",
          status: "error",
        });
      } else {
        if (valueProperty === "cash") {
          setPayment({
            ...payment,
            payment: num || 0,
            cash: num || 0,
            card: 0,
            transfer: 0,
          });
          setDebt({
            ...debt,
            debt:
              num > 0
                ? parseFloat(discountedPrice - num)
                : parseFloat(discountedPrice),
          });
        }
        if (valueProperty === "card") {
          setPayment({
            ...payment,
            payment: num,
            card: num,
            cash: 0,
            transfer: 0,
          });
          setDebt({
            ...debt,
            debt: num > 0 ? parseFloat(discountedPrice) - num : discountedPrice,
          });
        }
        if (valueProperty === "transfer") {
          setPayment({
            ...payment,
            payment: num,
            transfer: num,
            cash: 0,
            card: 0,
          });
        }
        setDebt({
          ...debt,
          debt: num > 0 ? parseFloat(discountedPrice) - num : discountedPrice,
        });
      }
    }

    if (valueProperty === "mixed") {
      if (e.target.name === "cash") {
        if (num + payment.card + payment.transfer > discountedPrice) {
          return notify({
            title: "Diqqat! To'lov summasi umumiy summasidan oshmaslik keraki!",
            description: "",
            status: "error",
          });
        } else {
          setPayment({
            ...payment,
            payment: num + payment.card + payment.transfer,
            cash: num,
          });
          setDebt({
            ...debt,
            debt: discountedPrice - (num + payment.card + payment.transfer),
          });
        }
      }
      if (e.target.name === "card") {
        if (num + payment.cash + payment.transfer > discountedPrice) {
          return notify({
            title: "Diqqat! To'lov summasi umumiy summasidan oshmaslik keraki!",
            description: "",
            status: "error",
          });
        } else {
          setPayment({
            ...payment,
            payment: num + payment.cash + payment.transfer,
            card: num,
          });
          setDebt({
            ...debt,
            debt: discountedPrice - (num + payment.cash + payment.transfer),
          });
        }
      }
      if (e.target.name === "transfer") {
        if (num + payment.cash + payment.card > discountedPrice) {
          return notify({
            title: "Diqqat! To'lov summasi umumiy summasidan oshmaslik keraki!",
            description: "",
            status: "error",
          });
        } else {
          setPayment({
            ...payment,
            payment: num + payment.cash + payment.card,
            transfer: num,
          });
          setDebt({
            ...debt,
            debt: discountedPrice - (num + payment.cash + payment.card),
          });
        }
      }
    }
  };

  //====================================================================
  //====================================================================
  const [t, setT] = useState();
  useEffect(() => {
    if (!t) {
      setT(1);
      getCategories();
      getProductTypes();
      getBrand();
      getPackmans();
      getClients();
      getBaseUrl();
    }
  }, [
    getCategories,
    getProductTypes,
    getBrand,
    getPackmans,
    getClients,
    t,
    getBaseUrl,
  ]);

  //====================================================================
  //====================================================================

  return (
    <div className="">
      {/* <Cheque /> */}
      <Card
        totalprice={totalprice}
        saleproducts={saleproducts}
        client={client}
        visible={visible}
        setVisible={setVisible}
        changeTotalPrice={changeTotalPrice}
        discount={discount}
        payment={payment}
        debt={debt}
        valueName={valueName}
        showInput={showInput}
        valueProperty={valueProperty}
        changePay={changePay}
        discountedPrice={discountedPrice}
        setValueProperty={setValueProperty}
      />
      {/* <Payment /> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-7 p-3">
        <div className="md:col-span-2 w-full">
          <Products
            changeProduct={changeProduct}
            changeBrand={changeBrand}
            changeProductType={changeProductType}
            changeCategory={changeCategory}
            categories={categories}
            producttypes={producttypes}
            brands={brands}
            products={products}
          />
        </div>
        <div className="md:col-span-5 w-full">
          <Selling
            totalprice={totalprice}
            setVisible={setVisible}
            editProducts={editProducts}
            saleproducts={saleproducts}
            packmans={packmans}
            clients={clients}
            changePackman={changePackman}
            changeClient={changeClient}
            inputClient={inputClient}
          />
        </div>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={<InputProduct setCounts={setCounts} product={saleproduct} />}
        // text={"mahsulotnti o'chirishni tasdiqlaysizmi?"}
        handler={pushSaleProduct}
      />
    </div>
  );
};
