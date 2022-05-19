import { useToast } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useHttp } from '../../../hooks/http.hook'
// import { Payment } from './Payment'
import { Products } from './Products'
import { Selling } from './Selling'

export const Sale = () => {

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
                position: "top-right",
            })
        },
        [toast]
    )
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // AUTH
    const { request } = useHttp()
    const auth = useContext(AuthContext)
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const [categories, setCategories] = useState([{
        label: "Barcha kategoriyalar",
        value: "all"
    }])

    const getCategories = useCallback(async () => {
        try {
            const data = await request(
                `/api/products/category/getall`,
                "POST",
                { market: auth.market._id },
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
            let c = [{
                label: "Barcha kategoriyalar",
                value: "all"
            }]
            data.map((category) => {
                return c.push({
                    label: category.code,
                    value: "Category",
                    type: category
                })
            })
            setCategories(c)
        } catch (error) {
            notify({
                title: error,
                description: "",
                status: "error",
            })
        }
    }, [request, auth, notify, categories])

    const changeCategory = (e) => {
        const filter = allproducttypes.filter((producttype) => {
            return producttype.type.category._id === e.type._id
        })
        setProductTypes(filter)
        getProducts(e)
    }
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
                "POST",
                { market: auth.market._id },
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
            let c = []
            data.map((type) => {
                return c.push({
                    label: type.name,
                    value: "ProductType",
                    type
                })
            })
            setProductTypes(c)
            setAllProductTypes(c)
        } catch (error) {
            notify({
                title: error,
                description: "",
                status: "error",
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
                "POST",
                { market: auth.market._id },
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
            let c = [...brands]
            data.map((type) => {
                return c.push({
                    label: type.name,
                    value: "Brand",
                    _id: type._id
                })
            })
            setBrands(c)
        } catch (error) {
            notify({
                title: error,
                description: "",
                status: "error",
            })
        }
    }, [request, auth, notify, brands])
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const [products, setProducts] = useState([])

    const getProducts = useCallback(async (type) => {
        try {
            const data = await request(
                `/api/products/product/getsale`,
                "POST",
                { market: auth.market._id, type: type.value, typeid: type.type._id },
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
            let c = []
            data.map((type) => {
                return c.push({
                    label: type.code + " " + type.name,
                    value: "product",
                    product: { ...type }
                })
            })
            setProducts(c)
        } catch (error) {
            notify({
                title: error,
                description: "",
                status: "error",
            })
        }
    }, [request, auth, notify])
    //====================================================================
    //====================================================================


    //====================================================================
    //====================================================================
    const [t, setT] = useState()
    useEffect(() => {
        if (!t) {
            setT(1)
            getCategories()
            getProductTypes()
            getBrand()
        }
    }, [getCategories, getProductTypes, getBrand, t])
    //====================================================================
    //====================================================================

    return (
        <div className='p-3'>
            {/* <Payment /> */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
                <div className='md:col-span-2 w-full'>
                    <Products
                        changeProductType={changeProductType}
                        changeCategory={changeCategory}
                        categories={categories}
                        producttypes={producttypes}
                        brands={brands}
                        products={products}
                    /></div>
                <div className='md:col-span-3 w-full'><Selling /></div>
            </div>
        </div>
    )
}
