import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './Inventory/TableHead';
import { TableHeader } from './Inventory/TableHeader';
import { Rows } from './Inventory/Rows';

export const Inventory = () => {
  // ===========================================================
  // STATES
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentProducts, setCurrentProducts] = useState([]);

  // Products
  const [searchStorage, setSearchStrorage] = useState([]);
  const [search, setSearch] = useState({
    categorycode: '',
    productcode: '',
    producttype: '',
    productname: '',
    brand: '',
  });
  const [sendingsearch, setSendingSearch] = useState(search);
  const [productsCount, setProductsCount] = useState(0);

  //Context
  const { request } = useHttp();
  const auth = useContext(AuthContext);

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
  // GET METHODS
  const getProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/getproductsinventory`,
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
      console.log(data.products);
      setSearchStrorage(data.products);
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
    setSearchStrorage,
    currentPage,
    countPage,
    sendingsearch,
  ]);

  // ===========================================================
  // HANDLAERS
  const changeHandler = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });

    let filter = [];
    switch (e.target.name) {
      case 'productname':
        filter = searchStorage.filter((product) => {
          return product.name.includes(e.target.value);
        });
        break;

      case 'productcode':
        filter = searchStorage.filter((product) => {
          return product.code.includes(e.target.value);
        });
        break;
      case 'categorycode':
        filter = searchStorage.filter((product) => {
          return product.category.code.includes(e.target.value);
        });
        break;
      case 'brand':
        filter = searchStorage.filter((product) => {
          return product.brand && product.brand.name.includes(e.target.value);
        });
        break;
      default:
        break;
    }

    setCurrentProducts(filter);
  };

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
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
              key={index}
              index={index}
              currentPage={currentPage}
              countPage={countPage}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
};
