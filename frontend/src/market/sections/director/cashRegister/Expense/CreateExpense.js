import React from 'react';
import { Input } from '../../components/Input';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { CreateBtn } from '../../products/Product/createProduct/CreateBtn';
const animatedComponents = makeAnimated();

export const CreateExpense = ({
  expense,
  keyPressed,
  inputHandler,
  loading,
  changeType,
  selectRef,
  clearInputs,
  createExpense,
}) => {
  return (
    <>
      <div className='grid grid-cols-12 px-4 items-center mb-4'>
        <div className='col-span-4 flex justify-between px-4 font-bold'>
          <p className='font-bold'>Xarajat narxi:</p>
          <Input
            data={expense.sum}
            keyPressed={keyPressed}
            changeHandler={inputHandler}
            placeholder={'Xarajat summasini kiriting'}
            loading={loading}
            name={'sum'}
            type={'number'}
            classes={'text-right'}
          />
        </div>
        <div className='col-span-4 flex justify-between px-4 font-bold'>
          <p className='font-bold'>Izoh:</p>
          <Input
            data={expense.comment}
            keyPressed={keyPressed}
            changeHandler={inputHandler}
            placeholder={'Izoh kiriting'}
            loading={loading}
            name={'comment'}
            type={'text'}
            classes={'text-right'}
          />
        </div>
        <div className='col-span-4 flex justify-between px-4 items-center font-bold'>
          <p className='font-bold w-50'>Xarajat turi:</p>
          <Select
            className='w-full z-50'
            id='select'
            isClearable={true}
            ref={selectRef}
            isLoading={loading}
            onChange={(e) => changeType(e)}
            components={animatedComponents}
            placeholder={'Xarajat turi'}
            options={[
              {
                label: 'Xarajat turi',
                value: 'delete',
              },
              {
                label: 'Naqt',
                value: 'cash',
              },
              {
                label: 'Plastik',
                value: 'card',
              },
              {
                label: "O'tkazma",
                value: 'transfer',
              },
            ]}
            theme={(theme) => ({
              ...theme,
              color: 'black',
              borderRadius: 0,
              padding: 0,
              height: 0,
            })}
          />
        </div>
      </div>
      <div className=''>
        <CreateBtn
          clearInputs={clearInputs}
          saveHandler={createExpense}
          loading={loading}
        />
      </div>
    </>
  );
};
