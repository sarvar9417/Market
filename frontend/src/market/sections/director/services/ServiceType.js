import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../../../loader/Loader'
import { useToast } from '@chakra-ui/react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { checkServiceType } from './checkData'
import { Modal } from './modal/Modal'
import { Sort } from './serviceComponents/Sort'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

export const ServiceType = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [remove, setRemove] = useState()

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName('input')
    document.getElementsByTagName('select')[0].selectedIndex = 0
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

  const [servicetype, setServiceType] = useState({
    clinica: auth.clinica && auth.clinica._id,
  })
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [departments, setDepartments] = useState()

  const getDepartments = useCallback(async () => {
    try {
      const data = await request(
        `/api/services/department/getall`,
        'POST',
        { clinica: auth.clinica._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      setDepartments(data)
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
  const [servicetypes, setServiceTypes] = useState()

  const getServiceType = useCallback(async () => {
    try {
      const data = await request(
        `/api/services/servicetype/getall`,
        'POST',
        { clinica: auth.clinica._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      setServiceTypes(data)
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
        `/api/services/servicetype/register`,
        'POST',
        { ...servicetype },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} xizmat turi yaratildi!`,
        description: '',
        status: 'success',
      })
      getServiceType()
      setServiceType({
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
  }, [request, auth, notify, getServiceType, servicetype, clearInputs])

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/services/servicetype/update`,
        'PUT',
        { ...servicetype },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} xizmati yangilandi!`,
        description: '',
        status: 'success',
      })
      getServiceType()
      setServiceType({
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
  }, [request, auth, notify, getServiceType, servicetype, clearInputs])

  const saveHandler = () => {
    if (checkServiceType(servicetype)) {
      return notify(checkServiceType(servicetype))
    }
    if (servicetype._id) {
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
        `/api/services/servicetype`,
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} nomli xizmat turi o'chirildi!`,
        description: '',
        status: 'success',
      })
      getServiceType()
      setModal(false)
      setServiceType({
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
  }, [auth, request, remove, notify, getServiceType, clearInputs])

  const deleteAll = useCallback(async () => {
    if (servicetypes && servicetypes.length === 0) {
      return notify({
        title: `Xizmat turlari mavjud emas`,
        description: '',
        status: 'warning',
      })
    }
    try {
      const data = await request(
        `/api/services/servicetype/deleteall`,
        'DELETE',
        { ...servicetype },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      localStorage.setItem('delete', data)
      notify({
        title: `Barcha xizmat turlari o'chirildi!`,
        description: '',
        status: 'success',
      })
      getServiceType()
      setModal1(false)
      setServiceType({
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
  }, [
    auth,
    request,
    notify,
    getServiceType,
    clearInputs,
    servicetype,
    servicetypes,
  ])
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const checkHandler = (e) => {
    setServiceType({ ...servicetype, department: e.target.value })
  }

  const inputHandler = (e) => {
    setServiceType({ ...servicetype, name: e.target.value })
  }

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [t, setT] = useState()
  useEffect(() => {
    if (!t) {
      setT(1)
      getDepartments()
      getServiceType()
    }
  }, [getDepartments, getServiceType, t])
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
                      <th className="w-25">Bo'lim nomi</th>
                      <th className="w-25">Xizmat turi</th>
                      <th className="w-25">Saqlash</th>
                      <th className="w-25">Barcha xizmatlarni o'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select
                          style={{ minWidth: '70px', maxWidth: '200px' }}
                          className="form-control form-control-sm selectpicker"
                          placeholder="Bo'limni tanlang"
                          onChange={checkHandler}
                        >
                          <option>Bo'limni tanlang</option>
                          {departments &&
                            departments.map((department, index) => {
                              return (
                                <option value={department._id}>
                                  {department.name}
                                </option>
                              )
                            })}
                        </select>
                      </td>
                      <td>
                        <input
                          style={{ minWidth: '70px' }}
                          name="name"
                          value={servicetype.name}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="form-control w-75 py-0"
                          id="name"
                          placeholder="Xizmat nomini kiriting"
                        />
                      </td>
                      <td>
                        {loading ? (
                          <button className="btn btn-info" disabled>
                            <span class="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={saveHandler}
                            className="btn btn-info py-1 px-4"
                          >
                            Saqlash
                          </button>
                        )}
                      </td>
                      <td>
                        {loading ? (
                          <button className="btn btn-danger" disabled>
                            <span class="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={() => setModal1(true)}
                            className="btn btn-danger py-0 px-4 pt-1"
                          >
                            <span className="icon-trash-2"></span>
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
                        Bo'limi{'  '}
                        <div className="btn-group-vertical ml-2">
                          <FontAwesomeIcon
                            onClick={() =>
                              setServiceTypes(
                                [...servicetypes].sort((a, b) =>
                                  a.department.name > b.department.name
                                    ? 1
                                    : -1,
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
                              setServiceTypes(
                                [...servicetypes].sort((a, b) =>
                                  b.department.name > a.department.name
                                    ? 1
                                    : -1,
                                ),
                              )
                            }
                          />
                        </div>
                      </th>
                      <th className="w-25">
                        Xizmat turi{' '}
                        <Sort
                          data={servicetypes}
                          setData={setServiceTypes}
                          property={'name'}
                        />
                      </th>
                      <th className="w-25">Tahrirlash</th>
                      <th className="w-25">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicetypes &&
                      servicetypes.map((s, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-weight-bold">{key + 1}</td>
                            <td>{s.department.name}</td>
                            <td>{s.name}</td>
                            <td>
                              <button
                                onClick={() => {
                                  const index = departments.findIndex(
                                    (d) => s.department._id === d._id,
                                  )
                                  document.getElementsByTagName(
                                    'select',
                                  )[0].selectedIndex = index + 1
                                  setServiceType(s)
                                }}
                                type="button"
                                className="btn btn-success py-1 px-2"
                                style={{ fontSize: '75%' }}
                              >
                                Tahrirlash
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setRemove(s)
                                  setModal(true)
                                }}
                                type="button"
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
        text={"xizmat turini o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />

      <Modal
        modal={modal1}
        setModal={setModal1}
        basic={'Barcha'}
        text={"xizmat turlarini o'chirishni tasdiqlaysizmi?"}
        handler={deleteAll}
      />
    </>
  )
}
