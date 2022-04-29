import { useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { PaymentClients } from "./clientComponents/PaymentClients";
import { TableClients } from "./clientComponents/TableClients";
import { Modal } from "../components/Modal";

export const DebtClients = () => {
  const [beginDay, setBeginDay] = useState(
    new Date(new Date().setUTCHours(0, 0, 0, 0))
  );
  const [endDay, setEndDay] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  //====================================================================
  //====================================================================
  // MODAL
  const [modal, setModal] = useState(false);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // RegisterPage
  const [visible, setVisible] = useState(false);

  const changeVisible = () => setVisible(!visible);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const indexLastConnector = (currentPage + 1) * countPage;
  const indexFirstConnector = indexLastConnector - countPage;
  const [currentConnectors, setCurrentConnectors] = useState([]);

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

  //====================================================================
  //====================================================================
  // getConnectors
  const [connectors, setConnectors] = useState([]);
  const [searchStorage, setSearchStrorage] = useState([]);
  const [offlineDebts, setOfflineDebts] = useState([]);
  const [statsionarDebts, setStatsionarDebts] = useState([]);
  const [debts, setDebts] = useState([]);

  const getOfflineDebts = useCallback(
    async (beginDay, endDay) => {
      try {
        const data = await request(
          `/api/cashier/offline/debts`,
          "POST",
          { clinica: auth && auth.clinica._id, beginDay, endDay },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setOfflineDebts(data);
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

  const getStatsionarDebts = useCallback(
    async (beginDay, endDay) => {
      try {
        const data = await request(
          `/api/cashier/statsionar/debts`,
          "POST",
          { clinica: auth && auth.clinica._id, beginDay, endDay },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setStatsionarDebts(data);
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

  useEffect(() => {
    let debts;
    if (offlineDebts.length > 0 || statsionarDebts.length > 0) {
      debts = [...offlineDebts, ...statsionarDebts];
    } else {
      debts = [];
    }
    setDebts(debts);
    setCurrentConnectors(debts.slice(indexFirstConnector, indexLastConnector));
    setConnectors(debts);
    setSearchStrorage(debts);
  }, [offlineDebts, statsionarDebts, indexFirstConnector, indexLastConnector]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // SEARCH
  const searchFullname = useCallback(
    (e) => {
      const searching = searchStorage.filter((item) =>
        item.client.fullname
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setConnectors(searching);
      setCurrentConnectors(searching.slice(0, countPage));
    },
    [searchStorage, countPage]
  );

  const searchId = useCallback(
    (e) => {
      const searching = searchStorage.filter((item) =>
        item.client.id.toString().includes(e.target.value)
      );
      setConnectors(searching);
      setCurrentConnectors(searching.slice(0, countPage));
    },
    [searchStorage, countPage]
  );

  const sortDebts = (e) => {
    let sortEl = [];
    if (e.target.value === "none") {
      sortEl = [...debts];
    } else if (e.target.value === "statsionar") {
      sortEl = [...statsionarDebts];
    } else {
      sortEl = [...offlineDebts];
    }
    setSearchStrorage(sortEl);
    setCurrentConnectors(sortEl.slice(0, countPage));
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0);
      setCountPage(e.target.value);
      setCurrentConnectors(connectors.slice(0, countPage));
    },
    [countPage, connectors]
  );

  //====================================================================
  //====================================================================

  // const [connector, setConnector] = useState({
  //   clinica: auth.clinica && auth.clinica._id,
  //   probirka: 0,
  // });

  // const [services, setServices] = useState([]);

  //====================================================================
  //====================================================================

  const [payment, setPayment] = useState({});
  const [payCount, setPayCount] = useState("");

  const checkPayCount = () => {
    if (!payCount) {
      return notify({
        title: `Diqqat! To'lov kiritilmagan.`,
        description: `Iltimos to'lovni kirirting.`,
        status: "error",
      });
    }
    if (!payment.client) {
      return notify({
        title: `Diqqat! Mijoz aniqlamagan.`,
        description: `Iltimos Mijoz malumotlarini kirirting.`,
        status: "error",
      });
    }
    if (+payCount > +payment.debt) {
      return notify({
        title: `Diqqat! To'lov summasi qarz dan oshmaslik kerak.`,
        description: `Iltimos To'lovni tug'ri kiriting.`,
        status: "error",
      });
    }
    setModal(true);
  };

  const getPayment = (connector) => {
    setPayment(connector);
    setPayCount(connector.debt);
    setVisible(true);
  };

  console.log(payment);
  //====================================================================
  //====================================================================
  // PRODUCTS
  // const [products, setProducts] = useState([]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // CLIENT

  const [client, setClient] = useState({
    clinica: auth.clinica && auth.clinica._id,
    reseption: auth.user && auth.user._id,
  });

  //====================================================================
  //====================================================================
  // ChangeDate

  const changeStart = (e) => {
    setBeginDay(new Date(new Date(e).setUTCHours(0, 0, 0, 0)));
    getOfflineDebts(new Date(new Date(e).setUTCHours(0, 0, 0, 0)), endDay);
    getStatsionarDebts(new Date(new Date(e).setUTCHours(0, 0, 0, 0)), endDay);
  };

  const changeEnd = (e) => {
    const date = new Date(
      new Date(new Date().setDate(new Date(e).getDate() + 1)).setUTCHours(
        0,
        0,
        0,
        0
      )
    );

    setEndDay(date);
    getOfflineDebts(beginDay, date);
    getStatsionarDebts(beginDay, date);
  };

  //===================================================================
  //===================================================================
  //CreateHandler

  const sortPostPayment = () => {
    setPayment({ ...payment, debt: +payment.debt - +payCount });
    if (payment.client.id[0] === "S") {
      return postStatsionarDebts();
    } else {
      return postOfflineDebts();
    }
  };

  const postOfflineDebts = useCallback(async () => {
    try {
      const data = await request(
        `/api/cashier/offline/payment`,
        "POST",
        {
          payment: {
            ...payment,
            clinica: auth && auth.clinica._id,
          },
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem("data", data);
      setModal(false);
      setVisible(false);
      setPayment({});
      setPayCount("");
      notify({
        title: "To'lov muvaffaqqiyatli amalga oshirildi.",
        description: "",
        status: "success",
      });
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, payment, request, notify]);

  const postStatsionarDebts = useCallback(async () => {
    try {
      const data = await request(
        `/api/cashier/statsionar/payment`,
        "POST",
        {
          payment: {
            ...payment,
            clinica: auth && auth.clinica._id,
          },
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem("data", data);
      setModal(false);
      setVisible(false);
      setPayment({});
      setPayCount("");
      notify({
        title: "To'lov muvaffaqqiyatli amalga oshirildi.",
        description: "",
        status: "success",
      });
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [auth, payment, request, notify]);

  //===================================================================
  //===================================================================

  //====================================================================
  //====================================================================
  // useEffect

  const [t, setT] = useState(0);

  useEffect(() => {
    if (auth.clinica && !t) {
      setT(1);
      getOfflineDebts(beginDay, endDay);
      getStatsionarDebts(beginDay, endDay);
    }
  }, [auth, getOfflineDebts, getStatsionarDebts, t, beginDay, endDay]);

  //====================================================================
  //====================================================================
  return (
    <div>
      <div className="content-wrapper px-lg-5 px-3">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="row">
              <div className="col-12 text-end">
                <button
                  className={`btn btn-primary mb-2 w-100 ${
                    visible ? "d-none" : ""
                  }`}
                  onClick={changeVisible}
                >
                  Malumot
                </button>
                <button
                  className={`btn btn-primary mb-2 w-100 ${
                    visible ? "" : "d-none"
                  }`}
                  onClick={changeVisible}
                >
                  Malumot
                </button>
              </div>
            </div>
            <div className={` ${visible ? "" : "d-none"}`}>
              <PaymentClients
                payment={payment}
                client={client}
                payCount={payCount}
                setPayCount={setPayCount}
                checkPayCount={checkPayCount}
                loading={loading}
              />
            </div>
            <TableClients
              setVisible={setVisible}
              changeStart={changeStart}
              changeEnd={changeEnd}
              client={client}
              setClient={setClient}
              searchFullname={searchFullname}
              searchId={searchId}
              setCurrentPage={setCurrentPage}
              countPage={countPage}
              setCountPage={setCountPage}
              currentConnectors={currentConnectors}
              setCurrentConnectors={setCurrentConnectors}
              currentPage={currentPage}
              setPageSize={setPageSize}
              loading={loading}
              connectors={connectors}
              payment={payment}
              setPayment={setPayment}
              sortDebts={sortDebts}
              getPayment={getPayment}
            />
          </div>
        </div>
      </div>
      <Modal
        modal={modal}
        setModal={setModal}
        text={"to'lov qilishini tasdiqlaysizmi"}
        handler={sortPostPayment}
        basic={`Mijoz ${payment.client && payment.client.fullname}`}
      />
    </div>
  );
};

// 913385289
