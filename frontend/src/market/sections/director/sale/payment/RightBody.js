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
    <div className="bg-cyan-50 text-[#333] font-semibold text-lg rounded p-2 h-min mt-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <div className="grid grid-rows-3 gap-2">
            <button
              className="bg-teal-400 hover:bg-teal-500 text-white w-full rounded font-bold py-3"
              name="payment"
              data-property="cash"
              onClick={showInput}
            >
              <p className="text-4xl font-bold pointer-events-none">
                {parseFloat(payment.cash) || 0} $
              </p>
              <span className="pointer-events-none">Naqt</span>
            </button>
            <button
              className="bg-teal-400 hover:bg-teal-500 text-white w-full rounded font-bold py-3"
              name="payment"
              data-property="card"
              onClick={showInput}
            >
              <p className="text-4xl font-bold pointer-events-none">
                {parseFloat(payment.card) || 0} $
              </p>
              <span className="pointer-events-none">Plastik</span>
            </button>
            <button
              className="bg-teal-400 hover:bg-teal-500 text-white w-full rounded font-bold py-3"
              name="payment"
              data-property="transfer"
              onClick={showInput}
            >
              <div style={{ pointerEvents: "none" }}>
                <p className="text-4xl font-bold pointer-events-none">
                  {parseFloat(payment.transfer) || 0} $
                </p>
                <span className="pointer-events-none">O'tkazma</span>
              </div>
            </button>
          </div>
        </div>
        <div className="grid grid-rows-3">
          <div className=" row-span-3">
            <button
              className="bg-teal-400 hover:bg-teal-500 text-white w-full rounded font-bold py-3 h-full"
              name="mixed"
              data-property="mixed"
              onClick={showInput}
            >
              <p className="text-4xl font-bold pointer-events-none">
                {(valueProperty === "mixed" && parseFloat(payment.payment)) ||
                  0}{" "}
                $
              </p>
              <h1 className="pointer-events-none">Aralash</h1>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          className="bg-teal-400 hover:bg-teal-500 text-white w-full rounded font-bold py-3"
          name="discount"
          data-property="price"
          onClick={showInput}
        >
          <p className="text-4xl font-bold pointer-events-none">
            {parseFloat(discount.price)}
          </p>
          <h1 className=" pointer-events-none">Chegirma</h1>
        </button>
        <button
          className="bg-teal-400 hover:bg-teal-500 text-white w-full rounded font-bold py-3"
          name="debt"
          data-property="debt"
          onClick={showInput}
        >
          <div style={{ pointerEvents: "none" }}>
            <p className="text-4xl font-bold pointer-events-none">
              {parseFloat(debt.debt.toFixed(1)) || 0} $
            </p>
            <h1 className=" pointer-events-none">Qarz</h1>
          </div>
        </button>
      </div>
    </div>
  );
};
