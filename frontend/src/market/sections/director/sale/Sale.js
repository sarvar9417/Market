import { t } from "i18next";
import { useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Modal } from "../components/Modal";
import { InputProduct } from "./components/InputProduct";
import { Products } from "./Products";
import { Selling } from "./Selling";
import { Card } from "./payment/Card";
import { Sales } from "./payment/Sales";
import { Cheque } from "./payment/Cheque";
import { ChequeConnectors } from "./payment/ChequeConnectors";
import { EditSelling } from "./EditSelling";
import { discountProcient, returnProduct } from "./returnProduct/turnProduct";
import { CardEdit } from "./payment/CardEdit";
export const Sale = () => {
  //====================================================================
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const [currentProducts, setCurrentProducts] = useState([]);

  //====================================================================
  //====================================================================
  // Toast
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
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkConnectors, setCheckConnectors] = useState(false);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Categories
  const [categories, setCategories] = useState([
    {
      label: t("Barcha kategoriyalar"),
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
          label: t("Barcha kategoriyalar"),
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
  // const [baseUrl, setBaseUrl] = useState();

  // const getBaseUrl = useCallback(async () => {
  //   try {
  //     const data = await request("/api/baseurl", "GET", null);
  //     setBaseUrl(data.baseUrl);
  //   } catch (error) {
  //     notify({
  //       title: error,
  //       description: "",
  //       status: "error",
  //     });
  //   }
  // }, [request, notify]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Producttypes
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
  // Brands
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
  // Exchangerate
  const [exchangerate, setExchangerate] = useState({ exchangerate: 0 });
  const getExchangerate = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/get`,

        "POST",
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setExchangerate(data);
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
  // Saleconnecter counts
  const [saleCounts, setSaleCounts] = useState(0);
  const getSaleCounts = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/checknumber`,
        "POST",
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setSaleCounts(data);
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
  // Saleprducts
  const [products, setProducts] = useState([]);
  const [saleproduct, setSaleProduct] = useState();
  const [saleproducts, setSaleProducts] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [totalpriceuzs, setTotalPriceUzs] = useState(0);
  const [sales, setSales] = useState({
    products: [],
    payment: {},
    debt: {},
    discount: {},
  });
  const [allSales, setAllSales] = useState({
    products: [],
    payments: [],
    debts: [],
    discounts: [],
  });

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
    for (const saleproduct of saleproducts) {
      if (e.value._id === saleproduct._id) {
        return notify({
          title: "Diqqat! Ushbu mahsulot ro'yxatga qo'shilgan. ",
          description: "Qayta qo'shmasdan qiymatini o'zgartirishingiz mumkin.",
          status: "warning",
        });
      }
    }
    setModal(true);
    setSaleProduct({
      product: e.value,
      totalprice: e.value.price.sellingprice,
      totalpriceuzs: e.value.price.sellingprice * exchangerate.exchangerate,
      pieces: 1,
      unitprice: e.value.price.sellingprice,
      unitpriceuzs: e.value.price.sellingprice * exchangerate.exchangerate,
    });
  };

  const setCounts = (e) => {
    let pieces = saleproduct.pieces;
    let unitprice = saleproduct.unitprice;
    let totalprice = saleproduct.totalprice;
    if (e.target.name === "pieces") {
      totalprice =
        Math.round(
          (!unitprice ? 0 : unitprice) * parseFloat(e.target.value) * 100
        ) / 100;
      setSaleProduct({
        ...saleproduct,
        pieces: e.target.value === "" ? "" : parseFloat(e.target.value),
        totalprice: e.target.value === "" ? 0 : totalprice,
        totalpriceuzs:
          e.target.value === "" ? 0 : totalprice * exchangerate.exchangerate,
      });
    }
    if (e.target.name === "unitprice") {
      totalprice =
        Math.round((!pieces ? 0 : pieces) * parseFloat(e.target.value) * 100) /
        100;
      setSaleProduct({
        ...saleproduct,
        unitprice: e.target.value === "" ? "" : parseFloat(e.target.value),
        unitpriceuzs:
          e.target.value === ""
            ? ""
            : parseFloat(e.target.value) * exchangerate.exchangerate,
        totalprice: e.target.value === "" ? 0 : totalprice,
        totalpriceuzs:
          e.target.value === "" ? 0 : totalprice * exchangerate.exchangerate,
      });
    }
  };

  const pushSaleProduct = () => {
    let sales = [...saleproducts];
    sales.unshift(saleproduct);
    setSaleProduct();
    setModal(false);
    setSaleProducts(sales);
    let total = sales.reduce((summ, sale) => {
      return sale.totalprice + summ;
    }, 0);
    setTotalPrice(Math.round(total * 100) / 100);
    setTotalPriceUzs(Math.round(total * exchangerate.exchangerate * 100) / 100);
    setPayment({
      ...payment,
      totalprice: Math.round(total * 100) / 100,
      totalpriceuzs:
        (Math.round(total * 100) / 100) * exchangerate.exchangerate,
      type: "cash",
      cash: Math.round(total * 100) / 100,
      cashuzs: Math.round(total * exchangerate.exchangerate * 100) / 100,
      discount: 0,
      discountuzs: 0,
    });
  };

  const editProducts = (product, index, type) => {
    let sales = [...saleproducts];
    sales.splice(index, 1);
    if (type === "edit") {
      setSaleProduct(product);
      setModal(true);
    }
    setSaleProducts(sales);
    let total = sales.reduce((summ, sale) => {
      return sale.totalprice + summ;
    }, 0);
    setTotalPrice(Math.round(total * 100) / 100);
    setTotalPriceUzs(Math.round(total * exchangerate.exchangerate * 100) / 100);
    setPayment({
      ...payment,
      totalprice: Math.round(total * 100) / 100,
      totalpriceuzs:
        (Math.round(total * 100) / 100) * exchangerate.exchangerate,
      type: "cash",
      cash: Math.round(total * 100) / 100,
      cashuzs: Math.round(total * exchangerate.exchangerate * 100) / 100,
      discount: 0,
      discountuzs: 0,
    });
  };
  //====================================================================
  //====================================================================

  // ===================================================================
  // ===================================================================
  // Saleconnectors
  const [saleconnectors, setSaleConnectors] = useState([]);

  const getSaleConnectors = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/getconnectors`,
        "POST",
        { market: auth.market._id, currentPage, countPage },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrentProducts(data);
      setSaleConnectors(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, auth, notify, countPage, currentPage]);

  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0);
      setCountPage(e.target.value);
      setCurrentProducts(saleconnectors.slice(0, e.target.value));
    },
    [saleconnectors]
  );
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // clients
  const [clients, setClients] = useState([]);
  const [storageClients, setStorageClients] = useState([]);
  const [client, setClient] = useState({});

  const getClients = useCallback(
    async (s) => {
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
            label: t("Barcha mijozlar"),
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
  // Packmans
  const [packmans, setPackmans] = useState([]);
  const [packman, setPackman] = useState({});

  const getPackmans = useCallback(async () => {
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
  }, [request, auth, notify]);

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
  // Discount and Payment
  const [discount, setDiscount] = useState({
    discount: 0,
    discountuzs: 0,
    procient: 0,
    isProcient: true,
  });

  const [debt, setDebt] = useState({
    debt: 0,
    debtuzs: 0,
    comment: "",
  });

  const [payment, setPayment] = useState({
    totalprice: 0,
    totalpriceuzs: 0,
    type: "cash",
    cash: totalprice,
    card: 0,
    transfer: 0,
    carduzs: 0,
    cashuzs: 0,
    transferuzs: 0,
    discount: 0,
    discountuzs: 0,
  });

  const clearDatas = useCallback(() => {
    setPayment({
      totalprice: 0,
      totalpriceuzs: 0,
      type: "cash",
      cash: 0,
      card: 0,
      transfer: 0,
      carduzs: 0,
      cashuzs: 0,
      transferuzs: 0,
      discount: 0,
      discountuzs: 0,
    });
    setDebt({
      debt: 0,
      debtuzs: 0,
      comment: "",
    });
    setDiscount({
      discount: 0,
      discountuzs: 0,
      procient: 0,
      isProcient: false,
    });
    setSaleProducts([]);
    setTotalPrice(0);
    setTotalPriceUzs(0);
    setPackman({});
    setClient({});
    getSaleCounts();
  }, [getSaleCounts]);

  let types = ["cash", "card", "transfer"];

  const changeDiscount = (e, p) => {
    if (discount.isProcient && e.target.value > 100) {
      return notify({
        title: t(
          "Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!"
        ),
        description: "",
        status: "error",
      });
    }
    if (Math.round(e.target.value * 100) / 100 > totalprice) {
      return notify({
        title: t(
          "Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!"
        ),
        description: "",
        status: "error",
      });
    }
    p.discount =
      e.target.value === "" ? "" : Math.round(e.target.value * 100) / 100;
    p.discountuzs =
      Math.round(e.target.value * exchangerate.exchangerate * 100) / 100;
    p.cash = 0;
    p.card = 0;
    p.transfer = 0;
    setDebt({
      ...debt,
      debt:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * e.target.value) / 100
              : e.target.value)) *
            100
        ) / 100,
      debtuzs:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * e.target.value) / 100
              : e.target.value)) *
            exchangerate.exchangerate *
            100
        ) / 100,
    });

    discount.isProcient
      ? setDiscount({
          ...discount,
          procient: e.target.value,
          discount:
            Math.round(((totalprice * e.target.value) / 100) * 100) / 100,
          discountuzs:
            Math.round(
              ((totalprice * e.target.value * exchangerate.exchangerate) /
                100) *
                100
            ) / 100,
        })
      : setDiscount({
          ...discount,
          procient:
            Math.round(((e.target.value * 100) / totalprice) * 100) / 100,
          discount: Math.round(e.target.value * 100) / 100,
          discountuzs:
            Math.round(e.target.value * exchangerate.exchangerate * 100) / 100,
        });
  };

  const changeDiscountUzs = (e, p) => {
    if (discount.isProcient && e.target.value > 100) {
      return notify({
        title: t(
          "Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!"
        ),
        description: "",
        status: "error",
      });
    }
    if (
      Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100 >
      totalprice
    ) {
      return notify({
        title: t(
          "Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!"
        ),
        description: "",
        status: "error",
      });
    }
    p.discount =
      Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100;
    p.discountuzs = e.target.value === "" ? "" : e.target.value;
    p.cash = 0;
    p.card = 0;
    p.transfer = 0;
    setDebt({
      ...debt,
      debt:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * (e.target.value / exchangerate.exchangerate)) /
                100
              : e.target.value / exchangerate.exchangerate)) *
            100
        ) / 100,
      debtuzs:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * (e.target.value / exchangerate.exchangerate)) /
                100
              : e.target.value / exchangerate.exchangerate)) *
            exchangerate.exchangerate *
            100
        ) / 100,
    });
    discount.isProcient
      ? setDiscount({
          ...discount,
          procient: e.target.value,
          discount:
            Math.round(((totalprice * e.target.value) / 100) * 100) / 100,
          discountuzs:
            Math.round(
              ((totalprice * e.target.value * exchangerate.exchangerate) /
                100) *
                100
            ) / 100,
        })
      : setDiscount({
          ...discount,
          procient:
            Math.round(
              (((e.target.value / exchangerate.exchangerate) * 100) /
                totalprice) *
                100
            ) / 100,
          discount:
            Math.round((e.target.value / exchangerate.exchangerate) * 100) /
            100,
          discountuzs: Math.round(e.target.value * 100) / 100,
        });
  };

  const changeType = (e, p) => {
    let total =
      (e.target.dataset.type === "cash"
        ? e.target.value === ""
          ? 0
          : Math.round(e.target.value * 100) / 100
        : payment.cash) +
      (e.target.dataset.type === "card"
        ? e.target.value === ""
          ? 0
          : Math.round(e.target.value * 100) / 100
        : payment.card) +
      (e.target.dataset.type === "transfer"
        ? e.target.value === ""
          ? 0
          : Math.round(e.target.value * 100) / 100
        : payment.transfer);

    if (Math.round((total + discount.discount) * 100) / 100 > totalprice) {
      return notify({
        title: t("Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!"),
        description: "",
        status: "error",
      });
    }
    p[e.target.dataset.type] =
      e.target.value === "" ? "" : Math.round(e.target.value * 100) / 100;
    p[e.target.dataset.type + "uzs"] =
      Math.round(e.target.value * 100 * exchangerate.exchangerate) / 100;
    setDebt({
      ...debt,
      debt: Math.round((totalprice - (total + discount.discount)) * 100) / 100,
      debtuzs:
        Math.round(
          (totalprice - (total + discount.discount)) *
            exchangerate.exchangerate *
            100
        ) / 100,
    });
  };

  const changeTypeUzs = (e, p) => {
    let total =
      (e.target.dataset.type === "cash"
        ? e.target.value === ""
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100
        : payment.cash) +
      (e.target.dataset.type === "card"
        ? e.target.value === ""
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100
        : payment.card) +
      (e.target.dataset.type === "transfer"
        ? e.target.value === ""
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100
        : payment.transfer);

    if (Math.round((total + discount.discount) * 100) / 100 > totalprice) {
      return notify({
        title: t("Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!"),
        description: "",
        status: "error",
      });
    }
    p[e.target.dataset.type] =
      Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100;
    p[e.target.dataset.type + "uzs"] =
      e.target.value === "" ? "" : Math.round(e.target.value * 100) / 100;
    setDebt({
      ...debt,
      debt: Math.round((totalprice - (total + discount.discount)) * 100) / 100,
      debtuzs:
        Math.round(
          (totalprice - (total + discount.discount)) *
            exchangerate.exchangerate *
            100
        ) / 100,
    });
  };

  const changeHandler = (e) => {
    let p = { ...payment };
    if (e.target.dataset.type === "discount") {
      if (e.target.dataset.money === "UZS") changeDiscountUzs(e, p);
      else changeDiscount(e, p);
    } else {
      if (e.target.dataset.money === "UZS") {
        changeTypeUzs(e, p);
      } else changeType(e, p);
    }
    setPayment(p);
  };

  const [paymentType, setPaymentType] = useState({
    type: "cash",
    name: "Naqt",
  });

  const typeHandler = (e) => {
    if (e.target.dataset.type === "debt") return;
    let p = { ...payment };
    if (
      e.target.dataset.type === "mixed" ||
      e.target.dataset.type === "discount"
    ) {
      setDebt({
        ...debt,
        debt: Math.round((totalprice - discount.discount) * 100) / 100,
        debtuzs:
          Math.round(
            (totalprice - discount.discount) * exchangerate.exchangerate * 100
          ) / 100,
      });
    }
    types.map((type) => {
      return type === e.target.dataset.type
        ? ((p[type] = Math.round((totalprice - discount.discount) * 100) / 100),
          (p[type + "uzs"] =
            Math.round(
              (totalprice - discount.discount) * exchangerate.exchangerate * 100
            ) / 100),
          (p.type = type),
          setDebt({
            ...debt,
            debt: 0,
            debtuzs: 0,
          }))
        : ((p[type] = 0), (p[type + "uzs"] = 0));
    });
    setPayment(p);
    setPaymentType({
      type: e.target.dataset.type,
      name: e.target.name,
    });
  };

  const changeProcient = () => {
    if (discount.isProcient) {
      setPayment({
        ...payment,
        discount: discount.discount,
        discountuzs: discount.discount * exchangerate.exchangerate,
      });
      setDiscount({
        ...discount,
        discount: discount.discount,
        discountuzs: discount.discount * exchangerate.exchangerate,
      });
    }

    if (!discount.isProcient) {
      let procient =
        Math.round(((discount.discount * 100) / totalprice) * 100) / 100;
      setPayment({
        ...payment,
        discount: procient,
        discountuzs: procient,
      });
      setDiscount({
        ...discount,
        discount: procient,
        discountuzs: procient * exchangerate.exchangerate,
      });
    }

    setDiscount({
      ...discount,
      isProcient: !discount.isProcient,
    });
  };

  const checkHandler = () => {
    let total =
      discount.discount +
      payment.card +
      payment.cash +
      payment.transfer +
      debt.debt;
    if (Math.round(total * 100) / 100 !== totalprice) {
      return notify({
        title: t("Diqqat! To'lov hisobida xatolik yuz bergan!"),
        description: "",
        status: "error",
      });
    }

    if (debt.debt > 0) {
      return setModal2(true);
    }

    return setModal3(true);
  };

  const changeCheck = (e) => {
    setCheckConnectors(true);
    setAllSales(e);
    window.scroll({ top: 0 });
  };

  const changeComment = (e) => {
    setDebt({ ...debt, comment: e.target.value });
  };

  const createHandler = useCallback(async () => {
    try {
      setModal2(false);
      setModal3(false);
      const data = await request(
        `/api/sales/saleproducts/register`,
        "POST",
        {
          market: auth.market._id,
          saleproducts,
          client,
          packman,
          discount,
          payment,
          debt,
          user: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCheck(true);
      setSales(data);
      clearDatas();
      setVisible(false);
      getSaleConnectors();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [
    request,
    notify,
    auth,
    discount,
    payment,
    debt,
    packman,
    client,
    saleproducts,
    clearDatas,
    getSaleConnectors,
  ]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Add products
  const [saleconnectorid, setSaleConnectorId] = useState();
  const addProducts = (e) => {
    setSaleCounts({ count: (e.id % 1000000) - 1 });
    setSaleConnectorId(e._id);
    window.scroll({ top: 0 });
  };

  const addHandler = useCallback(async () => {
    try {
      setModal2(false);
      setModal3(false);
      const data = await request(
        `/api/sales/saleproducts/addproducts`,
        "POST",
        {
          market: auth.market._id,
          saleconnectorid,
          saleproducts,
          client,
          packman,
          discount,
          payment,
          debt,
          user: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCheck(true);
      setSales(data);
      clearDatas();
      setVisible(false);
      getSaleConnectors();
      setSaleConnectorId();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [
    request,
    notify,
    auth,
    discount,
    payment,
    debt,
    packman,
    client,
    saleproducts,
    clearDatas,
    getSaleConnectors,
    saleconnectorid,
  ]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Edit products
  const [editExchanrate, setEditExchanrate] = useState({
    exchangerate: 0,
  });
  const [paymentEdit, setPaymentEdit] = useState({
    totalprice: 0,
    totalpriceuzs: 0,
    type: "cash",
    cash: 0,
    card: 0,
    transfer: 0,
    carduzs: 0,
    cashuzs: 0,
    transferuzs: 0,
    discount: 0,
    discountuzs: 0,
  });

  const [paymentTypeEdit, setPaymentTypeEdit] = useState({
    type: "cash",
    name: "Naqt",
  });

  const typeHandlerEdit = (e) => {
    if (e.target.dataset.type === "debt") return;

    let p = { ...paymentEdit };
    p.type = e.target.dataset.type;
    if (e.target.dataset.type === "mixed") {
      setDebt({
        ...debt,
        debt:
          Math.round(
            (totalprice -
              editDiscounts.reduce((summ, discount) => {
                return summ + discount.discount;
              }, 0) -
              editPayments.reduce((summ, payment) => {
                return summ + payment.payment;
              }, 0)) *
              100
          ) / 100,
        debtuzs:
          Math.round(
            (totalpriceuzs -
              editDiscounts.reduce((summ, discount) => {
                return summ + discount.discountuzs;
              }, 0) -
              editPayments.reduce((summ, payment) => {
                return summ + payment.paymentuzs;
              }, 0)) *
              100
          ) / 100,
      });
    }
    types.map((type) => {
      return type === e.target.dataset.type
        ? ((p[type] =
            Math.round(
              (totalprice -
                editDiscounts.reduce((summ, discount) => {
                  return summ + discount.discount;
                }, 0) -
                editPayments.reduce((summ, payment) => {
                  return summ + payment.payment;
                }, 0)) *
                100
            ) / 100),
          (p[type + "uzs"] =
            Math.round(
              (totalpriceuzs -
                editDiscounts.reduce((summ, discount) => {
                  return summ + discount.discountuzs;
                }, 0) -
                editPayments.reduce((summ, payment) => {
                  return summ + payment.paymentuzs;
                }, 0)) *
                100
            ) / 100),
          (p.type = type),
          setDebt({
            ...debt,
            debt: 0,
            debtuzs: 0,
          }))
        : ((p[type] = 0), (p[type + "uzs"] = 0));
    });
    setPaymentEdit(p);
    setPaymentTypeEdit({
      type: e.target.dataset.type,
      name: e.target.name,
    });
    console.log(p);
  };

  const changeTypeEdit = (e, p) => {
    let total =
      (e.target.dataset.type === "cash"
        ? e.target.value === ""
          ? 0
          : Math.round(e.target.value * 100) / 100
        : paymentEdit.cash) +
      (e.target.dataset.type === "card"
        ? e.target.value === ""
          ? 0
          : Math.round(e.target.value * 100) / 100
        : paymentEdit.card) +
      (e.target.dataset.type === "transfer"
        ? e.target.value === ""
          ? 0
          : Math.round(e.target.value * 100) / 100
        : paymentEdit.transfer);

    const disc = editDiscounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = editPayments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);
    const val = Math.round(e.target.value * 100) / 100;

    const totals = Math.round((totalprice - pays - disc) * 100) / 100;
    if (
      (totals > 0 && val < 0) ||
      (totals < 0 && val > 0) ||
      (totals < 0 && Math.round(total * 100) / 100 < totals) ||
      (totals > 0 && Math.round(total * 100) / 100 > totals)
    ) {
      return notify({
        title: t("Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!"),
        description: "",
        status: "error",
      });
    }
    p[e.target.dataset.type] =
      e.target.value === "" ? "" : Math.round(e.target.value * 100) / 100;
    p[e.target.dataset.type + "uzs"] =
      Math.round(e.target.value * 100 * editExchanrate.exchangerate) / 100;
    setDebt({
      ...debt,
      debt:
        Math.round(
          (totalprice -
            editDiscounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            editPayments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0) -
            p.cash -
            p.card -
            p.transfer) *
            100
        ) / 100,
      debtuzs:
        Math.round(
          (totalpriceuzs -
            editDiscounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            editPayments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0) -
            p.cashuzs -
            p.carduzs -
            p.transferuzs) *
            100
        ) / 100,
    });
  };

  const changeTypeUzsEdit = (e, p) => {
    let total =
      (e.target.dataset.type === "cash"
        ? e.target.value === ""
          ? 0
          : Math.round((e.target.value / editExchanrate.exchangerate) * 100) /
            100
        : payment.cash) +
      (e.target.dataset.type === "card"
        ? e.target.value === ""
          ? 0
          : Math.round((e.target.value / editExchanrate.exchangerate) * 100) /
            100
        : payment.card) +
      (e.target.dataset.type === "transfer"
        ? e.target.value === ""
          ? 0
          : Math.round((e.target.value / editExchanrate.exchangerate) * 100) /
            100
        : payment.transfer);

    const disc = editDiscounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = editPayments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);
    const val = Math.round(e.target.value * 100) / 100;

    const totals = Math.round((totalprice - pays - disc) * 100) / 100;
    if (
      (totals > 0 && val < 0) ||
      (totals < 0 && val > 0) ||
      (totals < 0 && Math.round(total * 100) / 100 < totals) ||
      (totals > 0 && Math.round(total * 100) / 100 > totals)
    ) {
      return notify({
        title: t("Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!"),
        description: "",
        status: "error",
      });
    }
    p[e.target.dataset.type] =
      Math.round((e.target.value / editExchanrate.exchangerate) * 100) / 100;
    p[e.target.dataset.type + "uzs"] =
      e.target.value === "" ? "" : Math.round(e.target.value * 100) / 100;
    setDebt({
      ...debt,
      debt:
        Math.round(
          (totalprice -
            editDiscounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            editPayments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0) -
            p.cash -
            p.card -
            p.transfer) *
            100
        ) / 100,
      debtuzs:
        Math.round(
          (totalpriceuzs -
            editDiscounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            editPayments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0) -
            p.cashuzs -
            p.carduzs -
            p.transferuzs) *
            100
        ) / 100,
    });
  };

  const changeHandlerEdit = (e) => {
    let p = { ...paymentEdit };
    if (e.target.dataset.money === "UZS") {
      changeTypeUzsEdit(e, p);
    } else changeTypeEdit(e, p);

    setPaymentEdit(p);
  };

  const [editSaleProducts, setEditSaleProducts] = useState([]);
  const [editSaleConnectorId, setEditSaleConnectorId] = useState({ _id: 0 });
  const [editSaleConnector, setEditSaleConnector] = useState({});
  const [editPayments, setEditPayments] = useState([]);
  const [editDiscounts, setEditDiscounts] = useState([]);
  const editHandler = (e) => {
    setTotalPrice(
      e.products.reduce((summ, product) => {
        return summ + product.totalprice;
      }, 0)
    );
    setTotalPriceUzs(
      e.products.reduce((summ, product) => {
        return summ + product.totalpriceuzs;
      }, 0)
    );
    setEditSaleConnector(e);
    let products = [];
    e.products.forEach((product) => {
      products.push({ ...product, pieces: 0, totalprice: 0, totalpriceuzs: 0 });
    });
    setEditSaleProducts(products);
    setEditSaleConnectorId(e._id);
    setEditPayments([...e.payments]);
    setEditDiscounts([...e.discounts]);
    setSaleProducts([...e.products]);
    window.scroll({ top: 0 });
  };

  const changeBack = (e) => {
    let products = [...editSaleProducts];
    if (
      parseFloat(e.target.value) >
      editSaleConnector.products[parseInt(e.target.id)].pieces
    ) {
      return notify({
        title:
          "Diqqat! Xarid qilingan mahsulotdan ortiq mahsulot qaytarishning imkoni mavjud emas!",
        description: "",
        status: "warning",
      });
    }
    let EditDiscounts = [...editDiscounts];
    for (const i in EditDiscounts) {
      if (
        EditDiscounts[i]._id === products[parseInt(e.target.id)].discount &&
        EditDiscounts[i].procient > 0
      ) {
        EditDiscounts[i] = { ...editSaleConnector.discounts[i] };
        setEditSaleProducts(returnProduct(products, e));
        discountProcient(EditDiscounts, products, e, i);
      }
    }
    setEditDiscounts(EditDiscounts);

    let total =
      editSaleConnector.products.reduce((summ, product) => {
        return summ + product.totalprice;
      }, 0) -
      products.reduce((summ, product) => {
        return summ + product.totalprice;
      }, 0);

    let totaluzs =
      editSaleConnector.products.reduce((summ, product) => {
        return summ + product.totalpriceuzs;
      }, 0) -
      products.reduce((summ, product) => {
        return summ + product.totalpriceuzs;
      }, 0);

    let cashuzs =
      totaluzs -
      EditDiscounts.reduce((summ, discount) => {
        return summ + discount.discountuzs;
      }, 0) -
      editPayments.reduce((summ, payment) => {
        return summ + payment.paymentuzs;
      }, 0);

    let cash =
      total -
      EditDiscounts.reduce((summ, discount) => {
        return summ + discount.discount;
      }, 0) -
      editPayments.reduce((summ, payment) => {
        return summ + payment.payment;
      }, 0);

    setTotalPrice(total);
    setTotalPriceUzs(totaluzs);
    setPaymentEdit({
      ...paymentEdit,
      cash: Math.round(cash * 100) / 100,
      cashuzs: Math.round(cashuzs * 100) / 100,
      type: "cash",
    });
    setEditExchanrate({
      exchangerate:
        Math.round(
          (editSaleConnector.products[parseInt(e.target.id)].unitpriceuzs /
            editSaleConnector.products[parseInt(e.target.id)].unitprice) *
            100
        ) / 100,
    });
  };

  const checkHandlerEdit = () => {
    const disc = editDiscounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = editPayments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);

    let total =
      disc +
      pays +
      paymentEdit.card +
      paymentEdit.cash +
      paymentEdit.transfer +
      debt.debt;

    if (Math.round(total * 100) / 100 !== Math.round(totalprice * 100) / 100) {
      return notify({
        title: t("Diqqat! To'lov hisobida xatolik yuz bergan!"),
        description: "",
        status: "error",
      });
    }
    console.log("salom");
    if (debt.debt > 0) {
      return setModal4(true);
    }

    return setModal5(true);
  };

  const createHandlerEdit = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/registeredit`,
        "POST",
        {
          market: auth.market._id,
          saleproducts: editSaleProducts,
          discounts: editDiscounts,
          payment: paymentEdit,
          debt,
          saleconnectorid: editSaleConnectorId,
          user: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setModal4(false);
      setModal5(false);
      setCheck(true);
      setSales(data);
      clearDatas();
      setVisibleEdit(false);
      getSaleConnectors();
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [
    request,
    notify,
    auth,
    debt,
    // clearDatas,
    // getSaleConnectors,
    editDiscounts,
    editSaleProducts,
    paymentEdit,
    editSaleConnectorId,
    getSaleConnectors,
    clearDatas,
  ]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // UseEffect
  const [n, setN] = useState();
  useEffect(() => {
    getSaleConnectors();
  }, [currentPage, getSaleConnectors, countPage]);

  useEffect(() => {
    if (!n) {
      setN(1);
      getCategories();
      getProductTypes();
      getBrand();
      getPackmans();
      getClients();
      // getBaseUrl();
      getExchangerate();
      getSaleCounts();
    }
  }, [
    getCategories,
    getProductTypes,
    getBrand,
    getPackmans,
    getClients,
    n,
    // getBaseUrl,
    getExchangerate,
    getSaleCounts,
    getSaleConnectors,
  ]);
  //====================================================================
  //====================================================================

  return (
    <div className=''>
      {/* <div className={`${editVisible ? "" : "hidden"}`}>
        <EditSaleProducts />
      </div> */}
      <div className={`${check ? "" : "hidden"}`}>
        <Cheque sales={sales} setCheck={setCheck} />
      </div>
      <div className={`${checkConnectors ? "" : "hidden"}`}>
        <ChequeConnectors sales={allSales} setCheck={setCheckConnectors} />
      </div>
      <div className={visible ? "" : "hidden"}>
        <Card
          client={client}
          exchangerate={exchangerate}
          checkNumber={saleCounts}
          checkHandler={checkHandler}
          discount={discount}
          changeProcient={changeProcient}
          changeHandler={changeHandler}
          paymentType={paymentType}
          typeHandler={typeHandler}
          totalprice={totalprice}
          visible={visible}
          setVisible={setVisible}
          payment={payment}
          debt={debt}
        />
      </div>
      <div className={visibleEdit ? "" : "hidden"}>
        <CardEdit
          totalpriceuzs={totalpriceuzs}
          client={client}
          exchangerate={exchangerate}
          checkNumber={saleCounts}
          checkHandler={checkHandlerEdit}
          discount={editDiscounts}
          changeHandler={changeHandlerEdit}
          paymentType={paymentTypeEdit}
          typeHandler={typeHandlerEdit}
          totalprice={totalprice}
          visible={visibleEdit}
          setVisible={setVisibleEdit}
          payment={paymentEdit}
          debt={debt}
        />
      </div>

      {/* <Payment /> */}
      <div
        className={visible || checkConnectors || check ? "invisible" : "m-3 "}>
        {editSaleConnectorId._id !== 0 ? (
          <EditSelling
            changeBack={changeBack}
            editSaleConnector={editSaleConnector}
            checkNumber={saleCounts}
            payment={editPayments}
            discount={editDiscounts}
            debt={debt}
            totalprice={totalprice}
            setVisible={setVisibleEdit}
            editProducts={editProducts}
            saleproducts={editSaleProducts}
            packmans={packmans}
            clients={clients}
            changePackman={changePackman}
            changeClient={changeClient}
            inputClient={inputClient}
          />
        ) : (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-7 pb-3'>
            <div className='md:col-span-2 w-full'>
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
            <div className='md:col-span-5 w-full'>
              <Selling
                checkNumber={saleCounts}
                payment={payment}
                discount={discount}
                debt={debt}
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
        )}
        <Sales
          editHandler={editHandler}
          currentPage={currentPage}
          addProducts={addProducts}
          saleCounts={saleCounts}
          setCurrentProducts={setCurrentProducts}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          countPage={countPage}
          currentProducts={currentProducts}
          saleconnectors={saleconnectors}
          changeCheck={changeCheck}
        />
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={<InputProduct setCounts={setCounts} product={saleproduct} />}
        // text={"mahsulotnti o'chirishni tasdiqlaysizmi?"}
        handler={pushSaleProduct}
      />

      <Modal
        modal={modal2}
        setModal={setModal2}
        basic={`${t("Diqqat! Iltimos")} ${debt.debt.toLocaleString(
          "de-DE"
        )}$ (${(debt.debt * exchangerate.exchangerate).toLocaleString(
          "de-DE"
        )} ${t("so'm)  qarzdorlik uchun izoh kiriting")}`}
        text={
          <input
            onChange={changeComment}
            className='block border w-full px-2 rounded'
            placeholder={t("Izoh")}
          />
        }
        handler={saleconnectorid ? addHandler : createHandler}
      />

      <Modal
        modal={modal3}
        setModal={setModal3}
        basic={t(`Mijozdan to'lov qabul qilishni tasdiqlaysizmi?`)}
        handler={saleconnectorid ? addHandler : createHandler}
      />

      <Modal
        modal={modal4}
        setModal={setModal4}
        basic={`${t("Diqqat! Iltimos")} ${debt.debt.toLocaleString(
          "de-DE"
        )}$ (${(debt.debt * editExchanrate.exchangerate).toLocaleString(
          "de-DE"
        )} ${t("so'm)  qarzdorlik uchun izoh kiriting")}`}
        text={
          <input
            onChange={changeComment}
            className='block border w-full px-2 rounded'
            placeholder={t("Izoh")}
          />
        }
        handler={createHandlerEdit}
      />

      <Modal
        modal={modal5}
        setModal={setModal5}
        basic={t(`Mijozdan to'lov qabul qilishni tasdiqlaysizmi?`)}
        handler={createHandlerEdit}
      />
    </div>
  );
};
