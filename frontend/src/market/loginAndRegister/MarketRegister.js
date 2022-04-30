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
import { checkClinicaData } from "./checkData";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseMedical } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../loader/Loader";
const storageName = "clinicaData";

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

export const ClinicaRegister = () => {
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
  const [clinica, setClinica] = useState({
    image: null,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const handleImage = async (e) => {
    if (clinica.image) {
      return notify({
        title: "Diqqat! Surat avval yuklangan",
        description:
          "Suratni qayta yulash uchun suratni ustiga bir marotaba bosib uni o'chiring!",
        status: "error",
      });
    }
    const files = e.target.files[0];
    const data = new FormData();
    data.append("file", files);
    setLoad(true);
    const res = await fetch("/api/upload", { method: "POST", body: data });
    const file = await res.json();
    setClinica({ ...clinica, image: file.filename });
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
      setClinica({ ...clinica, image: null });
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
    setClinica({ ...clinica, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const createHandler = async () => {
    if (checkClinicaData(clinica)) {
      return notify(checkClinicaData(clinica));
    }
    try {
      const data = await request("/api/clinica/register", "POST", {
        ...clinica,
      });
      localStorage.setItem(
        storageName,
        JSON.stringify({
          clinica: data,
        })
      );
      notify({
        title:
          "Tabriklaymiz! Klinikangiz 'Alo24' dasturida muvaffaqqiyatli ro'yxatga olindi ",
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
                    Shifoxona
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
                          Shifoxona nomi
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          className="is-valid"
                          placeholder="Shifoxona nomini kiriting"
                          size="sm"
                          style={
                            clinica.name && clinica.name.length > 0
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
                          Tashkilot nomi
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder="Tashkilot nomini kiriting"
                          size="sm"
                          style={
                            clinica.organitionName &&
                            clinica.organitionName.length > 0
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
                          Manzil
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder="Manzilni kiriting"
                          size="sm"
                          style={
                            clinica.address && clinica.address.length > 0
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
                          Mo'ljal
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder="Mo'ljalni kiriting"
                          size="sm"
                          style={
                            clinica.orientation &&
                            clinica.orientation.length > 0
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
                          Telefon raqam1
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={
                              clinica.phone1 && clinica.phone1.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                          />
                          <Input
                            onKeyUp={keyPressed}
                            type="tel"
                            placeholder="Telefon raqamni kiriting"
                            size="sm"
                            style={
                              clinica.phone1 && clinica.phone1.length > 0
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
                          Telefon raqam2
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={
                              clinica.phone2 && clinica.phone2.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                          />
                          <Input
                            onKeyUp={keyPressed}
                            type="tel"
                            placeholder="Telefon raqamni kiriting"
                            size="sm"
                            style={
                              clinica.phone2 && clinica.phone2.length > 0
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
                          Telefon raqam3
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={
                              clinica.phone3 && clinica.phone3.length > 0
                                ? styleGreen
                                : styleDefault
                            }
                          />
                          <Input
                            onKeyUp={keyPressed}
                            type="tel"
                            placeholder="Telefon raqamni kiriting"
                            size="sm"
                            style={
                              clinica.phone3 && clinica.phone3.length > 0
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
                          Bank nomi
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          placeholder="Bank nomini kiriting"
                          size="sm"
                          style={
                            clinica.bank && clinica.bank.length > 0
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
                          INN
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          type="number"
                          placeholder="INN ni kiriting"
                          size="sm"
                          style={
                            clinica.inn && clinica.inn.length > 0
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
                          Hisob raqam
                        </FormLabel>
                        <Input
                          onKeyUp={keyPressed}
                          type="number"
                          placeholder="Hisob raqamni kiriting"
                          size="sm"
                          style={
                            clinica.bankNumber && clinica.bankNumber.length > 0
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
                        img={clinica.image}
                        imgUrl={
                          baseUrl &&
                          clinica.image &&
                          `${baseUrl}/api/upload/file/${clinica.image}`
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
                        Registratsiya
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
