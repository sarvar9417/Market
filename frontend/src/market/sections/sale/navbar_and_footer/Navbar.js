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
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'>
              <i />
              <i />
              <i />
            </span>
          </button>
          <div
            className='collapse navbar-collapse justify-content-between p-0'
            id='royalHospitalsNavbar'
          >
            <ul className='navbar-nav'>
              <li className='nav-item mr-4 px-2'></li>
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
                  to='/'
                >
                  <i className='icon-devices_other nav-icon' />
                  {t('Mahsulotlar')}
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <span
                  className={`nav-link ${
                    activePage === '/alo24/sales' ? 'active-page' : ''
                  }`}
                >
                  <i className='icon-devices_other nav-icon' />
                  {t('Sotuv')}
                </span>
                <ul className='dropdown-menu'>
                  <li>
                    <Link
                      className='dropdown-item'
                      to={'/alo24/sales'}
                      onClick={() => setActivePage('/alo24/sales')}
                    >
                      Sotuv
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='dropdown-item'
                      to={'/alo24/debts'}
                      onClick={() => setActivePage('/alo24/debts')}
                    >
                      Qarzdorlar
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='dropdown-item'
                      to={'/alo24/packman'}
                      onClick={() => setActivePage('/alo24/packman')}
                    >
                      Santexniklar
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='dropdown-item'
                      to={'/alo24/client'}
                      onClick={() => setActivePage('/alo24/client')}
                    >
                      Mijozlar
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
                  aria-haspopup='true'
                >
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
                  aria-labelledby='userSettings'
                >
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
                      <p>{t('Sotuvchi')}</p>
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
                      }}
                    >
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
              <li className='breadcrumb-item active'>{t("Sotuv bo'limi")}</li>
            </ol>
          </div>
          {/* Page header end */}
        </div>
      </div>
    </div>
  );
};
