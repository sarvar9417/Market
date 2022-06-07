import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';

export const TableHead = ({ currentProducts, setCurrentProducts }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r flex justify-center col-span-1'>
        {t('Kategoriya')}
        <div className='btn-group-vertical ml-2'>
          <FontAwesomeIcon
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  a.category.code > b.category.code ? 1 : -1
                )
              )
            }
            icon={faAngleUp}
            style={{ cursor: 'pointer' }}
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  b.category.code > a.category.code ? 1 : -1
                )
              )
            }
          />
        </div>
      </li>
      <li className='th border-r flex justify-center col-span-3'>
        {t('Mahsulot turi va mahsulot')}
        <div className='btn-group-vertical ml-2'>
          <FontAwesomeIcon
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  a.producttype.name > b.producttype.name ? 1 : -1
                )
              )
            }
            icon={faAngleUp}
            style={{ cursor: 'pointer' }}
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  b.producttype.name > a.producttype.name ? 1 : -1
                )
              )
            }
          />
        </div>
      </li>
      <li className='th border-r flex justify-center col-span-2'>
        {t('Brend')}
        <div className='btn-group-vertical ml-2'>
          <FontAwesomeIcon
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  a.brand.name > b.brand.name ? 1 : -1
                )
              )
            }
            icon={faAngleUp}
            style={{ cursor: 'pointer' }}
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  b.brand.name > a.brand.name ? 1 : -1
                )
              )
            }
          />
        </div>
      </li>
      <li className='th border-r flex justify-center col-span-1'>
        {t("Soni - O'.B.")}
        <div className='btn-group-vertical ml-2'>
          <FontAwesomeIcon
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  a.unit.name > b.unit.name ? 1 : -1
                )
              )
            }
            icon={faAngleUp}
            style={{ cursor: 'pointer' }}
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  b.uni.name > a.unit.name ? 1 : -1
                )
              )
            }
          />
        </div>
      </li>
      <li className='th border-r flex justify-center col-span-1'>
        Olish
        <div className='btn-group-vertical ml-2'>
          <FontAwesomeIcon
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  a.unit.name > b.unit.name ? 1 : -1
                )
              )
            }
            icon={faAngleUp}
            style={{ cursor: 'pointer' }}
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  b.uni.name > a.unit.name ? 1 : -1
                )
              )
            }
          />
        </div>
      </li>
      <li className='th border-r flex justify-center col-span-1'>
        Sotish
        <div className='btn-group-vertical ml-2'>
          <FontAwesomeIcon
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  a.unit.name > b.unit.name ? 1 : -1
                )
              )
            }
            icon={faAngleUp}
            style={{ cursor: 'pointer' }}
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setCurrentProducts(
                [...currentProducts].sort((a, b) =>
                  b.uni.name > a.unit.name ? 1 : -1
                )
              )
            }
          />
        </div>
      </li>
      <li className='th border-r'>{t('Tahrirlash')}</li>
      <li className='th border-r'>{t("O'chirish")}</li>
    </ul>
  );
};
