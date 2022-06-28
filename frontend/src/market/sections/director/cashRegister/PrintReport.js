import { faClose, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const PrintReport = ({
  componentRef,
  startDate,
  endDate,
  salesReport,
  productsReport,
  incomingsReport,
  auth,
  baseUrl,
  print,
  setIsPrint,
}) => {
  return (
    <>
      <div className='a4 m-auto w-[27cm] p-4' ref={componentRef}>
        <div className='w-full flex justify-between items-center px-6'>
          <div className=''>
            <p className='font-bold text-2xl'>Молиявий хисобот</p>
          </div>
          <div className='flex justify-center items-center gap-4 mb-4'>
            <img
              src={
                baseUrl &&
                `${baseUrl}/api/upload/file/${
                  auth && auth.market && auth.market.image
                }`
              }
              alt='market'
            />
          </div>
          <div className='text-blue-700 text-center'>
            <div className='font-serif text-4xl font-bold'>ОТЧЕТ</div>
            <div className='font-medium text-2xl'>
              {new Date(startDate).toLocaleDateString()} -{' '}
              {new Date(endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-8'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-2xl font-bold text-black'>
              {salesReport.salecount &&
                salesReport.salecount.toLocaleString('ru-RU')}
            </span>
            <p className='text-xl font-medium'>Количество продаж</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-2xl font-bold text-black'>
              {salesReport.totalsale &&
                salesReport.totalsale.toLocaleString('ru-RU')}{' '}
              $
            </span>
            <p className='text-xl font-medium'>Общая сумма продаж</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-2xl font-bold text-red-400 '>{123456} $</span>
            <p className='text-xl font-medium'>Общая сумма расходов</p>
          </div>
        </div>
        <div className='grid grid-cols-12 mb-12'>
          <div className='col-span-7'>
            <table className='table-auto border-2 border-blue-700 w-full'>
              <thead>
                <tr>
                  <th className='border-2 border-blue-700 py-2 px-4'>
                    Количество продаж
                  </th>
                  <th className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {salesReport.salecount &&
                      salesReport.salecount.toLocaleString('ru-RU')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border-2 border-blue-700 py-2 px-4 text-lg font-bold'>
                    Наличнами
                  </td>
                  <td className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {salesReport.totalcash &&
                      salesReport.totalcash.toLocaleString('ru-RU')}{' '}
                    $
                  </td>
                </tr>
                <tr>
                  <td className='border-2 border-blue-700 py-2 px-4 text-lg font-bold'>
                    По карте
                  </td>
                  <td className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {salesReport.totalcard &&
                      salesReport.totalcard.toLocaleString('ru-RU')}{' '}
                    $
                  </td>
                </tr>
                <tr>
                  <td className='border-2 border-blue-700 py-2 px-4 text-lg font-bold'>
                    Перевод
                  </td>
                  <td className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {salesReport.totaltransfer &&
                      salesReport.totaltransfer.toLocaleString('ru-RU')}{' '}
                    $
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-span-5 flex flex-col items-center justify-center'>
            <span className='text-4xl font-bold text-green-500'>44 000 $</span>
            <p className='text-2xl font-medium text-blue-700'>Чистая прибыль</p>
          </div>
        </div>
        <div className='font-bold text-2xl pl-4 mb-2'>
          Сотилган махсулотлар хисоботи
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-8'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {salesReport.salecount &&
                salesReport.salecount.toLocaleString('ru-RU')}
            </span>
            <p className='text-lg font-medium'>Количество продаж</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.salesproducts &&
                productsReport.salesproducts.toLocaleString('ru-RU')}{' '}
            </span>
            <p className='text-lg font-medium'>
              Общее количество видов товаров
            </p>
          </div>
          <div className='col-span-4 flex flex-col items-center text-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.salesprodcutspieces &&
                productsReport.salesprodcutspieces.toLocaleString('ru-RU')}
            </span>
            <p className='text-lg font-medium'>Общее количество товаров</p>
          </div>
        </div>
        <div className='px-4 mb-2 flex justify-between items-center'>
          <span className='font-bold text-2xl mr-6'>
            Келтирилган махсулотлар хисоботи
          </span>
          <div className='flex items-center'>
            <p className='text-2xl font-medium mr-4'>Количество приходов:</p>
            <span className='text-2xl font-bold text-black'>
              {incomingsReport.incomingsCount &&
                incomingsReport.incomingsCount.toLocaleString('ru-RU')}
            </span>
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-8'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {incomingsReport.totalIncomingsPrice &&
                incomingsReport.totalIncomingsPrice.toLocaleString(
                  'ru-RU'
                )}{' '}
              $
            </span>
            <p className='text-lg font-medium'>Общая сумма Приходов</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.incomeproducts &&
                productsReport.incomeproducts.toLocaleString('ru-RU')}{' '}
            </span>
            <p className='text-lg font-medium'>
              Общее количество видов товаров
            </p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.incomeproductspieces}
            </span>
            <p className='text-lg font-medium'>Общее количество товаров</p>
          </div>
        </div>
        <div className='font-bold text-2xl pl-4 mb-2'>Омборхона хисоботи</div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-6 px-2'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.products &&
                productsReport.products.toLocaleString('ru-RU')}{' '}
            </span>
            <p className='text-lg font-medium'>
              Общее количество видов товаров
            </p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.productspieces &&
                productsReport.productspieces.toLocaleString('ru-RU')}{' '}
            </span>
            <p className='text-lg font-medium'>Общее количество товаров</p>
          </div>
          <div className='col-start-9 col-span-4 flex flex-col items-center text-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.productstotalprice &&
                productsReport.productstotalprice.toLocaleString('ru-RU')}{' '}
              $
            </span>
            <p className='text-lg font-medium'>Общая сумма товаров на складе</p>
          </div>
        </div>
      </div>
      <div className='m-3 flex justify-around'>
        <button
          onClick={() => setIsPrint(false)}
          className='bg-red-500 hover:bg-red-600 text-white m-auto px-10 py-1 text-lg  rounded ml-4'
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <button
          className='bg-blue-700 hover:bg-blue-800 text-white m-auto px-10 py-1 text-lg rounded mr-4'
          onClick={print}
        >
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </div>
    </>
  );
};
