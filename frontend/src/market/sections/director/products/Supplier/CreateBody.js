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
  supplier,
  inputHandler,
  saveHandler,
  loading,
  keyPressed,
  clearInputs,
}) => {
  return (
    <ul className='tbody'>
      <li className='border-r col-span-8 td'>
        <Input
          name={'name'}
          data={supplier.name}
          placeholder={t('Yetkazib beruvchi nomini kiriting')}
          loading={loading}
          type={'text'}
          keyPressed={keyPressed}
          changeHandler={inputHandler}
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
