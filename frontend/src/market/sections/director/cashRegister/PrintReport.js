import { faClose, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { t } from 'i18next'

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
          <div className='text-blue-700 text-center'>
            <div className='font-serif text-4xl font-bold'>{t("HISOBOT")}</div>
            <div className='font-medium text-2xl'>
              {new Date(startDate).toLocaleDateString()} -{' '}
              {new Date(endDate).toLocaleDateString()}
            </div>
          </div>
          <div className='flex justify-center items-center gap-4 mb-4'>
            <img
              src={
                baseUrl &&
                `${baseUrl}/api/upload/file/${auth && auth.market.image}`
              }
              alt='market'
            />
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-8'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-2xl font-bold text-black'>
              {salesReport.salecount &&
                salesReport.salecount.toLocaleString('ru-RU')}
            </span>
            <p className='text-xl font-medium'>{t("Sotilganlar soni")}</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-2xl font-bold text-black'>
              {salesReport.totalsale &&
                salesReport.totalsale.toLocaleString('ru-RU')}{' '}
              $
            </span>
            <p className='text-xl font-medium'>{t("Umumiy savdo")}</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-2xl font-bold text-red-400 '>{123456} $</span>
            <p className='text-xl font-medium'>{t("Umumiy xarajatlar")}</p>
          </div>
        </div>
        <div className='grid grid-cols-12 mb-12'>
          <div className='col-span-7'>
            <table className='table-auto border-2 border-blue-700 w-full'>
              <thead>
                <tr>
                  <th className='border-2 border-blue-700 py-2 px-4'>
                  {t("Sotish soni")}
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
                    {t("Naqd")}
                  </td>
                  <td className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {salesReport.totalcash &&
                      salesReport.totalcash.toLocaleString('ru-RU')}{' '}
                    $
                  </td>
                </tr>
                <tr>
                  <td className='border-2 border-blue-700 py-2 px-4 text-lg font-bold'>
                    {t("Plastik")}
                  </td>
                  <td className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {salesReport.totalcard &&
                      salesReport.totalcard.toLocaleString('ru-RU')}{' '}
                    $
                  </td>
                </tr>
                <tr>
                  <td className='border-2 border-blue-700 py-2 px-4 text-lg font-bold'>
                    {t("O'tkazma")}
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
            <p className='text-2xl font-medium text-blue-700'>{t("Sof foyda")}</p>
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-6'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {salesReport.salecount &&
                salesReport.salecount.toLocaleString('ru-RU')}
            </span>
            <p className='text-lg font-medium'>{t("Sotish soni")}</p>
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
            <p className='text-lg font-medium'>{t("Tovarlarining umumiy soni")}</p>
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-6'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {incomingsReport.incomingsCount &&
                incomingsReport.incomingsCount.toLocaleString('ru-RU')}
            </span>
            <p className='text-lg font-medium'> {t("Tushumlar miqdori")}</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.incomeproducts &&
                productsReport.incomeproducts.toLocaleString('ru-RU')}{' '}
            </span>
            <p className='text-lg font-medium'>
            {t("Tovar turlarining umumiy soni")}
            </p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.incomeproductspieces}
            </span>
            <p className='text-lg font-medium'>{t("Tovarlarining umumiy soni")}</p>
          </div>
        </div>
        <div className='w-full flex justify-center items-center py-4 mb-6 px-2'>
          <div className='flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {incomingsReport.totalIncomingsPrice &&
                incomingsReport.totalIncomingsPrice.toLocaleString(
                  'ru-RU'
                )}{' '}
              $
            </span>
            <p className='text-lg font-medium'>{t("Jami tushumlar")}</p>
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-6 px-2'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.products &&
                productsReport.products.toLocaleString('ru-RU')}{' '}
            </span>
            <p className='text-lg font-medium'>
            {t("Tovar turlarining umumiy soni")}
            </p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.productspieces &&
                productsReport.productspieces.toLocaleString('ru-RU')}{' '}
            </span>
            <p className='text-lg font-medium'>{t("Tovarlarning umumiy soni")}</p>
          </div>
          <div className='col-start-9 col-span-4 flex flex-col items-center text-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.productstotalprice &&
                productsReport.productstotalprice.toLocaleString('ru-RU')}{' '}
              $
            </span>
            <p className='text-lg font-medium'>{t("Ombordagi tovarlarning umumiy miqdori")}</p>
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
