import { faClose, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Payment = () => {
    return (
        <div className='w-full h-screen bg-blue-400 p-10 absolute top-0'>
            <div className='flex justify-between md:justify-end'>
                <div>
                    <h1 className='font-bold text-blue-100 text-xl'>Buyurtma: PH012212</h1>
                    <p className='font-bold text-blue-100'>Mijoz:Sarvar Murodullayev</p>
                    <p className='font-bold text-blue-100'>Postavshik: Sarvar murodullayev</p>
                </div>
                <button className='border border-1 border-blue-50 w-[70px] h-[70px] rounded-full flex items-center justify-center text-3xl mx-10 text-white'>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
                <button className='border border-1 border-blue-50 w-[70px] h-[70px] rounded-full flex items-center justify-center text-3xl text-white'>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-5'>
                <div className='md:col-span-2'>
                    <div className='border-b-2 border-blue-300 flex text-6xl text-white text-right items-center font-bold'>
                        <input type="number" className='bg-blue-400 outline-none w-full text-right font-bold' />$
                    </div>
                </div>
                <div className='md:col-span-3'>

                </div>
            </div>
        </div>
    )
}
