import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";
import { FileUpload } from "./fileUpLoad/FileUpload";
import { useToast } from "@chakra-ui/react";
import { checkMarketData } from "./checkData";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseMedical } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../loader/Loader";
import { t } from "i18next";
const storageName = "marketData";

const styleDefault = {
  border: "1.5px solid #eee",
  boxShadow: "none",
  height: "32px",
};

const styleGreen = {
  border: "1.5px solid #38B2AC",
  boxShadow: "none",
  height: "32px",
};

export const MarketRegister = () => {
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
  const [load, setLoad] = useState(false);

  const { request, loading } = useHttp();
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
  const [market, setMarket] = useState({
    image: null,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const handleImage = async (e) => {
    if (market.image) {
      return notify({
        title: t("Diqqat! Surat avval yuklangan"),
        description:
          t("Suratni qayta yuklash uchun suratni ustiga bir marotaba bosib uni o'chiring!"),
        status: "error",
      });
    }
    const files = e.target.files[0];
    const data = new FormData();
    data.append("file", files);
    setLoad(true);
    const res = await fetch("/api/upload", { method: "POST", body: data });
    const file = await res.json();
    setMarket({ ...market, image: file.filename });
    setLoad(false);
    notify({
      status: "success",
      description: "",
      title: t("Surat muvaffaqqiyatli yuklandi"),
    });
  };

  const removeImage = async (filename) => {
    try {
      const data = await request(`/api/upload/del`, "POST", { filename });
      setMarket({ ...market, image: null });
      document.getElementById("default-btn").value = null;
      notify({
        status: "success",
        description: "",
        title: data.accept,
      });
    } catch (error) {
      notify({
        status: "error",
        description: "",
        title: error,
      });
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const changeHandler = (e) => {
    setMarket({ ...market, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const createHandler = async () => {
    if (checkMarketData(market)) {
      return notify(checkMarketData(market));
    }
    try {
      const data = await request("/api/market/register", "POST", {
        ...market,
      });
      localStorage.setItem(
        storageName,
        JSON.stringify({
          market: data,
        })
      );
      notify({
        title:
          t("Tabriklaymiz! Do'koningiz 'Alo24' dasturida muvaffaqqiyatli ro'yxatga olindi"),
        description: "",
        status: "success",
      });
      history.push("/newdirector");
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

  //====================================================================
  //====================================================================
  const keyPressed = (e) => {
    if (e.key === "Enter") {
      return createHandler();
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  useEffect(() => {
    getBaseUrl();
  }, [getBaseUrl]);
  //====================================================================
  //====================================================================

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="page-content container-fluid">
        <div className="row mt-5">
          <div className="col-xl-7 mx-auto">
            <div className="card " style={{ borderTop: "4px solid #38B2AC " }}>
              <div className="card-body p-5">
                <div
                  className="card-title d-flex align-items-center"
                  style={{ fontSize: "20pt", color: "#38B2AC" }}
                >
                  <div>
                    <FontAwesomeIcon icon={faHouseMedical} />
                  </div>
                  <h5 className="mb-0 fs-5 ml-2" style={{ fontWeight: "600" }}>
                    {t("Do'kon")}
                  </h5>
                </div>
                <hr />
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <FormControl isRequired>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Do'kon nomi")}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          className="is-valid"
                          placeholder={t("Do'kon nomini kiriting")}
                          size="sm"
                          style={
                            market.name && market.name.length > 0
                              ? styleGreen
                              : styleDefault
                          }
                          onChange={changeHandler}
                          name="name"
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Tashkilot nomi")}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder={t("Tashkilot nomini kiriting")}
                          size="sm"
                          style={
                            market.organitionName &&
                            market.organitionName.length > 0
                              ? styleGreen
                              : styleDefault
                          }
                          name="organitionName"
                          onChange={changeHandler}
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Manzil")}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder={t("Manzilni kiriting")}
                          size="sm"
                          style={
                            market.address && market.address.length > 0
                              ? styleGreen
                              : styleDefault
                          }
                          name="address"
                          onChange={changeHandler}
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Mo'ljal")}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder={t("Mo'ljalni kiriting")}
                          size="sm"
                          style={
                            market.orientation && market.orientation.length > 0
                              ? styleGreen
                              : styleDefault
                          }
                          name="orientation"
                          onChange={changeHandler}
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl isRequired>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Telefon raqam1")}
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={
                              market.phone1 && market.phone1.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                          />
                          <Input
                            onKeyUp={keyPressed}
                            type="tel"
                            placeholder={t("Telefon raqamni kiriting")}
                            size="sm"
                            style={
                              market.phone1 && market.phone1.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                            name="phone1"
                            onChange={changeHandler}
                          />
                        </InputGroup>
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Telefon raqam2")}
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={
                              market.phone2 && market.phone2.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                          />
                          <Input
                            onKeyUp={keyPressed}
                            type="tel"
                            placeholder={t("Telefon raqamni kiriting")}
                            size="sm"
                            style={
                              market.phone2 && market.phone2.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                            name="phone2"
                            onChange={changeHandler}
                          />
                        </InputGroup>
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Telefon raqam3")}
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={
                              market.phone3 && market.phone3.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                          />
                          <Input
                            onKeyUp={keyPressed}
                            type="tel"
                            placeholder={t("Telefon raqamni kiriting")}
                            size="sm"
                            style={
                              market.phone3 && market.phone3.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                            name="phone3"
                            onChange={changeHandler}
                          />
                        </InputGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Bank nomi")}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder={t("Bank nomini kiriting")}
                          size="sm"
                          style={
                            market.bank && market.bank.length > 0
                              ? styleGreen
                              : styleDefault
                          }
                          name="bank"
                          onChange={changeHandler}
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("INN")}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          type="number"
                          placeholder={t("INN ni kiriting")}
                          size="sm"
                          style={
                            market.inn && market.inn.length > 0
                              ? styleGreen
                              : styleDefault
                          }
                          name="inn"
                          onChange={changeHandler}
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Hisob raqam")}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          type="number"
                          placeholder={t("Hisob raqamni kiriting")}
                          size="sm"
                          style={
                            market.bankNumber && market.bankNumber.length > 0
                              ? styleGreen
                              : styleDefault
                          }
                          name="bankNumber"
                          onChange={changeHandler}
                        />
                      </FormControl>
                    </div>
                    <FormControl isRequired>
                      <FileUpload
                        removeImage={removeImage}
                        handleImage={handleImage}
                        load={load}
                        img={market.image}
                        imgUrl={
                          baseUrl &&
                          market.image &&
                          `${baseUrl}/api/upload/file/${market.image}`
                        }
                      />
                    </FormControl>
                  </div>

                  <div className="col-md-6 text-center mt-2">
                    {loading || load ? (
                      <Button
                        isLoading
                        colorScheme="teal"
                        variant="solid"
                      ></Button>
                    ) : (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        onClick={createHandler}
                      >
                        {t("Registratsiya")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
