import React, { useState } from 'react';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

const DatePickerComponent = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div>
      <DatePicker
        label="Helper text example"
        slotProps={{
          textField: {
            helperText: "MM/DD/YYYY",
          },
        }}
      />
    </div>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
