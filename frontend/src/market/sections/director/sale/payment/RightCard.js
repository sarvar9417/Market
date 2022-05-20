import React from 'react'
import { RightBody } from './RightBody'
import { RightHeader } from './RightHeader'

export const RightCard = () => {
  return (
    <div className='w-2/4 text-white pl-6'>
        <RightHeader/>
        <RightBody/>
    </div>
  )
}
