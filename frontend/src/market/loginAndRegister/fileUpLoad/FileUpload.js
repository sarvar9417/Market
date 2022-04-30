import React from "react";
import cloudUpLoad from "./image/cloudUpLoad.png";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";

export const FileUpload = ({ imgUrl, img, handleImage, removeImage, load }) => {
  const toast = useToast();
  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="wrapper">
        {img ? (
          <div className="image" style={{ zIndex: "1" }}>
            <img
              id="clinicaimg"
              src={imgUrl}
              alt="Fayl topilmadi"
              className="rounded-3"
            />
            <button id="cancel-btn" onClick={() => removeImage(img)}>
              <SmallCloseIcon />
            </button>
          </div>
        ) : (
          <div className="content">
            <div className="icon">
              <img
                src={imgUrl ? imgUrl : cloudUpLoad}
                style={{ width: "100px", margin: "auto" }}
                alt="Klinika logotipi yoki suratini yuklang"
              />
            </div>
            <div className="text">Surat yuklanmagan!</div>
          </div>
        )}
      </div>
      <input
        id="default-btn"
        type="file"
        className="d-none"
        onChange={handleImage}
      />
      {load ? (
        <Button
          isLoading
          colorScheme="teal"
          variant="solid"
        ></Button>
      ) : (
        <Button
          id="custom-btn"
          colorScheme="teal"
          variant="solid"
          onClick={() => {
            if (!img) {
              document.getElementById("default-btn").click();
            } else {
              toast({
                title: "Diqqat! Surat avval yuklangan",
                description:
                  "Suratni qayta yulash uchun suratni ustiga bir marotaba bosib uni o'chiring!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
            }
          }}
        >
          Suratni yuklash
        </Button>
      )}
    </div>
  );
};
