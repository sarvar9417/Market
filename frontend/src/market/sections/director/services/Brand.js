import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../../../loader/Loader'
import { useToast } from '@chakra-ui/react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { checkBrand } from './checkData'
import { Modal } from './modal/Modal'
import { Sort } from '../adver/Sort'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faPenAlt, faRepeat, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const Brand = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false)

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

  const [brand, setBrand] = useState({
    market: auth.market && auth.market._id,
  })
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const clearInputs = useCallback(() => {
    setBrand({
      market: auth.market && auth.market._id,
    })
  }, [auth.market])

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [brands, setBrands] = useState([])

  const getBrands = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      setBrands(data)
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
        `/api/products/brand/register`,
        'POST',
        { ...brand },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} brand yaratildi!`,
        description: '',
        status: 'success',
      })
      let c = [...brands]
      c.unshift({ ...data })
      setBrands([...c])
      setBrand({
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
  }, [request, auth, notify, setBrands, brand, clearInputs, brands])

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/update`,
        'PUT',
        { ...brand },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} brand yangilandi!`,
        description: '',
        status: 'success',
      })
      let index = brands.findIndex((bran) => { return brand._id === bran._id })
      let c = [...brands]
      c.splice(index, 1, { ...data })
      setBrands([...c])
      setBrand({
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
  }, [request, auth, notify, setBrands, brand, clearInputs, brands])

  const saveHandler = () => {
    if (checkBrand(brand)) {
      return notify(checkBrand(brand))
    }
    if (brand._id) {
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
        `/api/products/brand/delete`,
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      notify({
        title: `${data.name} nomli brand o'chirildi!`,
        description: '',
        status: 'success',
      })
      let index = brands.findIndex((bran) => { return remove._id === bran._id })
      let c = [...brands]
      c.splice(index, 1)
      setBrands([...c])
      setModal(false)
      setBrand({
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
  }, [auth, request, remove, notify, setBrands, clearInputs, brands])
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setBrand({ ...brand, name: e.target.value })
  }

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [t, setT] = useState()
  useEffect(() => {
    if (!t) {
      setT(1)
      getBrands()
    }
  }, [getBrands, t])
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
                      <th className="border text-center">Brand</th>
                      <th className="border text-center">Saqlash</th>
                      <th className="border text-center">Tozalash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border text-center'>
                      <td className='border text-center'>
                        <input
                          name="name"
                          value={brand.name || ''}
                          onKeyUp={keyPressed}
                          onChange={inputHandler}
                          type="text"
                          className="focus: outline-none focus:ring focus:border-blue-500 rounded py-1 px-3"
                          id="name"
                          placeholder="Brand nomini kiriting"
                        />
                      </td>
                      <td className='border text-center'>
                        {loading ? (
                          <button className="btn btn-info" disabled>
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={saveHandler}
                            className="btn btn-success py-1 px-4"
                          >
                            <FontAwesomeIcon className='text-base' icon={faFloppyDisk}/>
                          </button>
                        )}
                      </td>
                      <td className='border text-center'>
                        {loading ? (
                          <button className="btn btn-info" disabled>
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            onClick={clearInputs}
                            className="btn btn-secondary py-1 px-4"
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
                        Brand nomi{' '}
                        <Sort
                          data={brands}
                          setData={setBrands}
                          property={'name'}
                        />
                      </th>
                      <th className="border text-center">Tahrirlash</th>
                      <th className="border text-center">O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands &&
                      brands.map((s, key) => {
                        return (
                          <tr className='border text-center' key={key} c>
                            <td className="border text-center font-bold text-bold text-black">{key + 1}</td>
                            <td className="border text-center font-bold text-bold text-black">{s.name}</td>
                            <td className='border text-center'>
                              <button
                                onClick={() => {
                                  setBrand({ ...brand, ...s })
                                }}
                                className="btn btn-success py-1 px-4"
                                style={{ fontSize: '75%' }}
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
        text={"yetkazib beruvchi o'chirishni tasdiqlaysizmi?"}
        handler={deleteHandler}
      />
    </>
  )
}
