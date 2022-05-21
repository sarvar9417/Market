import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const RightHeader = () => {
    return (
        <div className="sm:flex justify-evenly items-center text-white m-auto sm:m-0 ">
            <div className="flex">
                <button className="bg-[#FD9584] font-semibold  text-3xl w-[80px]  h-[80px] rounded-full mr-7">
                    KP
                </button>
                <div>
                    <h1 className="font-semibold text-2xl ">Заказ: PJ004</h1>
                    <p className="font-light">Константин Рублёв</p>
                    <p className="font-light"> Сумма 2 970 р.</p>
                </div>
            </div>
            <button className='w-[80px]  h-[80px] border rounded-full text-4xl'>
                <FontAwesomeIcon icon={faClose} />
            </button>
        </div>
    )
}
