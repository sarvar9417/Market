import React from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export const Products = ({ changeProduct, changeBrand, changeProductType, changeCategory, categories, producttypes, brands, products }) => {
    return (
        <div className='bg-white'>
            <p className='bg-[#31C2A0] text-center text-5xl text-white py-2 m-0'>Maxsulotlar</p>
            <div className='px-3 py-2'>
                <div className='grid grid-cols-1 gap-4 py-2 sm:grid-cols-2'>
                    <div className='w-full'>
                        <Select
                            onChange={changeCategory}
                            // isDisabled={loading}
                            placeholder="Kategoriyalar"
                            isClearable={true}
                            // isLoading={loading}
                            components={animatedComponents}
                            options={categories}
                        />
                    </div>
                    <div className='w-full'>
                        <Select
                            onChange={changeProduct}
                            placeholder="Mahsulotlar"
                            isClearable={true}
                            // isLoading={loading}
                            components={animatedComponents}
                            options={products}
                        />
                    </div>
                    <div className='w-full'>
                        <Select
                            onChange={changeProductType}
                            placeholder="Mahsulot turlari"
                            isClearable={true}
                            // isLoading={loading}
                            components={animatedComponents}
                            options={producttypes}
                        />
                    </div>
                    <div className='w-full'>
                        <Select
                            onChange={changeBrand}
                            // isDisabled={loading}
                            placeholder="Brandlar"
                            isClearable={true}
                            // isLoading={loading}
                            components={animatedComponents}
                            options={brands}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
