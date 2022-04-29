import React, { useCallback, useEffect, useState } from "react";
import { DirectorRouter } from "./DirectorRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./navbar_and_footer/Navbar";
import { useToast } from "@chakra-ui/react";
import { useHttp } from "../../hooks/http.hook";

export const Director = () => {
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

  const { request } = useHttp();

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
  useEffect(() => {
    getBaseUrl();
  }, [getBaseUrl]);
  //====================================================================
  //====================================================================
  return (
    <div>
      <Router>
        <Navbar baseUrl={baseUrl} />
        <DirectorRouter />
      </Router>
    </div>
  );
};
