import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './Invertories/TableHead';
import { TableHeader } from './Invertories/TableHeader';
import { Rows } from './Invertories/Rows';
import { Print } from './Print';
import { ExcelTable } from './ExcelTable';

export const Inventories = () => {
  // ===========================================================
  // STATES
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentConnectors, setCurrentConnectors] = useState([]);

  const [connectorsCount, setConnectorsCount] = useState(0);

  const [inventories, setInventories] = useState([]);
  const [inventoriesConnector, setInventoriesConnector] = useState({});

  // SearchData
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());

  //Context
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  // const history = useHistory();
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
  const getConnectors = useCallback(async () => {
    try {
      const data = await request(
        `/api/inventory/connectors`,
        'POST',
        {
          market: auth.market._id,
          currentPage,
          countPage,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrentConnectors(data.connectors);
      setConnectorsCount(data.count);
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
    setCurrentConnectors,
    currentPage,
    countPage,
    startDate,
    endDate,
  ]);

  const getInventories = useCallback(
    async (e) => {
      try {
        const data = await request(
          `/api/inventory/inventories`,
          'POST',
          {
            market: auth.market._id,
            id: e,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setInventories(data.inventories);
        setInventoriesConnector(data.inventoriesConnector);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify]
  );

  const getInventoriesExcel = useCallback(
    async (e) => {
      try {
        const data = await request(
          `/api/inventory/inventories`,
          'POST',
          {
            market: auth.market._id,
            id: e,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        console.log(data);
        setInventories(data.inventories);
        setInventoriesConnector(data.inventoriesConnector);
        document.getElementById('reacthtmltoexcel').click();
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify]
  );

  // HANDLERS
  const setPageSize = useCallback((e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  }, []);

  const changeDate = (e) => {
    e.target.name === 'startDate'
      ? setStartDate(
          new Date(new Date(e.target.value).setHours(0, 0, 0, 0)).toISOString()
        )
      : setEndDate(
          new Date(
            new Date(e.target.value).setHours(23, 59, 59, 0)
          ).toISOString()
        );
  };

  // ==========================================================
  // Print

  const [visible, setVisible] = useState(false);
  const changePrint = (e) => {
    getInventories(e);
    setVisible(true);
  };

  // ==========================================================
  // USEEFFECTS
  useEffect(() => {
    getConnectors();
  }, [getConnectors, countPage, currentPage, startDate, endDate]);

  return (
    <div className='overflow-x-auto'>
      <div className={visible ? '' : 'hidden'}>
        <Print
          setCheck={setVisible}
          inventories={inventories}
          inventoriesConnector={inventoriesConnector}
        />
      </div>
      <div className='m-3 min-w[990px]'>
        <TableHeader
          changeDate={changeDate}
          startDate={startDate}
          endDate={endDate}
          countPage={countPage}
          currentPage={currentPage}
          setCurrentPage={setCountPage}
          setPageSize={setPageSize}
          connectorsCount={connectorsCount}
        />
        <TableHead />
        {currentConnectors.map((connector, index) => {
          return (
            <Rows
              getInventoriesExcel={getInventoriesExcel}
              getInventories={getInventories}
              countPage={countPage}
              key={index}
              index={index}
              currentPage={currentPage}
              connector={connector}
              changePrint={changePrint}
            />
          );
        })}
      </div>

      <ExcelTable datas={inventories} />
    </div>
  );
};
