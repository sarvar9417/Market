import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleRight,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/AuthContext';
import { t } from 'i18next';

export const Navbar = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const auth = useContext(AuthContext);

  const [menu, setMenu] = useState('');
  const [submenu, setSubMenu] = useState('');

  const changeHeadMenu = (e) => {
    e.target.id === menu ? setMenu('') : setMenu(e.target.id);
    setSubMenu('');
  };

  const changeSubMenu = (e) => {
    e.target.id === submenu ? setSubMenu('') : setSubMenu(e.target.id);
  };

  const changeLink = () => {
    setBar(false);
    setMenu('');
    setSubMenu('');
  };

  const [bar, setBar] = useState(false);

  const handleClick = () => {
    setBar(!bar);
  };

  useEffect(() => {
    window.addEventListener('click', () => {
      setCurrentPage(window.location.pathname);
    });
  }, [auth]);

  return (
    <div>
      <nav className={'hidden md:block'}>
        <div className='flex justify-between m-0 p-0'>
          <div className='font-bold flex items-center'>
            <div className='px-5 py-2 text-xl'>
              <span className='text-blue-900'>ALO</span> <span>24</span>
            </div>
            <ul className='text-xs'>
              <li className='inline-block'>
                <Link
                  id='HeadMenu'
                  onClick={changeHeadMenu}
                  to='/alo24'
                  className={
                    currentPage === '/alo24' ||
                    currentPage === '/' ||
                    menu === 'HeadMenu'
                      ? 'active-page'
                      : 'unactive-page'
                  }>
                  {t('Bosh sahifa')}
                </Link>
              </li>

              <li className='inline-block relative'>
                <Link
                  to='#'
                  id='Products'
                  onClick={changeHeadMenu}
                  className={
                    currentPage === '/alo24/category' ||
                    currentPage === '/alo24/incoming' ||
                    currentPage === '/alo24/unit' ||
                    currentPage === '/alo24/supplier' ||
                    currentPage === '/alo24/product' ||
                    currentPage === '/alo24/inventory' ||
                    currentPage === '/alo24/inventories' ||
                    menu === 'Products'
                      ? 'active-page'
                      : 'unactive-page'
                  }>
                  {t('Mahsulotlar')}{' '}
                  <FontAwesomeIcon icon={faAngleDown} className='text-[10px]' />
                </Link>

                <ul
                  className={
                    menu !== 'Products'
                      ? 'hidden'
                      : 'absolute z-50 top-9 bg-white w-[200px] animate-fadeInUp shadow-2xl'
                  }>
                  <div className='p-2 bg-white absolute -top-1 rotate-45 left-2 -z-10'></div>
                  <li className='relative'>
                    <Link
                      id='Create'
                      onClick={changeSubMenu}
                      to='#'
                      className='w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] relative flex justify-between border-b'>
                      <span className='pointer-events-none'>
                        {t('Yaratish')}
                      </span>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className='pointer-events-none text-[10px]'
                      />
                    </Link>

                    <ul
                      className={
                        submenu === 'Create'
                          ? 'left-52 absolute bg-white top-0 w-[200px] animate-fadeInRight shadow-2xl'
                          : 'hidden'
                      }>
                      <div className='p-2 bg-white absolute top-1 rotate-45 -left-1 -z-10'></div>
                      <li>
                        <Link
                          onClick={changeLink}
                          to='/alo24/category'
                          className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                          {t('Kategoriyalar')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={changeLink}
                          to='/alo24/product'
                          className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                          {t('Mahsulotlar')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={changeLink}
                          to='/alo24/unit'
                          className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                          {t("O'lchov birliklari")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={changeLink}
                          to='/alo24/supplier'
                          className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                          {t('Yetkazib beruvchilar')}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/incoming'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Qabul qilish')}
                    </Link>
                  </li>
                  <li className='relative'>
                    <Link
                      id='Inventory'
                      onClick={changeSubMenu}
                      to='#'
                      className='w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] relative flex justify-between'>
                      <span className='pointer-events-none'>
                        {t('Inventarizatsiya')}
                      </span>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className='pointer-events-none text-[10px]'
                      />
                    </Link>
                    <ul
                      className={
                        submenu === 'Inventory'
                          ? 'left-52 absolute bg-white top-0 w-[200px] animate-fadeInRight shadow-2xl'
                          : 'hidden'
                      }>
                      <div className='p-2 bg-white absolute top-1 rotate-45 -left-1 -z-10'></div>
                      <li>
                        <Link
                          onClick={changeLink}
                          to='/alo24/inventory'
                          className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                          {t('Inventarizatsiya')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={changeLink}
                          to='/alo24/inventories'
                          className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                          {t('Inventarizatsiyalar')}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className='inline-block relative'>
                <Link
                  to='#'
                  id='Sale'
                  onClick={changeHeadMenu}
                  className={
                    currentPage === '/alo24/sales' ||
                    currentPage === '/alo24/payments' ||
                    currentPage === '/alo24/discounts' ||
                    currentPage === '/alo24/debts' ||
                    currentPage === '/alo24/sellers' ||
                    currentPage === '/alo24/client' ||
                    currentPage === '/alo24/packman' ||
                    menu === 'Sale'
                      ? 'active-page'
                      : 'unactive-page'
                  }>
                  {t('Sotuv')}{' '}
                  <FontAwesomeIcon icon={faAngleDown} className='text-[10px]' />
                </Link>
                <ul
                  className={
                    menu !== 'Sale'
                      ? 'hidden'
                      : 'absolute z-50 top-9 bg-white w-[200px] animate-fadeInUp shadow-2xl'
                  }>
                  <div className='p-2 bg-white absolute -top-1 rotate-45 left-2 -z-10'></div>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/sales'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Sotuv')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/packman'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Santexniklar')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/client'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Mijozlar')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/sellers'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Sotuvchilar')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='inline-block'>
                <Link
                  onClick={changeHeadMenu}
                  id='reports'
                  to='/alo24/reports'
                  className={
                    currentPage === '/alo24/reports'
                      ? 'active-page'
                      : 'unactive-page'
                  }>
                  {t('Kassa')}
                </Link>
              </li>
              <li className='inline-block relative'>
                <Link
                  to='#'
                  id='Branch'
                  onClick={changeHeadMenu}
                  className={
                    currentPage === '/alo24/branches' ||
                    currentPage === '/alo24/branchregister' ||
                    menu === 'Branch'
                      ? 'active-page'
                      : 'unactive-page'
                  }>
                  {t('Filial')}{' '}
                  <FontAwesomeIcon icon={faAngleDown} className='text-[10px]' />
                </Link>
                <ul
                  className={
                    menu !== 'Branch'
                      ? 'hidden'
                      : 'absolute z-50 top-9 bg-white w-[200px] animate-fadeInUp shadow-2xl'
                  }>
                  <div className='p-2 bg-white absolute -top-1 rotate-45 left-2 -z-10'></div>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/branchregister'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Filial yaratish')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/branches'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Filiallar')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='inline-block'>
                <Link
                  onClick={changeHeadMenu}
                  id='exchangerate'
                  to='/alo24/exchangerate'
                  className={
                    currentPage === '/alo24/exchangerate'
                      ? 'active-page'
                      : 'unactive-page'
                  }>
                  {t('Valyuta kursi')}
                </Link>
              </li>
            </ul>
          </div>
          <ul className='header-actions py-0 mr-2'>
            <li className='dropdown'>
              <span
                id='userSettings'
                className='user-settings'
                data-toggle='dropdown'
                aria-haspopup='true'>
                <span className='user-name'></span>
                <span className='avatar md'>
                  <span className='status busy' />
                </span>
              </span>
              <div
                className='dropdown-menu dropdown-menu-right'
                aria-labelledby='userSettings'>
                <div className='header-profile-actions'>
                  <div className='header-user-profile'>
                    <p>{t('Administrator')}</p>
                  </div>
                  <Link to='#'>
                    <i className='icon-vpn_key' /> {t("Parolni o'zgartirish")}
                  </Link>
                  <button
                    onClick={() => {
                      auth.logout();
                      history.push('/');
                    }}>
                    <i className='icon-log-out1' /> {t('Tizimdan chiqish')}
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div className='flex items-center md:hidden'>
            <FontAwesomeIcon
              icon={faBars}
              className='p-2 text-lg text-blue-900'
            />
          </div>
        </div>
      </nav>
      <div className='text-right md:hidden'>
        <button className='' onClick={handleClick}>
          <FontAwesomeIcon
            icon={bar ? faTimes : faBars}
            className='p-2 text-lg text-blue-900'
          />
        </button>
      </div>
      <nav className={bar ? 'font-bold justify-end md:hidden' : 'hidden'}>
        <div className='px-5 py-2 text-xl md: w-full text-center'>
          <span className='text-blue-900'>PIPE</span> <span>HOUSE</span>
        </div>
        <ul className='px-5 py-2 text-xs md:grid grid-cols-1 gap-1'>
          <li className='sm: py-1'>
            <Link
              id='HeadMenu'
              onClick={changeHeadMenu}
              to='/alo24'
              className={
                currentPage === '/alo24' ||
                currentPage === '/' ||
                menu === 'HeadMenu'
                  ? 'active-page py-1 block  border text-center rounded-xl'
                  : 'unactive-page block py-1 border text-center rounded-xl'
              }>
              {t('Bosh sahifa')}
            </Link>
          </li>

          <li className='relative sm: py-1'>
            <Link
              to='#'
              id='Products'
              onClick={changeHeadMenu}
              className={
                currentPage === '/alo24/category' ||
                currentPage === '/alo24/incoming' ||
                currentPage === '/alo24/unit' ||
                currentPage === '/alo24/supplier' ||
                currentPage === '/alo24/product' ||
                currentPage === '/alo24/inventory' ||
                currentPage === '/alo24/inventories' ||
                menu === 'Products'
                  ? 'active-page py-1 border text-center rounded-xl block '
                  : 'unactive-page py-1 border text-center rounded-xl block'
              }>
              {t('Mahsulotlar')}{' '}
              <FontAwesomeIcon icon={faAngleRight} className='text-[10px]' />
            </Link>

            <ul
              className={
                menu !== 'Products'
                  ? 'hidden'
                  : 'absolute z-50  left-1 bg-white w-[200px] animate-fadeInLeft shadow-2xl'
              }>
              <div className='p-2 bg-white absolute -top-1 rotate-45 left-2 -z-10'></div>
              <li className='relative'>
                <Link
                  id='Create'
                  onClick={changeSubMenu}
                  to='#'
                  className='w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] relative flex justify-between border-b'>
                  <span className='pointer-events-none'>{t('Yaratish')}</span>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className='pointer-events-none text-[10px]'
                  />
                </Link>

                <ul
                  className={
                    submenu === 'Create'
                      ? ' absolute bg-white top-8 w-[200px] animate-fadeInRight shadow-2xl z-30'
                      : 'hidden'
                  }>
                  <div className='p-2 bg-white absolute -top-2 rotate-45 left-2 z-30'></div>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/category'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Kategoriyalar')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/product'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Mahsulotlar')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/unit'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t("O'lchov birliklari")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/supplier'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Yetkazib beruvchilar')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  onClick={changeLink}
                  to='/alo24/incoming'
                  className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                  {t('Qabul qilish')}
                </Link>
              </li>
              <li className='relative'>
                <Link
                  id='Inventory'
                  onClick={changeSubMenu}
                  to='#'
                  className='w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] relative flex justify-between'>
                  <span className='pointer-events-none'>
                    {t('Inventarizatsiya')}
                  </span>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className='pointer-events-none text-[10px]'
                  />
                </Link>
                <ul
                  className={
                    submenu === 'Inventory'
                      ? 'left-0 absolute bg-white top-8 w-[200px] animate-fadeInRight shadow-2xl z-30'
                      : 'hidden'
                  }>
                  <div className='p-2 bg-white absolute -top-2 rotate-45 left-2 z-30'></div>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/inventory'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Inventarizatsiya')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={changeLink}
                      to='/alo24/inventories'
                      className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                      {t('Inventarizatsiyalar')}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className='relative sm: py-1'>
            <Link
              to='#'
              id='Sale'
              onClick={changeHeadMenu}
              className={
                currentPage === '/alo24/sales' ||
                currentPage === '/alo24/payments' ||
                currentPage === '/alo24/discounts' ||
                currentPage === '/alo24/debts' ||
                currentPage === '/alo24/sellers' ||
                currentPage === '/alo24/client' ||
                currentPage === '/alo24/packman' ||
                menu === 'Sale'
                  ? 'active-page py-1 border text-center rounded-xl block '
                  : 'unactive-page py-1 border text-center rounded-xl block '
              }>
              {t('Sotuv')}{' '}
              <FontAwesomeIcon icon={faAngleRight} className='text-[10px]' />
            </Link>
            <ul
              className={
                menu !== 'Sale'
                  ? 'hidden'
                  : 'absolute z-50 top-8 left-0 bg-white w-[200px] animate-fadeInLeft shadow-2xl'
              }>
              <div className='p-2 bg-white absolute -top-1 rotate-45 left-2 -z-10'></div>
              <li>
                <Link
                  onClick={changeLink}
                  to='/alo24/sales'
                  className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                  {t('Sotuv')}
                </Link>
              </li>
              <li>
                <Link
                  onClick={changeLink}
                  to='/alo24/packman'
                  className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                  {t('Santexniklar')}
                </Link>
              </li>
              <li>
                <Link
                  onClick={changeLink}
                  to='/alo24/client'
                  className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                  {t('Mijozlar')}
                </Link>
              </li>
              <li>
                <Link
                  onClick={changeLink}
                  to='/alo24/sellers'
                  className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                  {t('Sotuvchilar')}
                </Link>
              </li>
            </ul>
          </li>
          <li className='sm: py-1'>
            <Link
              onClick={changeHeadMenu}
              id='reports'
              to='/alo24/reports'
              className={
                currentPage === '/alo24/reports'
                  ? 'active-page py-1 border text-center rounded-xl block'
                  : 'unactive-page py-1 border text-center rounded-xl block'
              }>
              {t('Kassa')}
            </Link>
          </li>
          <li className='relative sm: py-1'>
            <Link
              to='#'
              id='Branch'
              onClick={changeHeadMenu}
              className={
                currentPage === '/alo24/branches' ||
                currentPage === '/alo24/branchregister' ||
                menu === 'Branch'
                  ? 'active-page py-1 border text-center block rounded-xl'
                  : 'unactive-page py-1 border text-center block rounded-xl'
              }>
              {t('Filial')}{' '}
              <FontAwesomeIcon icon={faAngleRight} className='text-[10px]' />
            </Link>
            <ul
              className={
                menu !== 'Branch'
                  ? 'hidden'
                  : 'absolute z-50 top-8 left-0 bg-white w-[200px] animate-fadeInLeft shadow-2xl'
              }>
              <div className='p-2 bg-white absolute -top-1 rotate-45 left-2 -z-10'></div>
              <li>
                <Link
                  onClick={changeLink}
                  to='/alo24/branchregister'
                  className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                  {t('Filial yaratish')}
                </Link>
              </li>
              <li>
                <Link
                  onClick={changeLink}
                  to='/alo24/branches'
                  className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                  {t('Filiallar')}
                </Link>
              </li>
            </ul>
          </li>
          <li className='sm: py-1'>
            <Link
              onClick={changeHeadMenu}
              id='exchangerate'
              to='/alo24/exchangerate'
              className={
                currentPage === '/alo24/exchangerate'
                  ? 'active-page py-1 border text-center rounded-xl block'
                  : 'unactive-page py-1 border text-center rounded-xl block'
              }>
              {t('Valyuta kursi')}
            </Link>
          </li>
        </ul>
      </nav>
      <div className='bg-blue-900 py-2 px-3 text-white text-xl m-0'>
        {t('Bosh sahifa')}
      </div>
    </div>
  );
};
