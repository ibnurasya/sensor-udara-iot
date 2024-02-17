import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from "react-datetime-picker";
import styled from "styled-components";
import { useState } from 'react';
import { fromUnixTime, getUnixTime } from 'date-fns';
import { TimelineData } from './firebase/get-timeline-data';
import { downloadTimelineDataAsCsv } from './csv-utils';

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

export type FilterDateRangeProps = {
  startDate: number;
  endDate: number;
  setStartDate: (newValue: number) => void;
  setEndDate: (newValue: number) => void;
  data: TimelineData[];
}

const FilterDateRange = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  data,
}: FilterDateRangeProps) => {
  const [_startDate, _setStartDate] = useState(startDate)
  const [_endDate, _setEndDate] = useState(endDate)

  const handleChange = (type: 'startdate' | 'enddate', value: Date) => {
    switch (type) {
      case 'startdate':
        _setStartDate(getUnixTime(value)); break;
      case 'enddate':
        _setEndDate(getUnixTime(value)); break;
      default:
        break;
    }
  }

  const applyChanges = () => {
    setStartDate(_startDate)
    setEndDate(_endDate)
  }

  const exportToCsv = () => {
    downloadTimelineDataAsCsv(data)
  }

  return (
    <FilterDateContainer>
      <div className='datepicker-container'>
        <div className='label'>Start Date</div>
        <DateTimePicker
          onChange={(newTime) => handleChange('startdate', newTime as Date)}
          value={fromUnixTime(_startDate)}
          format="y-MM-dd HH:mm"
          calendarIcon={null}
          clearIcon={null}
        />
      </div>

      <div className='datepicker-container'>
        <div className='label'>End Date</div>
        <DateTimePicker
          onChange={(newTime) => handleChange('enddate', newTime as Date)}
          value={fromUnixTime(_endDate)}
          format="y-MM-dd HH:mm"
          calendarIcon={null}
          clearIcon={null}
        />
      </div>

      <ButtonContainer>
        <ApplyButton onClick={applyChanges}>Apply</ApplyButton>
        <ExportButton onClick={exportToCsv}>Export</ExportButton>
      </ButtonContainer>

    </FilterDateContainer>
  )
}

export default FilterDateRange
