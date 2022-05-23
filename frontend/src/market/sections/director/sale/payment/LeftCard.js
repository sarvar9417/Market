import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const LeftCard = ({
  totalprice,
  payment,
  valueName,
  valueProperty,
  discount,
  debt,
  changePay,
  discountedPrice,
  setValueProperty,
}) => {
  const number = [
    7,
    8,
    9,
    4,
    5,
    6,
    1,
    2,
    3,
    ',',
    0,
    <FontAwesomeIcon icon={faArrowLeft} />,
  ]
  return (
    <div className="w-full text-white max-w-[400px] m-auto">
      {valueName === 'payment' ? (
        <>
          <div className="flex text-3xl items-center font-bold border-white border-b-2">
            <span className="text-xl opacity-60">
              {(valueProperty === 'cash' && 'Naqt') ||
                (valueProperty === 'card' && 'Plastik') ||
                (valueProperty === 'transfer' && 'O`tkazma') ||
                0}
            </span>
            <input
              className="bg-[#3695D7]  text-right font-bold  mb-1  w-full outline-none"
              value={
                (valueProperty === 'cash' && payment.cash) ||
                (valueProperty === 'card' && payment.card) ||
                (valueProperty === 'transfer' && payment.transfer) ||
                0
              }
              onChange={changePay}
              type="number"
            />
            <span className="pb-1">$</span>
          </div>
          <p className="text-base">
            {(valueProperty === 'cash' &&
              `Naqt to'lov: ${discountedPrice}$ dan ${
                parseInt(payment.payment) || 0
              } $`) ||
              (valueProperty === 'card' &&
                `Plastik: ${discountedPrice}$ dan ${
                  parseInt(payment.payment) || 0
                } $`) ||
              (valueProperty === 'transfer' &&
                `O'tkazma: ${discountedPrice}$ dan ${
                  parseInt(payment.payment) || 0
                } $`)}
          </p>
        </>
      ) : valueName === 'discount' ? (
        <>
          <div className="flex gap-x-2">
            <div class="form-check">
              <input
                class="form-check-input outline-none"
                type="radio"
                name="discount"
                data-property="price"
                id="flexRadioDefault1"
                onChange={(e) => setValueProperty(e.target.dataset.property)}
              />
              <label class="form-check-label" htmlFor="flexRadioDefault1">
                Price
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input outline-none"
                type="radio"
                name="discount"
                data-property="procient"
                id="flexRadioDefault2"
                onChange={(e) => setValueProperty(e.target.dataset.property)}
              />
              <label class="form-check-label" htmlFor="flexRadioDefault2">
                Procient
              </label>
            </div>
          </div>
          <div className="flex text-3xl items-center font-bold border-white border-b-2">
            {(valueProperty === 'price' && (
              <input
                className="bg-[#3695D7]  text-right font-bold  mb-1  w-full outline-none"
                value={discount.price || 0}
                onChange={changePay}
                type="number"
              />
            )) ||
              (valueProperty === 'procient' && (
                <input
                  className="bg-[#3695D7]  text-right font-bold  mb-1  w-full outline-none"
                  value={discount.procient || 0}
                  onChange={changePay}
                  type="number"
                />
              ))}
            <span className="pb-1">$</span>
          </div>
          <p className="text-base">
            Chegirma:{' '}
            {valueProperty === 'price'
              ? `${discount.price}$`
              : `${discount.procient}%`}
          </p>
        </>
      ) : valueName === 'debt' ? (
        <>
          <div className="flex text-3xl items-center font-bold border-white border-b-2">
            <input
              className="bg-[#3695D7]  text-right font-bold  mb-1  w-ful outline-none"
              value={debt.debt || 0}
              disabled
              onChange={changePay}
              type="number"
            />
            <span className="pb-1">$</span>
          </div>
          <p className="text-base">Qarz: {debt.debt}</p>
        </>
      ) : valueProperty === 'mixed' ? (
        <>
          <div>
            <div className="flex text-3xl items-center font-bold border-white border-b-2">
              <span className="text-xl opacity-60">Naqt</span>
              <input
                className="bg-[#3695D7]  text-right font-bold  mb-1  w-full outline-none"
                value={payment.cash || 0}
                onChange={changePay}
                type="number"
                name="cash"
              />
              <span className="pb-1">$</span>
            </div>
            {/* <p className="text-base">Naqt: {payment.cash || 0}</p> */}
          </div>
          <div>
            <div className="flex text-3xl items-center font-bold border-white border-b-2">
              <span className="text-xl opacity-60">Plastik</span>
              <input
                className="bg-[#3695D7]  text-right font-bold  mb-1  w-full outline-none"
                value={payment.card || 0}
                onChange={changePay}
                type="number"
                name="card"
              />
              <span className="pb-1">$</span>
            </div>
            {/* <p className="text-base">Plastik: {payment.card || 0}</p> */}
          </div>
          <div>
            <div className="flex text-3xl items-center font-bold border-white border-b-2">
              <span className="text-xl opacity-60">O'tkazma</span>
              <input
                className="bg-[#3695D7]  text-right font-bold  mb-1  w-full outline-none"
                value={payment.transfer || 0}
                onChange={changePay}
                type="number"
                name="transfer"
              />
              <span className="pb-1">$</span>
            </div>
            {/* <p className="text-base">O'tkazma: {payment.transfer || 0}</p> */}
          </div>
        </>
      ) : (
        ''
      )}
      <div className="grid grid-cols-3 gap-2 p-4">
        {number.map((num, index) => {
          return (
            <button
              key={index}
              className="bg-[#54B1EC] text-3xl rounded-full w-[80px] h-[80px] hover:bg-blue-400 m-auto"
            >
              {num}
            </button>
          )
        })}
      </div>
      <button className="w-full py-2 bg-[#54B1EC] font-bold text-lg hover:bg-blue-400">
        To'lash
      </button>
    </div>
  )
}
