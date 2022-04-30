import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../../../loader/Loader'
import { useToast } from '@chakra-ui/react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { checkDepartment } from './checkData'
import { Modal } from './modal/Modal'
import { Sort } from './serviceComponents/Sort'

export const Departments = () => {
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

  const [department, setDepartment] = useState({
    probirka: false,
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

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/services/department/register`,
        'POST',
        { ...department },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} bo'limi yaratildi!`,
        description: '',
        status: 'success',
      })
      getDepartments()
      setDepartment({
        probirka: false,
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
  }, [request, auth, notify, getDepartments, department, clearInputs])

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/services/department`,
        'PUT',
        { ...department },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} bo'limi yangilandi!`,
        description: '',
        status: 'success',
      })
      getDepartments()
      setDepartment({
        probirka: false,
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
  }, [request, auth, notify, getDepartments, department, clearInputs])

  const saveHandler = () => {
    if (checkDepartment(department)) {
      return notify(checkDepartment(department))
    }
    if (department._id) {
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
        `/api/services/department`,
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} bo'limi o'chirildi!`,
        description: '',
        status: 'success',
      })
      getDepartments()
      setModal(false)
      setDepartment({
        probirka: false,
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
  }, [auth, request, remove, notify, getDepartments, clearInputs])

  const deleteAll = useCallback(async () => {
    if (departments && departments.length === 0) {
      return notify({
        title: `Bo'limlar mavjud emas`,
        description: '',
        status: 'warning',
      })
    }
    try {
      const data = await request(
        `/api/services/department/deleteall`,
        'DELETE',
        { ...department },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      localStorage.setItem('delete', data)
      notify({
        title: `Barcha bo'limlar o'chirildi!`,
        description: '',
        status: 'success',
      })
      getDepartments()
      setModal1(false)
      setDepartment({
        probirka: false,
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
    getDepartments,
    clearInputs,
    department,
    departments,
  ])
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const checkHandler = (e) => {
    setDepartment({ ...department, probirka: e.target.checked })
  }

  const inputHandler = (e) => {
    setDepartment({ ...department, name: e.target.value })
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
    }
  }, [getDepartments, t])
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
                      <th className="w-25">Probirka</th>
                      <th className="w-25">Saqlash</th>
                      <th className="w-25">Bo'limlarni o'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          style={{ minWidth: '70px' }}
                          value={department.name}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="form-control w-75"
                          id="inputName"
                          placeholder="Bo'lim nomini kiriting"
                        />
                      </td>
                      <td>
                        <div className="custom-control custom-switch ">
                          <input
                            onKeyUp={keyPressed}
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch1"
                            checked={department.probirka && department.probirka}
                            onChange={checkHandler}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch1"
                          >
                            {department.probirka ? 'Probirkali' : 'Probirkasiz'}
                          </label>
                        </div>
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
                      <th className="">№</th>
                      <th className="w-25">
                        Nomi{'  '}
                        <Sort
                          data={departments}
                          setData={setDepartments}
                          property={'name'}
                        />
                      </th>
                      <th className="w-25">
                        Probirka{' '}
                        <Sort
                          data={departments}
                          setData={setDepartments}
                          property={'probirka'}
                        />
                      </th>
                      <th className="w-25">Tahrirlash</th>
                      <th className="w-25">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments &&
                      departments.map((d, key) => {
                        return (
                          <tr key={key}>
                            <td className="font-weight-bold">{key + 1}</td>
                            <td>{d.name}</td>
                            <td>{d.probirka ? 'Probirka' : ''}</td>
                            <td>
                              <button
                                onClick={() => setDepartment(d)}
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
                                  setRemove(d)
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
        text={"bo'limini o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />

      <Modal
        modal={modal1}
        setModal={setModal1}
        basic={'Barcha'}
        text={"bo'limlarni o'chirishni tasdiqlaysizmi?"}
        handler={deleteAll}
      />
    </>
  )
}
