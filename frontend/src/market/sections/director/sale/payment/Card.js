import React from 'react'
import { LeftCard } from './LeftCard'
import { RightCard } from './RightCard'

export const Card = () => {
  return (
    <div className='w-screen h-screen bg-[#3695D7] p-1 flex justify-evenly'>
      <LeftCard />
      <RightCard />
    </div>
  )
}
