import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@chakra-ui/react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { t } from 'i18next';

export const Navbar = ({ baseUrl }) => {


  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [user, setUser] = useState(auth.user);

  const toast = useToast();

  const notify = useCallback(
    (data) => {
      toast({
        title: data.title && data.title,
        description: data.description && data.description,
        status: data.status && data.status,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [toast]
  );

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
    setMenu('');
    setSubMenu('');
  };

  const getUser = useCallback(async () => {
    try {
      const data = await request(
        '/api/user',
        'POST',
        {
          userId: auth.userId,
        },
        { Authorization: `Bearer ${auth.token}` }
      );
      setUser(data);
    } catch (error) {
      notify({ title: error, description: '', status: 'error' });
    }
  }, [request, auth, notify]);

  useEffect(() => {
    getUser();
    window.addEventListener('click', () => {
      setCurrentPage(window.location.pathname);
    });
  }, [getUser]);

  return (
    <nav className=''>
      <div className='flex justify-between m-0 p-0'>
        <div className='font-bold flex items-center'>
          <div className='px-5 py-2 text-xl'>
            <span className='text-blue-900'>PIPE</span> <span>HOUSE</span>
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
                    <span className='pointer-events-none'>{t('Yaratish')}</span>
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
                    to='/alo24/payments'
                    className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                    {t('Tushumlar')}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={changeLink}
                    to='/alo24/discounts'
                    className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                    {t('Chegirmalar')}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={changeLink}
                    to='/alo24/debts'
                    className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                    {t('Qarzlar')}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={changeLink}
                    to='/alo24/packman'
                    className='inline-block w-full px-3 py-2 text-blue-900 hover:text-blue-900 hover:bg-[#caf4f1bc] border-b'>
                    {t('Yetkazuvchilar')}
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
                Valyuta kursi
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
              <span className='user-name'>
                {user.firstname} {user.lastname}
              </span>
              <span className='avatar md'>
                {baseUrl ? (
                  <img
                    className='circle d-inline'
                    src={baseUrl && `${baseUrl}/api/upload/file/${user.image}`}
                    alt={user.firstname[0] + user.lastname[0]}
                  />
                ) : (
                  user.firstname[0] + user.lastname[0]
                )}

                <span className='status busy' />
              </span>
            </span>
            <div
              className='dropdown-menu dropdown-menu-right'
              aria-labelledby='userSettings'>
              <div className='header-profile-actions'>
                <div className='header-user-profile'>
                  <div className='header-user'>
                    <img
                      src={
                        baseUrl && `${baseUrl}/api/upload/file/${user.image}`
                      }
                      alt={user.firstname[0] + user.lastname[0]}
                    />
                  </div>
                  {user.firstname} {user.lastname}
                  <p>{t('Direktor')}</p>
                </div>
                <Link to='/alo24/editdirector'>
                  <i className='icon-user1' /> {t('Tahrirlash')}
                </Link>
                <Link to='/alo24/editdirectorpassword'>
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
      </div>
      <div className='bg-blue-900 py-2 px-3 text-white text-xl m-0'>
        {t('Bosh sahifa')}
      </div>
    </nav>
  );
};
