import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LeftCard } from "./LeftCard";
import { RightBody } from "./RightBody";

export const Card = ({
  totalprice,
  visible,
  setVisible,
  payment,
  discount,
  valueName,
  valueProperty,
  showInput,
  debt,
  changePay,
  setValueProperty,
  discountedPrice,
}) => {
  return (
    <div
      className={`w-screen h-full bg-[#3695D7] absolute top-0 overflow-y-scroll z-20 p-3 ${
        visible ? "visible" : "invisible"
      }`}
    >
      <div className="flex md:justify-end justify-center py-3">
        <div className="sm:min-w-[650px]">
          <div className="sm:flex justify-evenly items-center text-white m-auto sm:m-0 ">
            <div className="flex">
              <button className="bg-[#FD9584] font-semibold  text-3xl w-[80px]  h-[80px] rounded-full mr-7">
                KP
              </button>
              <div>
                <h1 className="font-semibold text-2xl ">Заказ: PJ004</h1>
                <p className="font-light">Константин Рублёв</p>
                <p className="font-light"> Сумма {totalprice} $.</p>
              </div>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="w-[80px]  h-[80px] border rounded-full text-4xl"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <LeftCard
          totalprice={totalprice}
          discountedPrice={discountedPrice}
          discount={discount}
          payment={payment}
          debt={debt}
          valueName={valueName}
          valueProperty={valueProperty}
          changePay={changePay}
          setValueProperty={setValueProperty}
        />
        <RightBody
          showInput={showInput}
          payment={payment}
          discount={discount}
          debt={debt}
          valueName={valueName}
          valueProperty={valueProperty}
        />
      </div>
    </div>
  );
};

// const changePayment = (e) => {
//   let discounted = discount.price;

//   if (valueName === "discount") {
//     if (valueProperty === "price") {
//       discounted = totalprice - e.target.value;
//       setDiscount({
//         ...discount,
//         price: e.target.value,
//       });
//     }
//     if (valueProperty === "procient") {
//       discounted = e.target.value * parseFloat(totalprice / 100);
//       setDiscount({
//         ...discount,
//         procient: e.target.value,
//       });
//     }
//   }
//   if (valueName === 'payment') {

//   }
// };
