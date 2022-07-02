import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
// import { Loader } from '../../../loader/Loader';
import { useToast } from '@chakra-ui/react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { ExcelTable } from './ProductsReport/ExcelTable';
import { TableHeader } from './ProductsReport/TableHeader';
import { TableHead } from './ProductsReport/TableHead';
import { TableRow } from './ProductsReport/TableRow';
import { ProductCheque } from './ProductsReport/ProductCheque';
import { useReactToPrint } from 'react-to-print';

export const ProductsReport = () => {
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentProducts, setCurrentProducts] = useState([]);

  //====================================================================
  // Notify
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

  const { request } = useHttp();
  const auth = useContext(AuthContext);

  //===================================================================
  //====================================================================
  const [productsCount, setProductsCount] = useState(0);
  const [search, setSearch] = useState({
    code: '',
    name: '',
  });
  const [sendingsearch, setSendingSearch] = useState({ code: '', name: '' });
  //====================================================================
  //====================================================================

  const [products, setProducts] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/getproducts`,
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
      setProducts(data.products);
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

  const [excelDatas, setExcelDatas] = useState([]);

  const getProductExcel = useCallback(async () => {
    try {
      const data = await request(
        '/api/products/product/getexceldata',
        'POST',
        {
          market: auth.market && auth.market._id,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setExcelDatas(data);
      document.getElementById('reacthtmltoexcel').click();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, sendingsearch]);

  //====================================================================
  //====================================================================

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const print = useCallback(() => {
    handlePrint();
  }, [handlePrint]);

  //====================================================================
  //====================================================================

  const [productCheques, setProductCheques] = useState([]);
  const [productChequesCount, setProductsChequesCount] = useState(1);
  const [productCheque, setProductCheque] = useState({
    index: 0,
    name: '',
    code: '',
    total: 0,
    unit: '',
    incomingprice: 0,
    sellingprice: 0,
  });

  const checkCheque = useCallback(() => {
    if (!productCheque.code) {
      return {
        title: 'Mahsulot kodi majburiy!',
        description: '',
        status: 'error',
      };
    }
    if (!productCheque.name) {
      return {
        title: 'Mahsulot nomi majburiy!',
        description: '',
        status: 'error',
      };
    }
    return false;
  }, [productCheque]);

  const addProductCheaques = useCallback(() => {
    if (checkCheque()) {
      return notify(checkCheque());
    }
    let arr = [];
    let count = 0;
    while (count !== productChequesCount) {
      arr.push(productCheque);
      count++;
    }
    setProductCheques(arr);
    setTimeout(() => {
      print();
      setProductCheque({
        index: 0,
      });
      setProductCheques([]);
      setProductsChequesCount(1);
    }, 1000);
  }, [productChequesCount, productCheque, print, checkCheque, notify]);

  const chooseProductCheque = (e, ind, val) => {
    let property = e.target.dataset.property;
    if (ind === productCheque.index) {
      if (productCheque[`${property}`]) {
        setProductCheque({
          ...productCheque,
          [property]: null,
        });
      } else {
        setProductCheque({
          ...productCheque,
          [property]: val,
        });
      }
    } else {
      setProductCheque({
        index: ind,
        [property]: val,
      });
    }
  };

  //====================================================================
  //====================================================================

  const printAllProducts = useCallback(
    (products) => {
      let arr = [];
      products.map((product, pos) => {
        let count = 0;
        let obj = {
          index: pos,
          name: product.productdata.name,
          code: product.productdata.code,
          total: product.total,
          sellingprice: product.price.sellingprice,
          unit: product.unit.name,
        };
        while (count !== productChequesCount) {
          arr.push(obj);
          count++;
        }
        return product;
      });
      setProductCheques(arr);
      print();
    },
    [print, productChequesCount]
  );

  const getProductsForPrint = useCallback(async () => {
    try {
      const data = await request(
        '/api/products/product/getexceldata',
        'POST',
        {
          market: auth.market && auth.market._id,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      printAllProducts(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, sendingsearch, printAllProducts]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // SEARCH
  const searchProducts = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'code') {
      const searching = searchStorage.filter((item) =>
        item.productdata.code.includes(e.target.value)
      );
      setCurrentProducts(searching);
    }
    if (e.target.name === 'name') {
      const searching = searchStorage.filter((item) =>
        item.productdata.name.includes(e.target.value)
      );
      setCurrentProducts(searching);
    }
  };

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch({ ...search });
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0);
      setCountPage(e.target.value);
      setCurrentProducts(products.slice(0, e.target.value));
    },
    [products]
  );

  //====================================================================
  //UseEffects
  useEffect(() => {
    getProducts();
  }, [getProducts, currentPage, countPage, sendingsearch]);

  return (
    <>
      {/* {loading ? <Loader /> : ''} */}
      <div className='overflow-x-auto'>
        <div className='m-3 min-w-[800px]'>
          <TableHeader
            search={search}
            currentPage={currentPage}
            setPageSize={setPageSize}
            changeHandler={searchProducts}
            keyPress={searchKeypress}
            countPage={countPage}
            setCurrentPage={setCurrentPage}
            productsCount={productsCount}
            getProductExcel={getProductExcel}
            getProductsForPrint={getProductsForPrint}
            setProductsChequesCount={setProductsChequesCount}
            productChequesCount={productChequesCount}
            productCheque={productCheque}
          />
          <TableHead
            currentProducts={currentProducts}
            setCurrentProducts={setCurrentProducts}
          />
          {currentProducts &&
            currentProducts.map((p, index) => {
              return (
                <TableRow
                  countPage={countPage}
                  p={p}
                  index={index}
                  currentPage={currentPage}
                  key={index}
                  productCheque={productCheque}
                  productChequesCount={productChequesCount}
                  setProductsChequesCount={setProductsChequesCount}
                  addProductCheaques={addProductCheaques}
                  chooseProductCheque={chooseProductCheque}
                />
              );
            })}
        </div>
      </div>
      <ExcelTable products={excelDatas} />
      <div className='hidden'>
        <ProductCheque
          productCheques={productCheques}
          componentRef={componentRef}
        />
      </div>
    </>
  );
};
