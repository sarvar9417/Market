import { t } from 'i18next'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

export const DatePickers = ({ changeDate }) => {
  const [startDate, setStartDate] = useState(new Date())
  const years = Array.from(
    { length: 80 },
    (v, k) => k + new Date().getFullYear() - 80,
  )
  const months = [
    t('Yanvar'),
    t('Fevral'),
    t('Mart'),
    t('Aprel'),
    t('May'),
    t('Iyun'),
    t('Iyul'),
    t('Avgust'),
    t('Sentabr'),
    t('Oktabr'),
    t('Noyabr'),
    t('Dekabr'),
  ]
  return (
    <div
      className="form-control form-control-sm"
      style={{ maxWidth: '120px', overflow: 'hidden' }}
    >
      <DatePicker
        onSelect={(e) => {
          changeDate(e)
        }}
        dateFormat="dd/MM/yyyy"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {'<'}
            </button>
            <select
              value={new Date(date).getFullYear()}
              onChange={({ target: { value } }) => changeYear(value)}
              className="border"
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option defaultValue={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
            </select>

            <select
              className="border"
              value={months[new Date(date).getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {'>'}
            </button>
          </div>
        )}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  )
}
