import React from 'react'
import { Products } from './Products'
import { Selling } from './Selling'

export const Sale = () => {
    return (
        <div className='container'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
                <div className='col-span-2 w-full'> <Products/></div>
                <div className='col-span-3 w-full'><Selling/></div>    
            </div>
        </div>
    )
}
