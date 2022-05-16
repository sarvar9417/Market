import React from 'react'

export const Products = () => {
  return (
    <div className=' py-1 bg-white'>
        <p className='bg-[#31C2A0] text-center text-5xl text-white py-2'>Maxsulotlar</p>
        <div className='px-3'>
            <div className='grid grid-cols-3 gap-4 py-2'>
                <div className=''>
                    <select
                    className="form-control form-control-sm selectpicker rounded py-1 px-3"
                    id=""
                    >
                    <option value="delete">Kategoriyasi</option>
                    </select>
                </div>
                <div className='col-span-2'>
                    <select
                    className="form-control form-control-sm selectpicker rounded py-1 px-3"
                    id=""
                    >
                    <option value="delete">Maxsulotlar</option>
                    </select>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-4 py-2'>
                <div className=''>
                    <select
                    className="form-control form-control-sm selectpicker rounded py-1 px-3"
                    id=""
                    >
                    <option value="delete">Brend</option>
                    </select>
                </div>
                <div className='col-span-2'>
                    <select
                    className="form-control form-control-sm selectpicker rounded py-1 px-3"
                    id=""
                    >
                    <option value="delete">Maxsulot turi</option>
                    </select>
                </div>
            </div>
        </div>
        
    </div>
  )
}
