import { useToast } from '@chakra-ui/react';
import { t } from 'i18next';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { Loader } from '../../../loader/Loader';
import { Modal } from '../products/modal/Modal';
import { checkExpense } from './Expense/checkExpense';
import { CreateExpense } from './Expense/CreateExpense';
import { TableExpense } from './Expense/TableExpense';

export const Expense = ({ changeAbleDelete }) => {
  //========================================================
  //========================================================

  const [isAbleDelete, setIsAbleDelete] = useState(() =>
    changeAbleDelete === 'delete' ? false : true
  );

  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();

  //========================================================
  //========================================================

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

  const selectRef = useRef();

  const clearInputs = () => {
    // selectRef.current.selectOption({
    //   label: 'Xarajat turi',
    //   value: 'delete',
    // });
    // const inputs = document.getElementsByTagName('input');
    // for (const input of inputs) {
    //   input.value = '';
    // }
    setExpense({
      sum: 0,
      comment: '',
      type: '',
      market: auth.market._id,
    });
  };

  //========================================================
  //========================================================

  const [startDate, setStartDate] = useState(
    new Date(new Date().setUTCMonth(new Date().getMonth() - 1)).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const [modal, setModal] = useState(false);

  //========================================================
  //========================================================

  const [expense, setExpense] = useState({
    sum: 0,
    type: '',
    comment: '',
    market: auth.market._id,
  });

  const [deletedData, setDeletedData] = useState({});

  const inputHandler = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const changeType = (e) => {
    if (e.value === 'delete') {
      setExpense({ ...expense, type: null });
    }
    setExpense({ ...expense, type: e.value });
  };

  //========================================================
  //========================================================

  const [expensesData, setExpensesData] = useState([]);
  const [expenseCount, setExpenseCount] = useState(0);

  const getExpense = useCallback(async () => {
    try {
      const data = await request(
        '/api/expense/get',
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
      setExpensesData(data.expenses);
      setExpenseCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [notify, auth, request, currentPage, countPage, startDate, endDate]);

  //========================================================
  //========================================================

  const createExpense = async () => {
    try {
      const data = await request(
        '/api/expense/register',
        'POST',
        {
          currentPage,
          countPage,
          startDate,
          endDate,
          expense,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.comment} ${t('xarajati yaratildi!')}`,
        description: '',
        status: 'success',
      });
      setExpensesData([{ ...data }, ...expensesData]);
      setExpenseCount((prev) => prev + 1);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  };

  const deleteExpense = async () => {
    try {
      const data = await request(
        '/api/expense/delete',
        'DELETE',
        {
          _id: deletedData._id,
          market: deletedData.market,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.comment} ${t("xarajati o'chirildi!")}`,
        description: '',
        status: 'success',
      });
      getExpense();
      setDeletedData({});
      setModal(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  };

  //========================================================
  //========================================================

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      return createExpense();
    }
  };

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  };

  const changeDate = (e) => {
    e.target.name === 'startDate'
      ? setStartDate(
          new Date(
            new Date(e.target.value).setUTCHours(0, 0, 0, 0)
          ).toISOString()
        )
      : setEndDate(new Date(e.target.value).toISOString());
  };

  //========================================================
  //========================================================

  const saveHandler = () => {
    if (checkExpense(expense, t)) {
      return notify(checkExpense(expense, t));
    }

    return createExpense();
  };

  //========================================================
  //========================================================

  useEffect(() => {
    getExpense();
  }, [getExpense, currentPage, countPage, startDate, endDate]);

  useEffect(() => {
    setIsAbleDelete(() => (changeAbleDelete === 'delete' ? false : true));
  }, [changeAbleDelete]);

  //========================================================
  //========================================================

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className='m-3 p-4'>
        <div className={`mb-4 ${isAbleDelete ? '' : 'hidden'}`}>
          <CreateExpense
            expense={expense}
            keyPressed={keyPressed}
            inputHandler={inputHandler}
            loading={loading}
            changeType={changeType}
            selectRef={selectRef}
            createExpense={saveHandler}
            clearInputs={clearInputs}
          />
        </div>
        <div>
          <TableExpense
            currentPage={currentPage}
            setPageSize={setPageSize}
            countPage={countPage}
            setCurrentPage={setCurrentPage}
            dataCount={expenseCount}
            // getExpenseExcel={getExpenseExcel}
            expensesData={expensesData}
            setExpensesData={setExpensesData}
            setDeletedData={setDeletedData}
            setModal={setModal}
            changeDate={changeDate}
            loading={loading}
            startDate={startDate}
            endDate={endDate}
            deleteExpense={deleteExpense}
            isAbleDelete={isAbleDelete}
          />
        </div>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={'Xarajatni'}
        text={t("o'chirishni tasdiqlaysizmi?")}
        handler={deleteExpense}
      />
    </>
  );
};
