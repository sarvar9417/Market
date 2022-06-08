import { t } from 'i18next';
import React from 'react';
import { Input } from '../../components/Input';
import {
  ClearBtn,
  ClearBtnLoad,
  SaveBtn,
  SaveBtnLoad,
} from '../../components/TableButtons';

export const CreateClient = ({
  client,
  keyPressed,
  changeHandler,
  saveHandler,
  clearInputs,
  loading,
  packmans,
  selectHandler,
}) => {
  return (
    <>
      <ul className='thead'>
        <li className='th col-span-4 border-r'>{t('Yetkazuvchilar')}</li>
        <li className='th col-span-4 border-r'>{t('Mijoz')}</li>
        <li className='th col-span-2 border-r'>{t('Saqlash')}</li>
        <li className='th col-span-2'>{t('Tozalash')}</li>
      </ul>
      <ul className='tbody mb-4'>
        <li className='td text-center font-bold border-r col-span-4'>
          <select
            style={{ minWidth: '70px', maxWidth: '200px' }}
            className='text-center text-black py-1 px-3 border focus:ring focus:outline-green-800 rounded'
            placeholder={t('Kategoriyani tanlang')}
            onChange={selectHandler}
          >
            <option value='delete'>Kategoriya tanlang</option>
            {packmans &&
              packmans.map((packman, index) => {
                return (
                  <option value={packman._id} key={index}>
                    {packman.name}
                  </option>
                );
              })}
          </select>
        </li>
        <li className='td text-center font-bold border-r col-span-4'>
          <Input
            name={'name'}
            data={client && client.name}
            placeholder={t('Yetkazuvchini kiriting')}
            type={'text'}
            keyPressed={keyPressed}
            changeHandler={changeHandler}
          />
        </li>
        <li className='border-r col-span-2  td-btn'>
          {loading ? <SaveBtnLoad /> : <SaveBtn saveHandler={saveHandler} />}
        </li>
        <li className=' col-span-2  td-btn'>
          {loading ? <ClearBtnLoad /> : <ClearBtn clearDatas={clearInputs} />}
        </li>
      </ul>
    </>
  );
};
