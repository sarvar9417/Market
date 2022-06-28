import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from '@chakra-ui/react';
import { t } from 'i18next';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { FileUpload } from '../../../loginAndRegister/fileUpLoad/FileUpload';
import { FilialTable } from './filialComponents/FilialTable';
import { Rows } from './filialComponents/Rows';

const styleDefault = {
  border: '1.5px solid #eee',
  boxShadow: 'none',
  height: '32px',
};

const styleGreen = {
  border: '1.5px solid #38B2AC',
  boxShadow: 'none',
  height: '32px',
};

export const Filials = () => {
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

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  //====================================================================
  //====================================================================

  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);
  const [load, setLoad] = useState(false);
  const [isHide, setIsHide] = useState(false);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [baseUrl, setBaseUrl] = useState();

  const getBaseUrl = useCallback(async () => {
    try {
      const data = await request('/api/baseurl', 'GET', null);
      setBaseUrl(data.baseUrl);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, notify]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [branch, setBranch] = useState({
    name: '',
    organitionName: '',
    image: null,
    phone1: '',
    phone2: '',
    phone3: '',
    bank: '',
    inn: '',
    bankNumber: '',
    address: '',
    orientation: '',
  });
  const [searchingEl, setSearchingEl] = useState('');

  const editHandler = (e) => {
    setIsHide(true);
    setBranch({ ...e, market: e.market._id });
  };

  const changeHandler = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  // clearInputs()

  //====================================================================
  //====================================================================

  const [branches, setBranches] = useState([]);
  const [currentBranch, setCurrentBranch] = useState([]);
  const [branchCount, setBranchCount] = useState(0);

  const getBranches = useCallback(
    async (searched) => {
      try {
        const data = await request(
          '/api/branch/getall',
          'POST',
          {
            market: auth.market._id,
            countPage,
            currentPage,
            searching: searched,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setBranchCount(data.count);
        setBranches(data.branches);
        setCurrentBranch(data.branches);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [auth, request, notify, countPage, currentPage]
  );

  const updateHandler = async () => {
    try {
      const data = await request(
        '/api/branch/update',
        'PUT',
        {
          branch: { ...branch },
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      getBranches('');
      setBranch({});
      notify({
        title: `${data.name} ${t("filiali yangilandi!")}`,
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

  //====================================================================
  //====================================================================

  const handleImage = async (e) => {
    if (branch.image) {
      return notify({
        title: t('Diqqat! Surat avval yuklangan'),
        description:
          t("Suratni qayta yuklash uchun suratni ustiga bir marotaba bosib uni o'chiring!"),
        status: 'error',
      });
    }
    const files = e.target.files[0];
    const data = new FormData();
    data.append('file', files);
    setLoad(true);
    const res = await fetch('/api/upload', { method: 'POST', body: data });
    const file = await res.json();
    setBranch({ ...branch, image: file.filename });
    setLoad(false);
    notify({
      status: 'success',
      description: '',
      title: t('Surat muvaffaqqiyatli yuklandi'),
    });
  };

  const removeImage = async (filename) => {
    try {
      const data = await request(`/api/upload/del`, 'POST', { filename });
      setBranch({ ...branch, image: null });
      document.getElementById('default-btn').value = null;
      notify({
        status: 'success',
        description: '',
        title: data.accept,
      });
    } catch (error) {
      notify({
        status: 'error',
        description: '',
        title: error,
      });
    }
  };

  //====================================================================
  //====================================================================

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      return updateHandler();
    }
  };

  const searchKeyPressed = (e) => {
    if (e.key === 'Enter') {
      return getBranches(searchingEl);
    }
  };

  //====================================================================
  //====================================================================
  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0);
      setCountPage(e.target.value);
      setCurrentBranch(branches.slice(0, e.target.value));
    },
    [branches]
  );

  const searchName = (e) => {
    setSearchingEl(e.target.value);
    const searched = branches.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCurrentBranch(searched);
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  useEffect(() => {
    getBranches();
  }, [currentPage, countPage, getBranches]);

  const [n, setN] = useState(false);
  useEffect(() => {
    if (!n) {
      setN(true);
      getBaseUrl();
    }
  }, [getBaseUrl, n]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  return (
    <div>
      <div className='m-3 px-2'>
        <button
          className='w-full bg-blue-800 font-bold text-white py-1 rounded'
          onClick={() => setIsHide(!isHide)}>
          {t("Tahrirlash")}
        </button>
        <div className={`${isHide ? 'row g-3 ' : 'd-none'}`}>
          <div className='col-md-6'>
            <div className='col-md-12'>
              <FormControl isRequired>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t("Filial nomi")}
                </FormLabel>
                <Input
                  onKeyUp={keyPressed}
                  className='is-valid'
                  placeholder={t('Filial nomini kiriting')}
                  size='sm'
                  style={
                    branch.name && branch.name.length > 0
                      ? styleGreen
                      : styleDefault
                  }
                  onChange={changeHandler}
                  name='name'
                  value={(branch.name && branch.name) || ''}
                />
              </FormControl>
            </div>
            <div className='col-md-12'>
              <FormControl>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t('Tashkilot nomi')}
                </FormLabel>
                <Input
                  onKeyUp={keyPressed}
                  placeholder={t('Tashkilot nomini kiriting')}
                  size='sm'
                  style={
                    branch.organitionName && branch.organitionName.length > 0
                      ? styleGreen
                      : styleDefault
                  }
                  name='organitionName'
                  onChange={changeHandler}
                  value={(branch.organitionName && branch.organitionName) || ''}
                />
              </FormControl>
            </div>
            <div className='col-md-12'>
              <FormControl>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t('Manzil')}
                </FormLabel>
                <Input
                  onKeyUp={keyPressed}
                  placeholder={t('Manzilni kiriting')}
                  size='sm'
                  style={
                    branch.address && branch.address.length > 0
                      ? styleGreen
                      : styleDefault
                  }
                  name='address'
                  onChange={changeHandler}
                  value={(branch.address && branch.address) || ''}
                />
              </FormControl>
            </div>
            <div className='col-md-12'>
              <FormControl>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t("Mo'ljal")}
                </FormLabel>
                <Input
                  onKeyUp={keyPressed}
                  placeholder={t("Mo'ljalni kiriting")}
                  size='sm'
                  style={
                    branch.orientation && branch.orientation.length > 0
                      ? styleGreen
                      : styleDefault
                  }
                  name='orientation'
                  onChange={changeHandler}
                  value={(branch.orientation && branch.orientation) || ''}
                />
              </FormControl>
            </div>
            <div className='col-md-12'>
              <FormControl isRequired>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t('Telefon raqam1')}
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    children='+998'
                    style={
                      branch.phone1 && branch.phone1.length > 0
                        ? styleGreen
                        : styleDefault
                    }
                  />
                  <Input
                    onKeyUp={keyPressed}
                    type='tel'
                    placeholder={t('Telefon raqamni kiriting')}
                    size='sm'
                    style={
                      branch.phone1 && branch.phone1.length > 0
                        ? styleGreen
                        : styleDefault
                    }
                    name='phone1'
                    onChange={changeHandler}
                    value={(branch.phone1 && branch.phone1) || ''}
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className='col-md-12'>
              <FormControl>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t('Telefon raqam2')}
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    children='+998'
                    style={
                      branch.phone2 && branch.phone2.length > 0
                        ? styleGreen
                        : styleDefault
                    }
                  />
                  <Input
                    onKeyUp={keyPressed}
                    type='tel'
                    placeholder={t('Telefon raqamni kiriting')}
                    size='sm'
                    style={
                      branch.phone2 && branch.phone2.length > 0
                        ? styleGreen
                        : styleDefault
                    }
                    name='phone2'
                    onChange={changeHandler}
                    value={(branch.phone2 && branch.phone2) || ''}
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className='col-md-12'>
              <FormControl>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t('Telefon raqam3')}
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    children='+998'
                    style={
                      branch.phone3 && branch.phone3.length > 0
                        ? styleGreen
                        : styleDefault
                    }
                  />
                  <Input
                    onKeyUp={keyPressed}
                    type='tel'
                    placeholder={t('Telefon raqamni kiriting')}
                    size='sm'
                    style={
                      branch.phone3 && branch.phone3.length > 0
                        ? styleGreen
                        : styleDefault
                    }
                    name='phone3'
                    onChange={changeHandler}
                    value={(branch.phone3 && branch.phone3) || ''}
                  />
                </InputGroup>
              </FormControl>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='col-md-12'>
              <FormControl>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t('Bank nomi')}
                </FormLabel>
                <Input
                  onKeyUp={keyPressed}
                  placeholder={t('Bank nomini kiriting')}
                  size='sm'
                  style={
                    branch.bank && branch.bank.length > 0
                      ? styleGreen
                      : styleDefault
                  }
                  name='bank'
                  onChange={changeHandler}
                  value={(branch.bank && branch.bank) || ''}
                />
              </FormControl>
            </div>
            <div className='col-md-12'>
              <FormControl>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t('INN')}
                </FormLabel>
                <Input
                  onKeyUp={keyPressed}
                  type='number'
                  placeholder={t('INN ni kiriting')}
                  size='sm'
                  style={
                    branch.inn && branch.inn.length > 0
                      ? styleGreen
                      : styleDefault
                  }
                  name='inn'
                  onChange={changeHandler}
                  value={(branch.inn && branch.inn) || 0}
                />
              </FormControl>
            </div>
            <div className='col-md-12'>
              <FormControl>
                <FormLabel style={{ color: '#38B2AC', marginTop: '1rem' }}>
                  {t('Hisob raqam')}
                </FormLabel>
                <Input
                  onKeyUp={keyPressed}
                  type='number'
                  placeholder={t('Hisob raqamni kiriting')}
                  size='sm'
                  style={
                    branch.bankNumber && branch.bankNumber.length > 0
                      ? styleGreen
                      : styleDefault
                  }
                  name='bankNumber'
                  onChange={changeHandler}
                  value={(branch.bankNumber && branch.bankNumber) || 0}
                />
              </FormControl>
            </div>
            <FormControl isRequired>
              <FileUpload
                removeImage={removeImage}
                handleImage={handleImage}
                load={load}
                img={branch.image}
                imgUrl={
                  baseUrl &&
                  branch.image &&
                  `${baseUrl}/api/upload/file/${branch.image}`
                }
              />
            </FormControl>
          </div>

          <div className='col-md-6 text-center mt-4'>
            {loading || load ? (
              <Button isLoading colorScheme='teal' variant='solid'></Button>
            ) : (
              <Button
                colorScheme='teal'
                variant='solid'
                onClick={updateHandler}>
                {t('Tahrirlash')}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className='m-3'>
        <FilialTable
          setPageSize={setPageSize}
          branchInputChange={searchName}
          setData={setCurrentBranch}
          currentData={currentBranch}
          countPage={countPage}
          setCurrentPage={setCurrentPage}
          totalDatas={branchCount}
          keyPressed={searchKeyPressed}
        />
        {currentBranch &&
          currentBranch.map((item, index) => (
            <Rows
              key={index}
              data={item}
              currentPage={currentPage}
              index={index}
              loading={loading}
              editHandler={editHandler}
            />
          ))}
      </div>
    </div>
  );
};
