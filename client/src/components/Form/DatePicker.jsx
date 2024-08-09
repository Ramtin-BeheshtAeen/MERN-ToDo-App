// src/components/DateTimePicker.js
import React, { useState } from 'react';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

function DateTimePicker({ selectedDate, selectedTime, onDateChange, onTimeChange }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='date-picker'>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={onDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Select Time"
          value={selectedTime}
          onChange={(newValue) => setSelectedTime(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}

export default DateTimePicker;
