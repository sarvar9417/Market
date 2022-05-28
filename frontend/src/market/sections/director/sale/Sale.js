import { useToast } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useHttp } from '../../../hooks/http.hook'
import { Modal } from '../components/Modal'
import { InputProduct } from './components/InputProduct'
// import { Payment } from './Payment'
import { t } from 'i18next'
import { Products } from './Products'
import { Selling } from './Selling'
import { Card } from './payment/Card'
import { Sales } from './payment/Sales'
import { Cheque } from './payment/Cheque'
// import { Cheque } from './payment/Cheque'
export const Sale = () => {
  //====================================================================
  //====================================================================
  // Pagenation
  const [currentPage, setCurrentPage] = useState(0)
  const [countPage, setCountPage] = useState(10)

  const indexLastProduct = (currentPage + 1) * countPage
  const indexFirstProduct = indexLastProduct - countPage
  const [currentProducts, setCurrentProducts] = useState([])

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
  // AUTH

  const { request } = useHttp()
  const auth = useContext(AuthContext)

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [visible, setVisible] = useState(false)
  const [check, setCheck] = useState(false)

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [categories, setCategories] = useState([
    {
      label: t('Barcha kategoriyalar'),
      value: 'all',
    },
  ])

  const getCategories = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/category/getall`,

        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      let c = [
        {
          label: t('Barcha kategoriyalar'),
          value: 'all',
        },
      ]
      data.map((category) => {
        return c.push({
          label: category.code,
          type: 'Category',
          value: category,
        })
      })
      setCategories(c)
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, auth, notify])

  const changeCategory = (e) => {
    if (e.value === 'all') {
      return setProductTypes(allproducttypes)
    }
    const filter = allproducttypes.filter((producttype) => {
      return producttype.value.category._id === e.value._id
    })
    setProductTypes(filter)
    getProducts(e)
  }
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [baseUrl, setBaseUrl] = useState()

  const getBaseUrl = useCallback(async () => {
    try {
      const data = await request('/api/baseurl', 'GET', null)
      setBaseUrl(data.baseUrl)
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, notify])
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [allproducttypes, setAllProductTypes] = useState([])
  const [producttypes, setProductTypes] = useState([])

  const getProductTypes = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/producttype/getall`,

        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      let c = []
      data.map((type) => {
        return c.push({
          label: type.name,
          type: 'ProductType',
          value: type,
        })
      })
      setProductTypes(c)
      setAllProductTypes(c)
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, auth, notify])

  const changeProductType = (e) => {
    getProducts(e)
  }
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [brands, setBrands] = useState([])

  const getBrand = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/getall`,

        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      let c = []
      data.map((type) => {
        return c.push({
          label: type.name,
          type: 'Brand',
          value: type,
        })
      })
      setBrands(c)
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, auth, notify])

  const changeBrand = (e) => {
    getProducts(e)
  }

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [exchangerate, setExchangerate] = useState({ exchangerate: 0 })

  const getExchangerate = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/get`,

        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      setExchangerate(data)
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

  const [checkNumber, setCheckNumber] = useState(0)

  const getCheckNumber = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/checknumber`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      setCheckNumber(data)
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

  const [products, setProducts] = useState([])
  const [saleproduct, setSaleProduct] = useState()
  const [saleproducts, setSaleProducts] = useState([])
  const [totalprice, setTotalPrice] = useState(0)
  const [sales, setSales] = useState({ products: [], payment: {} })

  const getProducts = useCallback(
    async (type) => {
      try {
        const data = await request(
          `/api/products/product/getsale`,
          'POST',
          { market: auth.market._id, type: type.type, typeid: type.value._id },
          {
            Authorization: `Bearer ${auth.token}`,
          },
        )
        let c = []
        data.map((type) => {
          return c.push({
            label: type.code + ' ' + type.name,
            type: 'product',
            value: type,
          })
        })
        setProducts(c)
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        })
      }
    },
    [request, auth, notify],
  )

  const changeProduct = (e) => {
    setModal(true)
    setSaleProduct({
      ...e.value,
      totalprice: e.value.price.sellingprice,
      pieces: 1,
      unitprice: e.value.price.sellingprice,
    })
  }

  const setCounts = (e) => {
    let pieces = saleproduct.pieces
    let unitprice = saleproduct.unitprice
    let totalprice = saleproduct.totalprice
    if (e.target.name === 'pieces') {
      totalprice =
        Math.round(
          (!unitprice ? 0 : unitprice) * parseFloat(e.target.value) * 100,
        ) / 100
      setSaleProduct({
        ...saleproduct,
        pieces: e.target.value === '' ? '' : parseFloat(e.target.value),
        totalprice: e.target.value === '' ? 0 : totalprice,
      })
    }
    if (e.target.name === 'unitprice') {
      totalprice =
        Math.round((!pieces ? 0 : pieces) * parseFloat(e.target.value) * 100) /
        100
      setSaleProduct({
        ...saleproduct,
        unitprice: e.target.value === '' ? '' : parseFloat(e.target.value),
        totalprice: e.target.value === '' ? 0 : totalprice,
      })
    }
  }

  const pushSaleProduct = () => {
    let sales = [...saleproducts]
    sales.unshift(saleproduct)
    setSaleProduct()
    setModal(false)
    setSaleProducts(sales)
    let total = sales.reduce((summ, sale) => {
      return sale.totalprice + summ
    }, 0)
    setTotalPrice(Math.round(total * 100) / 100)
    setPayment({
      ...payment,
      totalprice: Math.round(total * 100) / 100,
      type: 'cash',
      cash: Math.round(total * 100) / 100,
      cashuzs: Math.round(total * exchangerate.exchangerate * 100) / 100,
      discount: 0,
      discountuzs: 0,
    })
  }

  const editProducts = (product, index, type) => {
    let sales = [...saleproducts]
    sales.splice(index, 1)
    if (type === 'edit') {
      setSaleProduct(product)
      setModal(true)
    }
    setSaleProducts(sales)
    let total = sales.reduce((summ, sale) => {
      return sale.totalprice + summ
    }, 0)
    setTotalPrice(Math.round(total * 100) / 100)
    setPayment({
      ...payment,
      totalprice: Math.round(total * 100) / 100,
      type: 'cash',
      cash: Math.round(total * 100) / 100,
      cashuzs: Math.round(total * exchangerate.exchangerate * 100) / 100,
      discount: 0,
      discountuzs: 0,
    })
  }
  //====================================================================
  //====================================================================

  // ===================================================================
  // ===================================================================
  const [packmans, setPackmans] = useState([])

  const getPackmans = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/packman/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      let v = []

      data.map((type) => {
        return v.push({
          label: type.name,
          value: type._id,
        })
      })
      setPackmans(v)
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

  // ===================================================================
  // ===================================================================
  const [saleconnectors, setSaleConnectors] = useState([])

  const getSaleConnectors = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/getconnectors`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      setCurrentProducts(data.slice(indexFirstProduct, indexLastProduct))
      setSaleConnectors(data)
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [request, auth, notify, indexFirstProduct, indexLastProduct])

  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0)
      setCountPage(e.target.value)
      setCurrentProducts(saleconnectors.slice(0, e.target.value))
    },
    [saleconnectors],
  )
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [clients, setClients] = useState([])
  const [storageClients, setStorageClients] = useState([])

  const getClients = useCallback(
    async (s) => {
      try {
        const data = await request(
          `/api/sales/client/getall`,
          'POST',
          { market: auth.market._id },
          {
            Authorization: `Bearer ${auth.token}`,
          },
        )
        let v = [
          {
            label: t('Barcha mijozlar'),
            value: 'all',
          },
        ]

        data.map((type) => {
          return v.push({
            label: type.name,
            value: type._id,
            packman: type.packman && type.packman._id,
          })
        })
        setStorageClients(v)
        setClients(v)
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        })
      }
    },
    [request, auth, notify],
  )
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [packman, setPackman] = useState({})

  const changePackman = (e) => {
    setPackman({
      name: e.label,
      _id: e.value,
    })
    if (e.value === 'all') {
      setClients(storageClients)
    } else {
      const filter = storageClients.filter((item) => item.packman === e.value)
      setClients(filter)
    }
  }

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [client, setClient] = useState({})

  const changeClient = (e) => {
    setClient({
      name: e.label,
      _id: e.value,
      packman: e.packman || null,
    })
  }

  const inputClient = (e) => {
    setClient({
      name: e.target.value,
    })
  }
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Discount and Payment
  const [discount, setDiscount] = useState({
    discount: 0,
    discountuzs: 0,
    procient: 0,
    isProcient: false,
  })

  const [debt, setDebt] = useState({
    debt: 0,
    debtuzs: 0,
    comment: '',
  })

  const [payment, setPayment] = useState({
    totalprice: 0,
    type: 'cash',
    cash: totalprice,
    card: 0,
    transfer: 0,
    carduzs: 0,
    cashuzs: 0,
    transferuzs: 0,
    discount: 0,
    discountuzs: 0,
  })

  const clearDatas = useCallback(() => {
    setPayment({
      totalprice: 0,
      type: 'cash',
      cash: 0,
      card: 0,
      transfer: 0,
      carduzs: 0,
      cashuzs: 0,
      transferuzs: 0,
      discount: 0,
      discountuzs: 0,
    })
    setDebt({
      debt: 0,
      debtuzs: 0,
      comment: '',
    })
    setDiscount({
      discount: 0,
      discountuzs: 0,
      procient: 0,
      isProcient: false,
    })
    setSaleProducts([])
    setTotalPrice(0)
    setPackman({})
    setClient({})
    getCheckNumber()
  }, [getCheckNumber])

  let types = ['cash', 'card', 'transfer']

  const changeDiscount = (e, p) => {
    if (discount.isProcient && e.target.value > 100) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!'),
        description: '',
        status: 'error',
      })
    }
    if (Math.round(e.target.value * 100) / 100 > totalprice) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!'),
        description: '',
        status: 'error',
      })
    }
    p.discount =
      e.target.value === '' ? '' : Math.round(e.target.value * 100) / 100
    p.discountuzs =
      Math.round(e.target.value * exchangerate.exchangerate * 100) / 100
    p.cash = 0
    p.card = 0
    p.transfer = 0
    setDebt({
      ...debt,
      debt:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * e.target.value) / 100
              : e.target.value)) *
            100,
        ) / 100,
      debtuzs:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * e.target.value) / 100
              : e.target.value)) *
            exchangerate.exchangerate *
            100,
        ) / 100,
    })
    discount.isProcient
      ? setDiscount({
          ...discount,
          procient: e.target.value,
          discount:
            Math.round(((totalprice * e.target.value) / 100) * 100) / 100,
          discountuzs:
            Math.round(
              ((totalprice * e.target.value * exchangerate.exchangerate) /
                100) *
                100,
            ) / 100,
        })
      : setDiscount({
          ...discount,
          procient: 0,
          discount: Math.round(e.target.value * 100) / 100,
          discountuzs:
            Math.round(e.target.value * exchangerate.exchangerate * 100) / 100,
        })
  }

  const changeDiscountUzs = (e, p) => {
    if (discount.isProcient && e.target.value > 100) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!'),
        description: '',
        status: 'error',
      })
    }
    if (
      Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100 >
      totalprice
    ) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!'),
        description: '',
        status: 'error',
      })
    }
    p.discount =
      Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100
    p.discountuzs = e.target.value === '' ? '' : e.target.value
    p.cash = 0
    p.card = 0
    p.transfer = 0
    setDebt({
      ...debt,
      debt:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * (e.target.value / exchangerate.exchangerate)) /
                100
              : e.target.value / exchangerate.exchangerate)) *
            100,
        ) / 100,
      debtuzs:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * (e.target.value / exchangerate.exchangerate)) /
                100
              : e.target.value / exchangerate.exchangerate)) *
            exchangerate.exchangerate *
            100,
        ) / 100,
    })
    discount.isProcient
      ? setDiscount({
          ...discount,
          procient: e.target.value,
          discount:
            Math.round(((totalprice * e.target.value) / 100) * 100) / 100,
          discountuzs:
            Math.round(
              ((totalprice * e.target.value * exchangerate.exchangerate) /
                100) *
                100,
            ) / 100,
        })
      : setDiscount({
          ...discount,
          procient: 0,
          discount:
            Math.round((e.target.value / exchangerate.exchangerate) * 100) /
            100,
          discountuzs: Math.round(e.target.value * 100) / 100,
        })
  }

  const changeType = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 100) / 100
        : payment.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 100) / 100
        : payment.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 100) / 100
        : payment.transfer)

    if (Math.round((total + discount.discount) * 100) / 100 > totalprice) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!'),
        description: '',
        status: 'error',
      })
    }
    p[e.target.dataset.type] =
      e.target.value === '' ? '' : Math.round(e.target.value * 100) / 100
    p[e.target.dataset.type + 'uzs'] =
      Math.round(e.target.value * 100 * exchangerate.exchangerate) / 100
    setDebt({
      ...debt,
      debt: Math.round((totalprice - (total + discount.discount)) * 100) / 100,
      debtuzs:
        Math.round(
          (totalprice - (total + discount.discount)) *
            exchangerate.exchangerate *
            100,
        ) / 100,
    })
  }

  const changeTypeUzs = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100
        : payment.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100
        : payment.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100
        : payment.transfer)

    if (Math.round((total + discount.discount) * 100) / 100 > totalprice) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!'),
        description: '',
        status: 'error',
      })
    }
    p[e.target.dataset.type] =
      Math.round((e.target.value / exchangerate.exchangerate) * 100) / 100
    p[e.target.dataset.type + 'uzs'] =
      e.target.value === '' ? '' : Math.round(e.target.value * 100) / 100
    setDebt({
      ...debt,
      debt: Math.round((totalprice - (total + discount.discount)) * 100) / 100,
      debtuzs:
        Math.round(
          (totalprice - (total + discount.discount)) *
            exchangerate.exchangerate *
            100,
        ) / 100,
    })
  }

  const changeHandler = (e) => {
    let p = { ...payment }
    if (e.target.dataset.type === 'discount') {
      if (e.target.dataset.money === 'UZS') changeDiscountUzs(e, p)
      else changeDiscount(e, p)
    } else {
      if (e.target.dataset.money === 'UZS') {
        changeTypeUzs(e, p)
      } else changeType(e, p)
    }
    setPayment(p)
  }

  const [paymentType, setPaymentType] = useState({
    type: 'cash',
    name: t('Naqt'),
  })

  const typeHandler = (e) => {
    if (e.target.dataset.type === 'debt') return
    let p = { ...payment }
    if (
      e.target.dataset.type === 'mixed' ||
      e.target.dataset.type === 'discount'
    ) {
      setDebt({
        ...debt,
        debt: Math.round((totalprice - discount.discount) * 100) / 100,
        debtuzs:
          Math.round(
            (totalprice - discount.discount) * exchangerate.exchangerate * 100,
          ) / 100,
      })
    }
    types.map((type) => {
      return type === e.target.dataset.type
        ? ((p[type] = Math.round((totalprice - discount.discount) * 100) / 100),
          (p[type + 'uzs'] =
            Math.round(
              (totalprice - discount.discount) *
                exchangerate.exchangerate *
                100,
            ) / 100),
          (p.type = type),
          setDebt({
            ...debt,
            debt: 0,
            debtuzs: 0,
          }))
        : ((p[type] = 0), (p[type + 'uzs'] = 0))
    })
    setPayment(p)
    setPaymentType({
      type: e.target.dataset.type,
      name: e.target.name,
    })
  }

  const changeProcient = () => {
    if (discount.isProcient) {
      setPayment({
        ...payment,
        discount: discount.discount,
        discountuzs: discount.discount * exchangerate.exchangerate,
      })
      setDiscount({
        ...discount,
        discount: discount.discount,
        discountuzs: discount.discount * exchangerate.exchangerate,
      })
    }

    if (!discount.isProcient) {
      let procient =
        Math.round(((discount.discount * 100) / totalprice) * 100) / 100
      setPayment({
        ...payment,
        discount: procient,
        discountuzs: procient,
      })
      setDiscount({
        ...discount,
        discount: procient,
        discountuzs: procient * exchangerate.exchangerate,
      })
    }

    setDiscount({
      ...discount,
      isProcient: !discount.isProcient,
    })
  }

  const checkHandler = () => {
    let total =
      discount.discount +
      payment.card +
      payment.cash +
      payment.transfer +
      debt.debt
    if (Math.round(total * 100) / 100 !== totalprice) {
      return notify({
        title: t("Diqqat! To'lov hisobida xatolik yuz bergan!"),
        description: '',
        status: 'error',
      })
    }

    if (debt.debt > 0) {
      return setModal2(true)
    }

    return setModal3(true)
  }

  const changeCheck = (e) => {
    setCheck(true)
    setSales(e)
  }

  const changeComment = (e) => {
    setDebt({ ...debt, comment: e.target.value })
  }

  const createHandler = useCallback(async () => {
    try {
      setModal2(false)
      setModal3(false)
      const data = await request(
        `/api/sales/saleproducts/register`,
        'POST',
        {
          market: auth.market._id,
          saleproducts,
          client,
          packman,
          discount,
          payment,
          debt,
          user: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        },
      )
      setCheck(true)
      setSales({ payment, products: data })
      clearDatas()
      setVisible(false)
      getSaleConnectors()
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      })
    }
  }, [
    request,
    notify,
    auth,
    discount,
    payment,
    debt,
    packman,
    client,
    saleproducts,
    clearDatas,
    getSaleConnectors,
  ])
  //====================================================================
  //====================================================================
  const [n, setN] = useState()
  useEffect(() => {
    if (!n) {
      setN(1)
      getCategories()
      getProductTypes()
      getBrand()
      getPackmans()
      getClients()
      getBaseUrl()
      getExchangerate()
      getCheckNumber()
      getSaleConnectors()
    }
  }, [
    getCategories,
    getProductTypes,
    getBrand,
    getPackmans,
    getClients,
    n,
    getBaseUrl,
    getExchangerate,
    getCheckNumber,
    getSaleConnectors,
  ])
  //====================================================================
  //====================================================================

  return (
    <div className="">
      <div className={`${check ? '' : 'hidden'}`}>
        <Cheque sales={sales} setCheck={setCheck} />
      </div>
      <Card
        client={client}
        exchangerate={exchangerate}
        checkNumber={checkNumber}
        checkHandler={checkHandler}
        discount={discount}
        changeProcient={changeProcient}
        changeHandler={changeHandler}
        paymentType={paymentType}
        typeHandler={typeHandler}
        totalprice={totalprice}
        visible={visible}
        setVisible={setVisible}
        payment={payment}
        debt={debt}
      />
      {/* <Payment /> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-7 p-3">
        <div className="md:col-span-2 w-full">
          <Products
            changeProduct={changeProduct}
            changeBrand={changeBrand}
            changeProductType={changeProductType}
            changeCategory={changeCategory}
            categories={categories}
            producttypes={producttypes}
            brands={brands}
            products={products}
          />
        </div>
        <div className="md:col-span-5 w-full">
          <Selling
            checkNumber={checkNumber}
            payment={payment}
            discount={discount}
            debt={debt}
            totalprice={totalprice}
            setVisible={setVisible}
            editProducts={editProducts}
            saleproducts={saleproducts}
            packmans={packmans}
            clients={clients}
            changePackman={changePackman}
            changeClient={changeClient}
            inputClient={inputClient}
          />
        </div>
      </div>
      <div className="m-3">
        <Sales
          setCurrentProducts={setCurrentProducts}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          countPage={countPage}
          currentProducts={currentProducts}
          saleconnectors={saleconnectors}
          changeCheck={changeCheck}
        />
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={<InputProduct setCounts={setCounts} product={saleproduct} />}
        // text={"mahsulotnti o'chirishni tasdiqlaysizmi?"}
        handler={pushSaleProduct}
      />

      <Modal
        modal={modal2}
        setModal={setModal2}
        basic={`${t("Diqqat! Iltimos")} ${debt.debt.toLocaleString('de-DE')}$ (${(
          debt.debt * exchangerate.exchangerate
        ).toLocaleString('de-DE')} ${t("so'm)  qarzdorlik uchun izoh kiriting")}`}
        text={
          <input
            onChange={changeComment}
            className="block border w-full px-2 rounded"
            placeholder={t("Izoh")}
          />
        }
        handler={createHandler}
      />

      <Modal
        modal={modal3}
        setModal={setModal3}
        basic={t(`Mijozdan to'lov qabul qilishni tasdiqlaysizmi?`)}
        handler={createHandler}
      />
    </div>
  )
}
