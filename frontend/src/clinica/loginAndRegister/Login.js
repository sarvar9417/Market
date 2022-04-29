import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import Select from "react-select";
import { checkUserData } from "./checkData";
import Translate from "./../../translation/Translate";
import { useTranslation } from "react-i18next";
import PasswordInput from "./PasswordInput";
import { useToast } from "@chakra-ui/react";

export const Login = () => {
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
  const [hour, setHour] = useState(new Date().toLocaleTimeString());

  const weekDays = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  const monthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  setTimeout(() => {
    setHour(new Date().toLocaleTimeString());
  }, 1000);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();

  const [sections, setSections] = useState();
  const [user, setUser] = useState({
    type: null,
    password: null,
  });

  const getSections = useCallback(async () => {
    try {
      const data = await request("/api/sections", "GET", null);
      setSections(data);
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  }, [request, notify]);

  const changeHandler = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const loginHandler = async () => {
    if (checkUserData(user)) {
      return notify(checkUserData(user));
    }
    try {
      if (user.type === "Director") {
        const data = await request(`/api/director/login`, "POST", { ...user });
        auth.login(data.token, data.userId, data.user, data.clinica);
        notify({
          title: `Xush kelibsiz ${
            data.user.firstname + " " + data.user.lastname
          }!`,
          description: "Kirish muvaffaqqiyatli amalga oshirildi",
          status: "success",
        });
      } else {
        const data = await request(`/api/user/login`, "POST", { ...user });
        auth.login(data.token, data.userId, data.user, data.clinica);
        notify({
          title: `Xush kelibsiz ${
            data.user.firstname + " " + data.user.lastname
          }!`,
          description: "Kirish muvaffaqqiyatli amalga oshirildi",
          status: "success",
        });
      }
    } catch (error) {
      notify({
        title: error,
        description: "",
        status: "error",
      });
    }
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      return loginHandler();
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  useEffect(() => {
    if (!auth.token) {
      getSections();
    }
  }, [getSections, auth]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const { t } = useTranslation();
  //====================================================================
  //====================================================================

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="bg-lock-screen gradient">
        <div className="wrapper ">
          <Translate />
          <div className="authentication-lock-screen d-flex align-items-center justify-content-center">
            <div className="card shadow-none bg-transparent">
              <div className="card-body p-md-5 text-center">
                <div className="text-white" style={{ fontSize: "2rem" }}>
                  {hour}
                </div>
                <div className="text-white" style={{ fontSize: "1.25rem" }}>
                  {t(weekDays[new Date().getDay()])},<span> </span>
                  {new Date().getDate()}
                  <span> </span>
                  {t(monthNames[new Date().getMonth()])},<span> </span>
                  {new Date().getFullYear()}
                  <span> {t("yil")}</span>
                </div>
                <div className="">Mylogo</div>
                {/* <p className="mt-2 text-white">Administrator</p> */}

                <div className="mb-3 mt-3">
                  <Select
                    onChange={(e) => setUser({ ...user, type: e.type })}
                    options={sections && sections}
                    isLoading={loading}
                    style={{ height: "32px" }}
                    placeholder={t("select_n1")}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <PasswordInput
                    keyPressed={keyPressed}
                    name={"password"}
                    changeHandler={changeHandler}
                  />
                </div>
                <div className="d-grid">
                  <button onClick={loginHandler} className="btn btn-white">
                    {t("login_button")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
