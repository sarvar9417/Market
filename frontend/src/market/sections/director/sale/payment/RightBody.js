import React from "react";

export const RightBody = ({
  showInput,
  payment,
  discount,
  debt,
  valueName,
  valueProperty,
}) => {
  return (
    <div className="bg-cyan-100 text-[#333] mt-2 font-semibold text-lg rounded w-2/4 px-6 grid grid-cols-2 gap-y-6 justify-items-center">
      <button
        className="bg-white rounded col-span-2 w-full h-[150px] shadow-lg shadow-indigo-500/50 border-2 border-teal-600"
        name="payment"
        data-property="cash"
        onClick={showInput}
      >
        <div style={{ pointerEvents: "none" }}>
          <p className="text-4xl">{parseInt(payment.cash) || 0}</p>
          <h1 className="mt-5">Оплата наличными</h1>
        </div>
      </button>
      <button
        className="bg-white rounded col-span-1 w-[250px] h-[150px] justify-self-start"
        name="payment"
        data-property="card"
        onClick={showInput}
      >
        <div className="" style={{ pointerEvents: "none" }}>
          <p className="text-4xl">{parseInt(payment.card) || 0}</p>
          <h1>Банковская карта</h1>
        </div>
      </button>
      <button
        className="bg-white rounded col-span-1 w-[250px] h-[150px] justify-self-end"
        name="payment"
        data-property="transfer"
        onClick={showInput}
      >
        <div style={{ pointerEvents: "none" }}>
          <p className="text-4xl">{parseInt(payment.transfer) || 0}</p>
          <h1 className="mt-5">O'tkazma</h1>
        </div>
      </button>
      <button
        className="bg-white rounded col-span-1 w-[200px] h-[150px]"
        name="discount"
        data-property="price"
        onClick={showInput}
      >
        <div style={{ pointerEvents: "none" }}>
          <p className="text-4xl">{parseInt(discount.price)}</p>
          <h1 className="mt-5">Скидка</h1>
        </div>
      </button>
      <button
        className="bg-white rounded col-span-1 w-[200px] h-[150px]"
        name="debt"
        data-property="debt"
        onClick={showInput}
      >
        <div style={{ pointerEvents: "none" }}>
          <p className="text-4xl">{parseInt(debt.debt) || 0}</p>
          <h1 className="mt-5">Долг</h1>
        </div>
      </button>
      <button
        className="bg-white rounded col-span-1 w-[250px] h-[150px] justify-self-start"
        name="payment"
        data-property="mixed"
        onClick={showInput}
      >
        <div className="" style={{ pointerEvents: "none" }}>
          <p className="text-4xl">{parseInt(payment.card) || 0}</p>
          <h1>Aralash</h1>
        </div>
      </button>
    </div>
  );
};
