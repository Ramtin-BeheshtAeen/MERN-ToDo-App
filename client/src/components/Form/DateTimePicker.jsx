// src/components/DateTimePicker.js
import React, { useState } from 'react';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

function DateTimePicker({ selectedDate, selectedTime, onDateChange, onTimeChange, dateLabel, timeLabel }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='date-time-picker'>
        <DatePicker
          label={dateLabel}
          value={selectedDate}
          onChange={onDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label={timeLabel}
          value={selectedTime}
          onChange={onTimeChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}

export default DateTimePicker;
