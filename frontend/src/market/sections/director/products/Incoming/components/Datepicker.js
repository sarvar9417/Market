import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

export const Datapicker = ({ getIncomingConnectors }) => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    getIncomingConnectors(
      new Date(start).toISOString(),
      new Date(new Date(end).setDate(new Date(end).getDate() + 1)).toISOString()
    );
  };

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
  );
};
