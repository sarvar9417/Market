import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../../../loader/Loader'
import { useToast } from '@chakra-ui/react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { checkAdver } from './checkData'
import { Modal } from './modal/Modal'
import { Sort } from './Sort'

export const Advers = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [remove, setRemove] = useState()

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

  const [adver, setAdver] = useState({
    clinica: auth.clinica && auth.clinica._id,
  })
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [advers, setAdvers] = useState()

  const getAdvers = useCallback(async () => {
    try {
      const data = await request(
        `/api/adver/adver/getall`,
        'POST',
        { clinica: auth.clinica._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      setAdvers(data)
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
        `/api/adver/adver/register`,
        'POST',
        { ...adver },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} reklamasi yaratildi!`,
        description: '',
        status: 'success',
      })
      getAdvers()
      setAdver({
        clinica: auth.clinica && auth.clinica._id,
      })
      clearInputs()
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, auth, notify, getAdvers, adver, clearInputs])

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/adver/adver`,
        'PUT',
        { ...adver },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} reklamasi yangilandi!`,
        description: '',
        status: 'success',
      })
      getAdvers()
      setAdver({
        clinica: auth.clinica && auth.clinica._id,
      })
      clearInputs()
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, auth, notify, getAdvers, adver, clearInputs])

  const saveHandler = () => {
    if (checkAdver(adver)) {
      return notify(checkAdver(adver))
    }
    if (adver._id) {
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
        `/api/adver/adver`,
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} reklamalari o'chirildi!`,
        description: '',
        status: 'success',
      })
      getAdvers()
      setModal(false)
      setAdver({
        clinica: auth.clinica && auth.clinica._id,
      })
      clearInputs()
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [auth, request, remove, notify, getAdvers, clearInputs])

  const deleteAll = useCallback(async () => {
    if (advers && advers.length === 0) {
      return notify({
        title: `Reklamalar mavjud emas`,
        description: '',
        status: 'warning',
      })
    }
    try {
      const data = await request(
        `/api/adver/adver/deleteall`,
        'DELETE',
        { ...adver },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      localStorage.setItem('delete', data)
      notify({
        title: `Barcha reklamalar o'chirildi!`,
        description: '',
        status: 'success',
      })
      getAdvers()
      setModal1(false)
      setAdver({
        clinica: auth.clinica && auth.clinica._id,
      })
      clearInputs()
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [auth, request, notify, getAdvers, clearInputs, adver, advers])
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setAdver({ ...adver, name: e.target.value })
  }

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [state, setState] = useState({})
  localStorage.setItem('state', state)
  useEffect(() => {
    getAdvers()
    return () => {
      setState({}) // This worked for me
    }
  }, [getAdvers])
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
                      <th className="w-25">Reklama nomi</th>
                      <th className="w-25">Saqlash</th>
                      <th className="w-25">Reklamalarni o'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          style={{ minWidth: '70px' }}
                          value={adver.name}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="form-control w-75"
                          id="inputName"
                          placeholder="Reklama nomini kiriting"
                        />
                      </td>
                      <td>
                        {loading ? <button className='btn btn-info' disabled>
                          <span class="spinner-border spinner-border-sm"></span>
                          Loading...
                        </button>
                          :
                        <button
                          onClick={saveHandler}
                          className="btn btn-info py-1 px-4"
                        >
                          Saqlash
                        </button>
                        }
                      </td>
                      <td>
                        {loading ? <button className='btn btn-danger' disabled>
                          <span class="spinner-border spinner-border-sm"></span>
                          Loading...
                        </button>
                          :
                        <button
                          onClick={() => setModal1(true)}
                          className="btn btn-danger py-0 px-4 pt-1"
                        >
                          <span className="icon-trash-2"></span>
                        </button>
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="table-container">
              <div className="table-responsive">
                <table className="table m-0 table-bordered table-sm">
                  <thead>
                    <tr>
                      <th scope='col' className="">№</th>
                      <th scope='col' className="w-25">
                        Nomi{'  '}
                        <Sort
                          data={advers}
                          setData={setAdvers}
                          property={'name'}
                        />
                      </th>
                      <th scope='col' className="w-25">Tahrirlash</th>
                      <th scope='col' className="w-25">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advers &&
                      advers.map((d, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-weight-bold border ">{key + 1}</td>
                            <td className='border'>{d.name}</td>
                            <td className='border'>
                              {loading ? <button className='btn btn-success' disabled>
                                <span class="spinner-border spinner-border-sm"></span>
                                Loading...
                              </button>
                                :
                              <button
                                onClick={() => setAdver(d)}
                                type="button"
                                className="btn btn-success py-1 px-2"
                                style={{ fontSize: '75%' }}
                              >
                                Tahrirlash
                              </button>
                              }
                            </td>
                            <td className='border'>
                              {loading ? <button className='btn btn-secondary' disabled>
                              <span class="spinner-border spinner-border-sm"></span>
                                Loading...
                              </button>
                                :
                              <button
                                onClick={() => {
                                  setRemove(d)
                                  setModal(true)
                                }}
                                type="button"
                                className="btn btn-secondary py-1 px-2"
                                style={{ fontSize: '75%' }}
                              >
                                O'chirish
                              </button>
                              }
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
        text={"reklamani o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />

      <Modal
        modal={modal1}
        setModal={setModal1}
        basic={'Barcha'}
        text={"reklamalarni o'chirishni tasdiqlaysizmi?"}
        handler={deleteAll}
      />
    </>
  )
}
