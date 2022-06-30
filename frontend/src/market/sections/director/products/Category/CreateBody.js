import { t } from 'i18next';
import React from 'react';
import { Input } from '../../components/Input';
import {
  ClearBtn,
  ClearBtnLoad,
  SaveBtn,
  SaveBtnLoad,
} from '../../components/TableButtons';

export const CreateBody = ({
  category,
  changeHandler,
  saveHandler,
  loading,
  keyPressed,
  clearInputs,
}) => {
  return (
    <ul className='tbody'>
      <li className='td text-center font-bold border-r col-span-4'>
        <Input
          name={'code'}
          data={category.code}
          placeholder={t('Kategoriya kodini kiriting')}
          type={'number'}
          keyPressed={keyPressed}
          changeHandler={changeHandler}
        />
      </li>
      <li className='border-r col-span-4 td'>
        <Input
          name={'name'}
          data={category.name}
          placeholder={t('Kategotiya nomini kiriting')}
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
  );
};
