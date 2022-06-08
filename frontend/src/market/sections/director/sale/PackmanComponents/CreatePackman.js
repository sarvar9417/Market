import { t } from 'i18next';
import React from 'react';
import {
  ClearBtn,
  ClearBtnLoad,
  SaveBtn,
  SaveBtnLoad,
} from '../../components/TableButtons';
import { Input } from '../../components/Input';

export const CreatePackman = ({
  packman,
  changeHandler,
  keyPressed,
  saveHandler,
  clearInputs,
  loading,
}) => {
  return (
    <>
      <ul className='thead'>
        <li className='th col-span-6 border-r'>{t('Yetkazuvchi')}</li>
        <li className='th col-span-3 border-r'>{t('Saqlash')}</li>
        <li className='th col-span-3'>{t('Tozalash')}</li>
      </ul>
      <ul className='tbody mb-4'>
        <li className='td text-center font-bold border-r col-span-6'>
          <Input
            name={'name'}
            data={packman && packman.name}
            placeholder={t('Yetkazuvchini kiriting')}
            type={'text'}
            keyPressed={keyPressed}
            changeHandler={changeHandler}
          />
        </li>
        <li className='border-r col-span-3  td-btn'>
          {loading ? <SaveBtnLoad /> : <SaveBtn saveHandler={saveHandler} />}
        </li>
        <li className=' col-span-3  td-btn'>
          {loading ? <ClearBtnLoad /> : <ClearBtn clearDatas={clearInputs} />}
        </li>
      </ul>
    </>
  );
};
