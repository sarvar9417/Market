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
  exchangerate,
  keyPressed,
  inputHandler,
  saveHandler,
  clearInputs,
  loading,
}) => {
  return (
    <div className='mb-3'>
      <ul className='thead'>
        <li className='th col-span-8 border-r'>{t('Kursni kiriting')}</li>
        <li className='th col-span-2 border-r'>{t('Saqlash')}</li>
        <li className='th col-span-2'>{t('Tozalash')}</li>
      </ul>
      <ul className='tbody'>
        <li className='border-r col-span-8 td'>
          <Input
            name={'name'}
            data={exchangerate.exchangerate}
            placeholder={t('Valyuta kursini kiriting')}
            type={'number'}
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
    </div>
  );
};
