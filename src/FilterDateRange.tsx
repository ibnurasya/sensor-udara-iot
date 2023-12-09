import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from "react-datetime-picker";
import styled from "styled-components";
import { useState } from 'react';

const FilterDateContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: black;

  .datepicker-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .label {
      font-size: 12px;
      font-weight: 800;
    }
  }

  .react-datetime-picker__wrapper {
    background-color: gainsboro;
    border-color: transparent;
    border-radius: 0.2rem;
    padding: 0 0.2rem;
    font-size: 12px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ApplyButton = styled.button`
  background-color: #76baff;
  padding: 0.25rem 0.75rem;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #509ae5;
  }
`

const ExportButton = styled.button`
  /* margin-left: auto; */
  background-color: #000;
  padding: 0.25rem 0.75rem;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 12px;
  color: white;

  &:hover {
    background-color: #555;
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
      
      <ButtonContainer>
        <ApplyButton>Apply</ApplyButton>
        <ExportButton>Export</ExportButton>
      </ButtonContainer>

    </FilterDateContainer>
  )
}

export default FilterDateRange
