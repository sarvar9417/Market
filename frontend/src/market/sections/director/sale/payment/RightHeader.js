import React from 'react'

export const RightHeader = () => {
    return (
        <div className="flex justify-evenly items-center text-white m-auto sm:m-0 ">
            <div className="flex">
                <button className="bg-[#FD9584] font-semibold tracking-wide text-3xl px-7 py-7 rounded-full mr-7">
                    KP
                </button>
                <div>
                    <h1 className="font-semibold text-2xl ">Заказ: PJ004</h1>
                    <p className="font-light">Константин Рублёв</p>
                    <p className="font-light"> Сумма 2 970 р.</p>
                </div>
            </div>
        </div>
    )
}
