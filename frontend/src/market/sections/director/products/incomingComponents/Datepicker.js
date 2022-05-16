import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

export const Datapicker = ({ getIncomingConnectors }) => {
  const [startDate, setStartDate] = useState(
    new Date(2022, new Date().getMonth(), 1),
  )
  const [endDate, setEndDate] = useState(new Date())
  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    getIncomingConnectors(start, new Date(new Date().setDate(new Date(end).getDate() + 1)))
  }
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </div>
  )
}
