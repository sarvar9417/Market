import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { LeftCard } from './LeftCard'
import { RightBody } from './RightBody'

export const Card = ({
  totalprice,
  visible,
  setVisible,
  payment,
  setPayment,
  discount,
  setDiscount,
}) => {
  return (
    <div
      className={`w-screen h-full bg-[#3695D7] absolute top-0 overflow-y-scroll z-20 ${
        visible ? 'visible' : 'invisible'
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
      <div className="md:flex md:justify-between">
        <LeftCard totalprice={totalprice} discount={discount}/>
        <RightBody />
      </div>
    </div>
  )
}
