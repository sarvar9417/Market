import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../../../loader/Loader'
import { useToast } from '@chakra-ui/react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { checkExchangerate } from './checkData'
import { Modal } from './modal/Modal'
import { Sort } from './serviceComponents/Sort'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

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
                  <thead>
                    <tr>
                      <th className="w-25 text-center">Kursni kiriting</th>
                      <th className="w-25 text-center">Saqlash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tex-center">
                        <input
                          style={{ minWidth: '70px' }}
                          name="exchangerate"
                          value={exchangerate.exchangerate || ''}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="form-control w-75 py-0"
                          id="exchangerate"
                          placeholder="Valyuta kursini kiriting"
                        />
                      </td>
                      <td className="text-center">
                        {loading ? (
                          <button className="btn btn-info" disabled>
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={saveHandler}
                            className="btn btn-info py-1 px-4 "
                          >
                            Saqlash
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
                    <tr>
                      <th>№</th>
                      <th className="w-25">
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
                      <th className="w-25">
                        Kurs{' '}
                        <Sort
                          data={exchangerates}
                          setData={setExchangerates}
                          property={'exchangerate'}
                        />
                      </th>
                      <th className="w-25">Tahrirlash</th>
                      <th className="w-25">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exchangerates &&
                      exchangerates.map((s, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-weight-bold">{key + 1}</td>
                            <td>
                              {new Date(s.createdAt).toLocaleDateString()}
                            </td>
                            <td>{s.exchangerate}</td>
                            <td>
                              <button
                                onClick={() => setExchangerate(s)}
                                className="btn btn-success py-1 px-2"
                                style={{ fontSize: '75%' }}
                              >
                                Tahrirlash
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setRemove({ ...remove, ...s })
                                  setModal(true)
                                }}
                                className="btn btn-secondary py-1 px-2"
                                style={{ fontSize: '75%' }}
                              >
                                O'chirish
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
