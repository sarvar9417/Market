import React from 'react'
import Select from 'react-select';

export const Selling = ({packmans, clients, changePackman, changeClient}) => {
  return (
    <div className=' bg-white'>
      <p className='bg-[#31C2A0] text-center text-5xl text-white py-2'>CHEK: № 00134</p>
      <div className='px-3 py-2'>
        <div className='flex justify-end py-2 px-2 '>
          <button className='btn bg-[#31C2A0] py-1 px-3 text-white text-base'>Xaridor</button>
        </div>
        <div className='grid grid-cols-1 py-2 sm:grid-cols-2  gap-4'>
        <div>
           <Select
            // isDisabled={loading}
            onChange={changePackman}
            placeholder="Yetkazuvchi"
            isClearable={true}
            // isLoading={loading}
            // components={}
            options={packmans}
          />
          </div> 
          <div>
          <Select
            // isDisabled={loading}
            onChange={changeClient}
            placeholder="Xaridor"
            isClearable={true}
            // isLoading={loading}
            // components={}
            options={clients}
          />            
          </div>
          <div className='sm:col-span-2'>
          <input
            name="name"
            type="text"
            className="form-control rounded px-3"
            id=""
            placeholder="Xaridor"
          />
          </div>
        </div>
        <div className=''>
          <table className='bg-white w-full'>
            <thead className='border text-center text-base bg-[#31C2A0] text-white py-4'>
              <tr>
                <th className='border-2'>№</th>
                <th className='border-2'>Kategoriyasi</th>
                <th className='border-2'>Maxsulot nomi</th>
                <th className='border-2'>Soni</th>
                <th className='border-2'>Narxi</th>
              </tr>
            </thead>
            <tbody className='border text-black'>
              <tr>
                <td className='border font-bold text-black text-center'>1</td>
                <td className='border font-bold text-black text-center'>158754</td>
                <td className='border font-bold text-black text-center'>kjlkdsvlksDv</td>
                <td className='border font-bold text-black text-right'>15</td>
                <td className='border font-bold text-black text-right'>15 $</td>
              </tr>
            </tbody>
          </table>
          <div className='py-1'>
            <div className='flex justify-between'>
              <span className='text-base text-black font-bold'>Umumiy summa:</span>
              <span className='text-base text-black font-bold'>470.000</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-base text-black font-bold'>Chegirma:</span>
              <span className='text-base text-yellow-500 font-bold'>30.000</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-base text-black font-bold'>To'lanayotgan:</span>
              <span className='text-base text-green-700 font-bold'>340.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
