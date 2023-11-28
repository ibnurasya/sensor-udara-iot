import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from "react-datetime-picker";
import styled from "styled-components";
import { useState } from 'react';

const FilterDateContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  .datepicker-container {
    display: flex;
    gap: 0.5rem;
  }

  .react-datetime-picker__wrapper {
    background-color: gainsboro;
    border-radius: 0.2rem;
    padding: 0 0.2rem;
  }
`

const ApplyButton = styled.button`
  background-color: #76baff;
  padding: 0 0.5rem;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    background-color: #509ae5;
  }
`

const currentTime = new Date()
const oneHourFromNow = new Date((new Date()).setHours(currentTime.getHours() + 1))

const FilterDateRange = () => {
  const [startRange, setStartRange] = useState(currentTime)
  const [endRange, setEndRange] = useState(oneHourFromNow)

  return (
    <FilterDateContainer>
      <div className='datepicker-container'>
        <div className='label'>Start Date</div>
        <DateTimePicker
          onChange={(newTime) => setStartRange(newTime as Date)}
          value={startRange}
          format="y-MM-dd HH:mm"
          calendarIcon={null}
          clearIcon={null}
        />
      </div>

      <div className='datepicker-container'>
        <div className='label'>End Date</div>
        <DateTimePicker
        onChange={(newTime) => setEndRange(newTime as Date)}
        value={endRange}
        format="y-MM-dd HH:mm"
        calendarIcon={null}
        clearIcon={null}
        />
      </div>
      
      <ApplyButton>Apply</ApplyButton>

    </FilterDateContainer>
  )
}

export default FilterDateRange
