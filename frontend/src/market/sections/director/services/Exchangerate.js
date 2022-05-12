import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../../../loader/Loader'
import { useToast } from '@chakra-ui/react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { checkExchangerate } from './checkData'
import { Modal } from './modal/Modal'
import { Sort } from './productComponents/Sort'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faFloppyDisk, faRepeat, faPenAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const Exchangerate = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false)

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName('input')
    for (const input of inputs) {
      input.value = ''
    }
  }, [])
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const toast = useToast()

  const notify = useCallback(
    (data) => {
      toast({
        title: data.title && data.title,
        description: data.description && data.description,
        status: data.status && data.status,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
    },
    [toast],
  )
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const { request, loading } = useHttp()
  const auth = useContext(AuthContext)

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  })

  const [exchangerate, setExchangerate] = useState({
    market: auth.market && auth.market._id,
  })
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [exchangerates, setExchangerates] = useState([])

  const getExchangerates = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      setExchangerates(data)
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, auth, notify])
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/register`,
        'POST',
        { ...exchangerate },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      localStorage.setItem('data', data)
      notify({
        title: `Valyuta kursi yaratildi!`,
        description: '',
        status: 'success',
      })
      getExchangerates()
      setExchangerate({
        market: auth.market && auth.market._id,
      })
      clearInputs()
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, auth, notify, getExchangerates, exchangerate, clearInputs])

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/update`,
        'PUT',
        { ...exchangerate },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      localStorage.setItem('data', data)
      notify({
        title: `Valyuta kursi yangilandi!`,
        description: '',
        status: 'success',
      })
      getExchangerates()
      setExchangerate({
        market: auth.market && auth.market._id,
      })
      clearInputs()
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, auth, notify, getExchangerates, exchangerate, clearInputs])

  const saveHandler = () => {
    if (checkExchangerate(exchangerate)) {
      return notify(checkExchangerate(exchangerate))
    }
    if (exchangerate._id) {
      return updateHandler()
    } else {
      return createHandler()
    }
  }

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      return saveHandler()
    }
  }

  const deleteHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/delete`,
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      localStorage.setItem('data', data)
      notify({
        title: `Valyuta kursi o'chirildi!`,
        description: '',
        status: 'success',
      })
      getExchangerates()
      setModal(false)
      setExchangerate({
        market: auth.market && auth.market._id,
      })
      clearInputs()
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [auth, request, remove, notify, getExchangerates, clearInputs])
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setExchangerate({ ...exchangerate, exchangerate: e.target.value })
  }

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [t, setT] = useState()
  useEffect(() => {
    if (!t) {
      setT(1)
      getExchangerates()
    }
  }, [getExchangerates, t])
  //====================================================================
  //====================================================================

  return (
    <>
      {loading ? <Loader /> : ''}
      <div className="content-wrapper px-lg-5 px-3">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="table-container">
              <div className="table-responsive">
                <table className="table m-0">
                  <thead className='border'>
                    <tr>
                      <th className="border text-center">Kursni kiriting</th>
                      <th className="border text-center">Saqlash</th>
                      <th className="border text-center">Tozalash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border text-center">
                        <input
                          name="exchangerate"
                          value={exchangerate.exchangerate || ''}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="number"
                          className="focus:outline-none focus:ring focus:border-blue-500 rounded py-1 px-3"
                          id="exchangerate"
                          placeholder="Valyuta kursini kiriting"
                        />
                      </td>
                      <td className="text-center border">
                        {loading ? (
                          <button className="btn btn-info" disabled>
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={saveHandler}
                            className="btn btn-success py-1 px-4 text-base"
                          >
                            <FontAwesomeIcon className='text-base' icon={faFloppyDisk}/>
                          </button>
                        )}
                      </td>
                      <td className="text-center border">
                        {loading ? (
                          <button className="btn btn-info" disabled>
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={clearInputs}
                            className="btn btn-secondary py-1 px-4 text-base"
                          >
                            <FontAwesomeIcon className='text-base' icon={faRepeat}/>
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="table-container">
              <div className="table-responsive">
                <table className="table m-0">
                  <thead>
                    <tr className='border text-center'>
                      <th className='border text-center'>№</th>
                      <th className="border text-center">
                        Sana
                        <div className="btn-group-vertical ml-2">
                          <FontAwesomeIcon
                            onClick={() =>
                              setExchangerates(
                                [...exchangerates].sort((a, b) =>
                                  a.createdAt > b.createdAt ? 1 : -1,
                                ),
                              )
                            }
                            icon={faAngleUp}
                            style={{ cursor: 'pointer' }}
                          />
                          <FontAwesomeIcon
                            icon={faAngleDown}
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              setExchangerates(
                                [...exchangerates].sort((a, b) =>
                                  b.createdAt > a.createdAt ? 1 : -1,
                                ),
                              )
                            }
                          />
                        </div>
                      </th>
                      <th className="border text-center">
                        Kurs{' '}
                        <Sort
                          data={exchangerates}
                          setData={setExchangerates}
                          property={'exchangerate'}
                        />
                      </th>
                      <th className="border text-center">Tahrirlash</th>
                      <th className="border text-center">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exchangerates &&
                      exchangerates.map((s, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-bold text-bold border text-center text-black">{key + 1}</td>
                            <td className='font-bold text-bold border text-center text-black'>
                              {new Date(s.createdAt).toLocaleDateString()}
                            </td>
                            <td className="font-bold text-bold border text-center text-black">
                              1 $ - {s.exchangerate} so'm
                            </td>
                            <td className='border text-center text-base'>
                              <button
                                onClick={() => setExchangerate(s)}
                                className="btn btn-success py-1 px-4"
                              >
                                <FontAwesomeIcon className='text-base' icon={faPenAlt}/>
                              </button>
                            </td>
                            <td className='border text-center'>
                              <button
                                onClick={() => {
                                  setRemove({ ...remove, ...s })
                                  setModal(true)
                                }}
                                className="btn btn-secondary py-1 px-4"
                                
                              >
                                <FontAwesomeIcon className='text-base' icon={faTrashCan}/>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={"valyuta kursini o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />
    </>
  )
}
