import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { RegisterIncoming } from './incomingComponents/RegisterIncoming'
import { useHttp } from './../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
export const Incoming = () => {
  //   const [beginDay, setBeginDay] = useState(
  //     new Date(new Date().setUTCHours(0, 0, 0, 0)),
  //   )
  //   const [endDay, setEndDay] = useState(
  //     new Date(new Date().setDate(new Date().getDate() + 1)),
  //   )
  //====================================================================
  //====================================================================
  // MODAL
  //   const [modal, setModal] = useState(false)
  //   const [modal1, setModal1] = useState(false)
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const { request, loading } = useHttp()
  const auth = useContext(AuthContext)

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
  // COUNTERDOCTORS
  const [suppliers, setSuppliers] = useState([])
  const [supplier, setSupplier] = useState()

  const getSuppliers = useCallback(async () => {
    try {
      const data = await request(
        `/api/supplier/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      let s = []
      data.map((supplier) => {
        return s.push({
          label: supplier.name,
          value: supplier.id,
        })
      })
      setSuppliers(s)
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
  // Visible
  const [visible, setVisible] = useState(false)

  const changeVisible = () => setVisible(!visible)

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // useEffect

  const [t, setT] = useState(0)

  useEffect(() => {
    if (auth.market && !t) {
      setT(1)
      getSuppliers()
    }
  }, [auth, getSuppliers, t])

  //====================================================================
  //====================================================================

  return (
    <div>
      <div className="content-wrapper px-lg-5 px-3">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="row">
              <div className="col-12 text-end">
                <button
                  className={`btn btn-primary mb-2 w-100 ${
                    visible ? 'd-none' : ''
                  }`}
                  onClick={changeVisible}
                >
                  Qabul qilish
                </button>
                <button
                  className={`btn btn-primary mb-2 w-100 ${
                    visible ? '' : 'd-none'
                  }`}
                  onClick={changeVisible}
                >
                  Qabul qilish
                </button>
              </div>
            </div>
            <div className={` ${visible ? '' : 'd-none'}`}>
              <RegisterIncoming
                loading={loading}
                suppliers={suppliers}
                supplier={supplier}
                setSupplier={setSupplier}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
