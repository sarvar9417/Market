import React from 'react'

export const Selling = () => {
  return (
    <div className=' bg-white'>
      <p className='bg-[#31C2A0] text-center text-5xl text-white py-2'>CHEK: № 00134</p>
      <div className='px-3 py-2'>
        <div className='flex justify-end py-2 px-2 '>
          <button className='btn bg-[#31C2A0] py-1 px-3 text-white text-base'>Xaridor</button>
        </div>
        <div className=''>
          <select
            className="form-control form-control-sm selectpicker rounded py-1 px-3"
            id=""
          >
            <option value="delete">Yetkazuvchi</option>
          </select>
          <select
            className="form-control form-control-sm selectpicker rounded py-1 px-3"
            id=""
          >
            <option value="delete">Xaridor</option>
          </select>
          <input
            name="name"
            type="text"
            className="form-control rounded px-3"
            id=""
            placeholder="Xaridor"
          />
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
            <tbody className='border text-center text-black'>
              <tr>
                <td className='border'>1</td>
                <td className='border'>158754</td>
                <td className='border'>kjlkdsvlksDv</td>
                <td className='border'>15</td>
                <td className='border'>15$</td>
              </tr>
            </tbody>
          </table>
          <div className=''>
            <div className='flex justify-between'>
              <span className='text-base text-black font-bold'>Umumiy summa</span>
              <span className='text-base text-black font-bold'>470.000</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-base text-black font-bold'>Chegirma</span>
              <span className='text-base text-black font-bold'>30.000</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-base text-black font-bold'>To'lanayotgan</span>
              <span className='text-base text-black font-bold'>340.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
