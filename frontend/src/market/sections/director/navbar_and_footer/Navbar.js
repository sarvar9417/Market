import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { useToast } from '@chakra-ui/react';
import { t } from 'i18next';

export const Navbar = ({ baseUrl }) => {
  const history = useHistory();
  //====================================================================
  //====================================================================
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

  const [activePage, setActivePage] = useState(window.location.pathname);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [user, setUser] = useState(auth.user);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const getDirector = useCallback(async () => {
    try {
      const data = await request(
        '/api/user',
        'POST',
        {
          userId: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setUser(data);
    } catch (error) {
      notify({ title: error, description: '', status: 'error' });
    }
  }, [request, auth, notify]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  useEffect(() => {
    getDirector();
  }, [getDirector]);
  //====================================================================
  //====================================================================

  return (
    <div>
      <div className='container-fluid p-0'>
        {/* Navigation start */}
        <nav className='navbar navbar-expand-lg custom-navbar p-0'>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#royalHospitalsNavbar'
            aria-controls='royalHospitalsNavbar'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'>
              <i />
              <i />
              <i />
            </span>
          </button>
          <div
            className='collapse navbar-collapse justify-content-between p-0'
            id='royalHospitalsNavbar'>
            <ul className='navbar-nav'>
              <li className='nav-item mr-4 px-2'>
                <span className='logo' style={{ fontSize: '26pt' }}>
                  Alo24
                </span>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    activePage === '/alo24' || activePage === '/'
                      ? 'active-page'
                      : ''
                  }`}
                  onClick={() => {
                    setActivePage('/alo24');
                  }}
                  to='/'>
                  <i className='icon-devices_other nav-icon' />
                  {t('Bosh sahifa')}
                </Link>
              </li>
              <li className='nav-item dropdown '>
                <span
                  id='doctoRs'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  className={`nav-link dropdown-toggle ${
                    activePage === '/alo24/category' ||
                    activePage === '/alo24/producttypes' ||
                    activePage === '/alo24/product' ||
                    activePage === '/alo24/brand' ||
                    activePage === '/alo24/unit' ||
                    activePage === '/alo24/supplier' ||
                    activePage === '/alo24/incoming' ||
                    activePage === '/alo24/inventory' ||
                    activePage === '/alo24/inventories'
                      ? 'active-page'
                      : ''
                  }`}>
                  <i className='icon-users nav-icon' />
                  {t('Mahsulotlar')}
                </span>
                <ul className='dropdown-menu' aria-labelledby='doctoRs'>
                  <li>
                    <span
                      className='dropdown-toggle sub-nav-link'
                      to='#'
                      id='buttonsDropdown'
                      role='button'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'>
                      {t('Yaratish')}
                    </span>
                    <ul
                      className='dropdown-menu dropdown-menu-right'
                      aria-labelledby='buttonsDropdown'>
                      <li>
                        <Link
                          className={`dropdown-item ${
                            activePage === '/alo24/category'
                              ? 'active-page'
                              : ''
                          }`}
                          onClick={() => {
                            setActivePage('/alo24/category');
                          }}
                          to='/alo24/category'>
                          {t('Mahsulot kategoriyalari')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${
                            activePage === '/alo24/producttypes'
                              ? 'active-page'
                              : ''
                          }`}
                          onClick={() => {
                            setActivePage('/alo24/producttypes');
                          }}
                          to='/alo24/producttypes'>
                          {t('Mahsulotlar turlari')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${
                            activePage === '/alo24/brand' ? 'active-page' : ''
                          }`}
                          onClick={() => {
                            setActivePage('/alo24/brand');
                          }}
                          to='/alo24/brand'>
                          {t('Brendlar')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${
                            activePage === '/alo24/product' ? 'active-page' : ''
                          }`}
                          onClick={() => {
                            setActivePage('/alo24/product');
                          }}
                          to='/alo24/product'>
                          {t('Mahsulotlar')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${
                            activePage === '/alo24/unit' ? 'active-page' : ''
                          }`}
                          onClick={() => {
                            setActivePage('/alo24/unit');
                          }}
                          to='/alo24/unit'>
                          {t("O'lchov birliklari")}
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item' to='/alo24/supplier'>
                          {t('Yetkazib beruvchilar')}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        activePage === '/alo24/incoming' ? 'active-page' : ''
                      }`}
                      onClick={() => {
                        setActivePage('/alo24/incoming');
                      }}
                      to='/alo24/incoming'>
                      {t('Qabul qilish')}
                    </Link>
                  </li>
                  <li>
                    <span
                      className='dropdown-toggle sub-nav-link'
                      to='#'
                      id='buttonsDropdown'
                      role='button'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'>
                      {t('Invertarizatsiya')}
                    </span>
                    <ul
                      className='dropdown-menu dropdown-menu-right'
                      aria-labelledby='buttonsDropdown'>
                      <li>
                        <Link
                          className={`dropdown-item ${
                            activePage === '/alo24/inventory'
                              ? 'active-page'
                              : ''
                          }`}
                          onClick={() => {
                            setActivePage('/alo24/inventory');
                          }}
                          to='/alo24/inventory'>
                          {t('Invertarizatsiya')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${
                            activePage === '/alo24/inventories'
                              ? 'active-page'
                              : ''
                          }`}
                          onClick={() => {
                            setActivePage('/alo24/inventories');
                          }}
                          to='/alo24/inventories'>
                          {t('Invertarizatsiyalar')}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className='nav-item dropdown'>
                <span
                  id='doctoRs'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  className={`nav-link dropdown-toggle ${
                    activePage === '/alo24/sales' ||
                    activePage === '/alo24/sales/packman' ||
                    activePage === '/alo24/sales/client' ||
                    activePage === '/alo24/payments' ||
                    activePage === '/alo24/discounts' ||
                    activePage === '/alo24/debts'
                      ? 'active-page'
                      : ''
                  }`}>
                  <i className='icon-users nav-icon' />
                  {t('Sotuv')}
                </span>
                <ul className='dropdown-menu' aria-labelledby='doctoRs'>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        activePage === '/alo24/sales' ? 'active-page' : ''
                      }`}
                      onClick={() => {
                        setActivePage('/alo24/sales');
                      }}
                      to='/alo24/sales'>
                      {t('Sotuv')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        activePage === '/alo24/payments' ? 'active-page' : ''
                      }`}
                      onClick={() => {
                        setActivePage('/alo24/payments');
                      }}
                      to='/alo24/payments'>
                      {t('Tushumlar')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        activePage === '/alo24/discounts' ? 'active-page' : ''
                      }`}
                      onClick={() => {
                        setActivePage('/alo24/discounts');
                      }}
                      to='/alo24/discounts'>
                      {t('Chegirmalar')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        activePage === '/alo24/debts' ? 'active-page' : ''
                      }`}
                      onClick={() => {
                        setActivePage('/alo24/debts');
                      }}
                      to='/alo24/debts'>
                      {t('Qarzlar')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        activePage === '/alo24/packman' ? 'active-page' : ''
                      }`}
                      onClick={() => {
                        setActivePage('/alo24/packman');
                      }}
                      to='/alo24/packman'>
                      {t('Yetkazuvchi')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        activePage === '/alo24/client' ? 'active-page' : ''
                      }`}
                      onClick={() => {
                        setActivePage('/alo24/client');
                      }}
                      to='/alo24/client'>
                      {t('Mijoz')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='nav-item dropdown'>
                <Link
                  className={`nav-link ${
                    activePage === '/alo24/exchangerate' || activePage === '/'
                      ? 'active-page'
                      : ''
                  }`}
                  onClick={() => {
                    setActivePage('/alo24/exchangerate');
                  }}
                  to='/alo24/exchangerate'>
                  <i className='icon-dollar-sign nav-icon'></i>
                  {t('Valyuta kursi')}
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <span
                  id='doctoRs'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  className={`nav-link dropdown-toggle ${
                    activePage === '/alo24/branches' ||
                    activePage === '/alo24/branchregister'
                      ? 'active-page'
                      : ''
                  }`}>
                  <i className='icon-users nav-icon' />
                  Filial
                </span>
                <ul className='dropdown-menu' aria-labelledby='doctoRs'>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        activePage === '/alo24/branchregister'
                          ? 'active-page'
                          : ''
                      }`}
                      onClick={() => {
                        setActivePage('/alo24/branchregister');
                      }}
                      to='/alo24/branchregister'>
                      Filial yaratish
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        activePage === '/alo24/branches' ? 'active-page' : ''
                      }`}
                      onClick={() => {
                        setActivePage('/alo24/branches');
                      }}
                      to='/alo24/branches'>
                      Filiallar
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <ul className='header-actions py-1 mr-2'>
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
                        src={
                          baseUrl && `${baseUrl}/api/upload/file/${user.image}`
                        }
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
                            baseUrl &&
                            `${baseUrl}/api/upload/file/${user.image}`
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
        </nav>
        {/* Navigation end */}
        <div className='main-container'>
          {/* Page header start */}
          <div className='page-header'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item active'>{t('Bosh sahifa')}</li>
            </ol>
          </div>
          {/* Page header end */}
        </div>
      </div>
    </div>
  );
};
