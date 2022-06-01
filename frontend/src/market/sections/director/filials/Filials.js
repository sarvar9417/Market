import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";
import { FileUpload } from "../../../loginAndRegister/fileUpLoad/FileUpload";
import { useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseMedical } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../../../loader/Loader";
import { AuthContext } from "../../../context/AuthContext";

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

export const Filials = () => {
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
  const auth = useContext(AuthContext);
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
  const [branch, setBranch] = useState({
    image: null,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const handleImage = async (e) => {
    if (branch.image) {
      return notify({
        title: "Diqqat! Surat avval yuklangan",
        description:
          "Suratni qayta yuklash uchun suratni ustiga bir marotaba bosib uni o'chiring!",
        status: "error",
      });
    }
    const files = e.target.files[0];
    const data = new FormData();
    data.append("file", files);
    setLoad(true);
    const res = await fetch("/api/upload", { method: "POST", body: data });
    const file = await res.json();
    setBranch({ ...branch, image: file.filename });
    setLoad(false);
    notify({
      status: "success",
      description: "",
      title: "Surat muvaffaqqiyatli yuklandi",
    });
  };

  const removeImage = async (filename) => {
    try {
      const data = await request(`/api/upload/del`, "POST", { filename });
      setBranch({ ...branch, image: null });
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

  const [allmarkets, setAllMarkets] = useState([]);

  const getAllMarkets = useCallback(async () => {
    try {
      const data = await request(
        "/api/market",
        "POST",
        {
          market: auth.market._id,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setAllMarkets(data);
    } catch (error) {
      notify({
        status: "error",
        description: "",
        title: error,
      });
    }
  }, [auth, notify, request]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const changeHandler = (e) => {
    if (e.target.name === "select") {
      if (e.target.value === "delete") {
        setBranch({ ...branch, market: null });
      } else {
        setBranch({ ...branch, market: e.target.value });
      }
    } else {
      setBranch({ ...branch, [e.target.name]: e.target.value });
    }
  };

  const createHandler = async () => {
    try {
      const data = await request(
        "/api/branch/register",
        "POST",
        { ...branch },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} filiali yaratildi!`,
        description: "",
        status: "success",
      });
      setBranch({ image: null });
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
    getAllMarkets();
  }, [getBaseUrl, getAllMarkets]);
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
                    Flilial
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
                          Filial nomi
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          className="is-valid"
                          placeholder={"Filial nomini kiriting"}
                          size="sm"
                          style={
                            branch.name && branch.name.length > 0
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
                          {"Tashkilot nomi"}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder={"Tashkilot nomini kiriting"}
                          size="sm"
                          style={
                            branch.organitionName &&
                            branch.organitionName.length > 0
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
                          {"Manzil"}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder={"Manzilni kiriting"}
                          size="sm"
                          style={
                            branch.address && branch.address.length > 0
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
                          {"Mo'ljal"}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder={"Mo'ljalni kiriting"}
                          size="sm"
                          style={
                            branch.orientation && branch.orientation.length > 0
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
                          {"Telefon raqam1"}
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={
                              branch.phone1 && branch.phone1.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                          />
                          <Input
                            onKeyUp={keyPressed}
                            type="tel"
                            placeholder={"Telefon raqamni kiriting"}
                            size="sm"
                            style={
                              branch.phone1 && branch.phone1.length > 0
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
                          {"Telefon raqam2"}
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={
                              branch.phone2 && branch.phone2.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                          />
                          <Input
                            onKeyUp={keyPressed}
                            type="tel"
                            placeholder={"Telefon raqamni kiriting"}
                            size="sm"
                            style={
                              branch.phone2 && branch.phone2.length > 0
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
                          {"Telefon raqam3"}
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={
                              branch.phone3 && branch.phone3.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                          />
                          <Input
                            onKeyUp={keyPressed}
                            type="tel"
                            placeholder={"Telefon raqamni kiriting"}
                            size="sm"
                            style={
                              branch.phone3 && branch.phone3.length > 0
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
                      <p
                        className="bg-zinc-50 font-medium text-base mt-4 mb-2"
                        style={{ color: "#38B2AC" }}
                      >
                        Bosh do'kon
                      </p>
                      <select
                        name="select"
                        placeholder="Do'konni tanlang"
                        onChange={changeHandler}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block h-[32px] w-full px-2 py-1 outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      >
                        <option value="delete">Do'konni tanlang</option>
                        {allmarkets.map((market, ind) => (
                          <option key={ind} value={market._id}>
                            {market.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {"Bank nomi"}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder={"Bank nomini kiriting"}
                          size="sm"
                          style={
                            branch.bank && branch.bank.length > 0
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
                          {"INN"}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          type="number"
                          placeholder={"INN ni kiriting"}
                          size="sm"
                          style={
                            branch.inn && branch.inn.length > 0
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
                          {"Hisob raqam"}
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          type="number"
                          placeholder={"Hisob raqamni kiriting"}
                          size="sm"
                          style={
                            branch.bankNumber && branch.bankNumber.length > 0
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
                        img={branch.image}
                        imgUrl={
                          baseUrl &&
                          branch.image &&
                          `${baseUrl}/api/upload/file/${branch.image}`
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
                        {"Registratsiya"}
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
