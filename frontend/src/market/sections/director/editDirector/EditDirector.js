import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../../../context/AuthContext";
import { checkDirectorUpdateData } from "../../../loginAndRegister/checkData";
import { FileUpload } from "../../../loginAndRegister/fileUpLoad/FileUpload";
import { useHttp } from "../../../hooks/http.hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";

export const EditDirector = () => {
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

  const [director, setDirector] = useState();
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
  const styled = {
    borderColor: "#eee",
    boxShadow: "none",
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const handleImage = async (e) => {
    if (director.image) {
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
    setDirector({ ...director, image: file.filename });
    setLoad(false);
    notify({
      status: "success",
      description: "",
      title: t("Surat muvaffaqqiyatli yuklandi"),
    });
  };

  const removeImage = async (filename) => {
    try {
      setDirector({ ...director, image: null });
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
    setDirector({ ...director, [e.target.name]: e.target.value });
  };

  const updateHandler = async () => {
    if (checkDirectorUpdateData(director)) {
      return notify(checkDirectorUpdateData(director));
    }
    try {
      const data = await request("/api/director/update", "PUT", {
        ...director,
        clinica: auth.clinica._id,
      });
      notify({
        title: `${t("Tabriklaymiz")} ${
          director.firstname + " " + director.lastname
        }! ${t("Ma'lumotlaringiz yangilandi.")}`,
        description: "",
        status: "success",
      });
      localStorage.setItem("director", data);
      window.location.reload();
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
      return updateHandler();
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const getDirector = useCallback(async () => {
    try {
      const data = await request(
        "/api/director",
        "POST",
        {
          directorId: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setDirector(data);
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
  useEffect(() => {
    getBaseUrl();
    getDirector();
  }, [getBaseUrl, getDirector]);
  //====================================================================
  //====================================================================

  return (
    <>
      {/* {loading ? <Loader /> : ""} */}
      <div className="page-content mt-5 container-fluid">
        <div className="row">
          <div className="col-xl-7 mx-auto">
            <div className="card " style={{ borderTop: "4px solid #38B2AC " }}>
              <div className="card-body p-5">
                <div
                  className="card-title d-flex align-items-center"
                  style={{ fontSize: "20pt", color: "#38B2AC" }}
                >
                  <div>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <h5 className="mb-0 fs-5 ml-2" style={{ fontWeight: "600" }}>
                    {t("Direktor")}
                  </h5>
                </div>
                <hr />
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          className="m-0 mt-3"
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Ism")}
                        </FormLabel>
                        <Input
                          id="firstname"
                          defaultValue={
                            director && director.firstname && director.firstname
                          }
                          onKeyUp={keyPressed}
                          className="is-valid"
                          placeholder={t("Ismni kiriting")}
                          size="sm"
                          style={styled}
                          onChange={changeHandler}
                          name="firstname"
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Familiya")}
                        </FormLabel>
                        <Input
                          id="lastname"
                          defaultValue={
                            director && director.lastname && director.lastname
                          }
                          onKeyUp={keyPressed}
                          placeholder={t("Familiya kiriting")}
                          size="sm"
                          style={{ borderColor: "#eee", boxShadow: "none" }}
                          name="lastname"
                          onChange={changeHandler}
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Otasining ismi")}
                        </FormLabel>
                        <Input
                          id="fathername"
                          defaultValue={
                            director &&
                            director.fathername &&
                            director.fathername
                          }
                          onKeyUp={keyPressed}
                          placeholder={t("Otasini ismini kiriting")}
                          size="sm"
                          style={{ borderColor: "#eee", boxShadow: "none" }}
                          name="fathername"
                          onChange={changeHandler}
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-12">
                      <FormControl>
                        <FormLabel
                          style={{ color: "#38B2AC", marginTop: "1rem" }}
                        >
                          {t("Telefon")}
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon
                            children="+998"
                            style={{ height: "32px" }}
                          />
                          <Input
                            maxLength={9}
                            minLength={9}
                            id="phone"
                            type="number"
                            defaultValue={
                              director && director.phone && director.phone
                            }
                            onKeyUp={keyPressed}
                            placeholder={t("Telefon nomerni kiriting")}
                            size="sm"
                            style={{ borderColor: "#eee", boxShadow: "none" }}
                            name="phone"
                            onChange={changeHandler}
                          />
                        </InputGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <FormControl>
                      <FileUpload
                        removeImage={removeImage}
                        handleImage={handleImage}
                        load={load}
                        img={director && director.image}
                        imgUrl={
                          baseUrl &&
                          director &&
                          director.image &&
                          `${baseUrl}/api/upload/file/${director.image}`
                        }
                      />
                    </FormControl>
                  </div>

                  <div className="col-md-6 text-center mt-3">
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
                        onClick={updateHandler}
                      >
                        {t("Saqlash")}
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
