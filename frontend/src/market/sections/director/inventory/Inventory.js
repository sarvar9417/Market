import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './Inventory/TableHead';
import { TableHeader } from './Inventory/TableHeader';
import { Rows } from './Inventory/Rows';
import { Modal } from '../components/Modal';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { t } from 'i18next';

export const Inventory = () => {
  // ===========================================================
  // STATES
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentProducts, setCurrentProducts] = useState([]);

  // Products
  const [searchStorage, setSearchStorage] = useState([]);
  const [search, setSearch] = useState({
    categorycode: '',
    productcode: '',
    producttype: '',
    productname: '',
    brand: '',
  });
  const [sendingsearch, setSendingSearch] = useState(search);
  const [productsCount, setProductsCount] = useState(0);
  const [modal, setModal] = useState(false);

  //Context
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();
  // ===========================================================
  // TOAST
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

  // ===========================================================
  // API METHODS
  const getProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/inventory/getproducts`,
        'POST',
        {
          market: auth.market._id,
          currentPage,
          countPage,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setSearchStorage(data.products);
      setCurrentProducts(data.products);
      setProductsCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    request,
    auth,
    notify,
    setCurrentProducts,
    setSearchStorage,
    currentPage,
    countPage,
    sendingsearch,
  ]);

  const updateInventory = useCallback(
    async (e, i) => {
      try {
        const data = await request(
          `/api/inventory/update`,
          'POST',
          {
            market: auth.market._id,
            inventory: e,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        localStorage.setItem('data', data);
        notify({
          title: `${currentProducts[i].productdata.name} ${t(
            'mahsuloti inventarizatsiyasi saqlandi'
          )}`,
          description: '',
          status: 'success',
        });
        getProducts();
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify, currentProducts, getProducts]
  );

  const completeInventory = useCallback(async () => {
    try {
      const data = await request(
        `/api/inventory/completed`,
        'POST',
        {
          market: auth.market._id,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      localStorage.setItem('data', data);
      notify({
        title: t(`Inventarizatsiya jarayoni yakunlandi`),
        description: '',
        status: 'success',
      });
      history.push('/alo24/inventories');
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, history]);

  // ===========================================================
  // HANDLAERS
  const changeHandler = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });

    let filter = [];

    switch (e.target.name) {
      case 'productname':
        filter = searchStorage.filter((product) => {
          return product.productdata.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        });
        break;
      case 'productcode':
        filter = searchStorage.filter((product) => {
          return product.productdata.code.includes(e.target.value);
        });
        break;
      default:
        break;
    }

    setCurrentProducts(filter);
  };

  const commitHandler = (e) => {
    let s = [...currentProducts];
    s[parseInt(e.target.id)].inventory.comment = e.target.value;
    setCurrentProducts(s);
  };

  const countHandler = (e) => {
    let s = [...currentProducts];
    s[parseInt(e.target.name)].inventory.inventorycount = e.target.value;
    s[parseInt(e.target.name)].inventory.productcount =
      s[parseInt(e.target.name)].total;
    setCurrentProducts(s);
  };

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
    }
  };

  const keyPressedUpdate = (e, inventory, i) => {
    if (e.key === 'Enter' && !loading) {
      updateInventory(inventory, i);
    }
  };

  const setPageSize = useCallback((e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  }, []);

  // ==========================================================
  // USEEFFECTS
  useEffect(() => {
    getProducts();
  }, [getProducts, countPage, currentPage, sendingsearch]);

  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w[990px]'>
        <TableHeader
          setModal={setModal}
          keyPressed={keyPressed}
          changeHandler={changeHandler}
          productsCount={productsCount}
          currentPage={currentPage}
          countPage={countPage}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
        />
        <TableHead />

        {currentProducts.map((product, index) => {
          return (
            <Rows
              loading={loading}
              commitHandler={commitHandler}
              keyPressed={keyPressedUpdate}
              updateInventory={updateInventory}
              countHandler={countHandler}
              key={index}
              index={index}
              currentPage={currentPage}
              countPage={countPage}
              product={product}
            />
          );
        })}
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={t(
          'Diqqat! Inventarizatsiya jarayoni yakunlanganiini tasdiqlaysizmi?'
        )}
        handler={completeInventory}
      />
    </div>
  );
};
