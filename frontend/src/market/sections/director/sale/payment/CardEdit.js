import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { t } from "i18next";
import { RightBodyEdit } from "./RightBodyEdit";
import { LeftCardEdit } from "./LeftCardEdit";

export const CardEdit = ({
  totalpriceuzs,
  client,
  exchangerate,
  checkNumber,
  checkHandler,
  discount,
  changeProcient,
  changeHandler,
  paymentType,
  typeHandler,
  totalprice,
  setVisible,
  payment,
  debt,
}) => {
  return (
    <div className='w-screen h-full bg-[#3695D7] absolute top-0 overflow-y-scroll z-20 p-3'>
      <div className='flex md:justify-end justify-center py-3'>
        <div className='sm:min-w-[650px]'>
          <div className='sm:flex justify-evenly items-center text-white m-auto sm:m-0 '>
            <div className='flex'>
              <button className='bg-[#FD9584] font-semibold  text-3xl w-[80px]  h-[80px] rounded-full mr-7'>
                KP
              </button>
              <div>
                <h1 className='font-semibold text-xl  '>
                  {t("Buyurtma")}: A{1000000 + checkNumber.count}
                </h1>
                <p className='text-lg font-semibold flex flex-col  justify-between'>
                  <span className='flex justify-between'>
                    {t("Jami")}:{" "}
                    <span>{totalprice.toLocaleString("de-DE")} USD</span>{" "}
                  </span>
                  <span className='flex justify-between text-sm'>
                    <span></span>
                    <span>
                      {totalpriceuzs.toLocaleString("de-DE")}
                      &#177;
                      {(exchangerate.exchangerate / 100).toLocaleString(
                        "de-DE"
                      )}{" "}
                      UZS
                    </span>{" "}
                  </span>
                </p>
                <p className='font-light'>
                  {t("Mijoz")}: {client.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => setVisible(false)}
              className='w-[80px]  h-[80px] border rounded-full text-4xl'>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <LeftCardEdit
          exchangerate={exchangerate}
          checkHandler={checkHandler}
          discount={{ isProcient: true }}
          changeProcient={changeProcient}
          changeHandler={changeHandler}
          paymentType={paymentType}
          totalprice={totalprice}
          payment={payment}
        />
        <RightBodyEdit
          exchangerate={exchangerate}
          typeHandler={typeHandler}
          payment={payment}
          discount={discount}
          debt={debt}
        />
      </div>
    </div>
  );
};
