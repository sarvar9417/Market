import { useToast } from '@chakra-ui/react';
import { Modal } from '../products/modal/Modal';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { checkClient } from './checkData';
import { t } from 'i18next';
import { CreateClient } from './ClientComponents/CreateClient';
import { ClientTable } from './ClientComponents/ClientTable';

export const Client = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
  //====================================================================
  //====================================================================

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

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const { loading, request } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  //====================================================================

  const [client, setClient] = useState({
    market: auth.market && auth.market._id,
  });

  //====================================================================

  const changeHandler = (e) => {
    setClient({ ...client, name: e.target.value });
  };

  const selectHandler = (e) => {
    if (e.target.value === 'delete') {
      setClient({ ...client, packman: null });
    } else {
      setClient({ ...client, packman: e.target.value });
    }
  };

  const updateInputs = (client) => {
    setClient({
      market: auth.market && auth.market._id,
      ...client,
    });
    if (client.packman) {
      for (const option of document.getElementsByTagName('select')[0]) {
        if (option.value === client.packman._id) {
          option.selected = true;
        }
      }
    }
  };

  //====================================================================

  const clearInputs = useCallback(() => {
    setClient({
      market: auth.market && auth.market._id,
    });

    for (let option of document.getElementsByTagName('select')[0].options) {
      if (option.value === 'delete') {
        option.selected = true;
      }
    }
  }, [auth.market]);

  //====================================================================

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      return saveHandler();
    }
  };

  //====================================================================
  //====================================================================

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  };

  //====================================================================
  //====================================================================

  const [search, setSearch] = useState({
    client: '',
    packman: '',
  });
  const [sendingsearch, setSendingSearch] = useState({});

  const searchClient = (e) => {
    if (e.target.name === 'packman') {
      setSearch({ ...search, packman: e.target.value });

      const searching = searchStorage.filter(
        (item) =>
          item.packman &&
          item.packman.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCurrentClients(searching);
    }
    if (e.target.name === 'client') {
      setSearch({ ...search, client: e.target.value });

      const searching = searchStorage.filter(
        (item) =>
          item && item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCurrentClients(searching);
    }
  };

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
    }
  };

  //====================================================================
  //====================================================================

  const saveHandler = () => {
    if (checkClient(client)) {
      return notify(checkClient(client));
    }

    if (client._id) {
      return updateClient();
    } else {
      return createClient();
    }
  };

  const [clientsCount, setClientsCount] = useState(0);
  const [currentClients, setCurrentClients] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  const getClients = useCallback(async () => {
    try {
      const data = await request(
        '/api/sales/client/getclients',
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
      setSearchStorage(data.clients);
      setCurrentClients(data.clients);
      setClientsCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, notify, request, currentPage, countPage, sendingsearch]);

  const [packmans, setPackmans] = useState([]);

  const getPackmans = useCallback(async () => {
    try {
      const data = await request(
        '/api/sales/packman/getall',
        'POST',
        { market: auth.market && auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setPackmans(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [notify, auth, request]);

  const createClient = async () => {
    try {
      const data = await request(
        '/api/sales/client/register',
        'POST',
        { ...client },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      getClients();
      clearInputs();
      setClient({
        market: auth.market && auth.market._id,
      });
      notify({
        title: `${data.name} ${t('nomli mijoz yaratildi!')}`,
        description: '',
        status: 'success',
      });
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  };

  const updateClient = async () => {
    try {
      const data = await request(
        '/api/sales/client/update',
        'PUT',
        { ...client },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      getClients();
      clearInputs();
      setClient({
        market: auth.market && auth.market._id,
      });
      notify({
        title: `${data.name} ${t('nomli mijoz yangilandi!')}`,
        description: '',
        status: 'success',
      });
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  };

  const deleteClient = async () => {
    try {
      const data = await request(
        '/api/sales/client/delete',
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("nomli mijoz o'chirildi!")}`,
        description: '',
        status: 'success',
      });
      getClients();
      setRemove({
        market: auth.market && auth.market._id,
      });
      setModal(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  };

  useEffect(() => {
    getClients();
  }, [getClients, currentPage, countPage, sendingsearch]);

  const [n, setN] = useState(false);
  useEffect(() => {
    if (!n) {
      getPackmans();
      setN(true);
    }
  }, [getPackmans, n]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  return (
    <>
      <div className='overflow-x-auto'>
        <div className='m-3 min-w-[700px]'>
          <CreateClient
            client={client}
            keyPressed={keyPressed}
            changeHandler={changeHandler}
            saveHandler={saveHandler}
            clearInputs={clearInputs}
            loading={loading}
            packmans={packmans}
            selectHandler={selectHandler}
          />
          <ClientTable
            setPageSize={setPageSize}
            searchClient={searchClient}
            searchKeypress={searchKeypress}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            countPage={countPage}
            totalDatas={clientsCount}
            currentClients={currentClients}
            setCurrentClients={setCurrentClients}
            setClient={setClient}
            setRemove={setRemove}
            setModal={setModal}
            updateInputs={updateInputs}
          />
        </div>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={t("yetkazuvchini o'chirishni tasdiqlaysizmi?")}
        handler={deleteClient}
      />
    </>
  );
};
