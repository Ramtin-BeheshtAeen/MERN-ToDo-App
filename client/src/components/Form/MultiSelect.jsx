import {React, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({label, currentState, data, onSelect}) {
  const [selectedItem, setSelectedItem] = useState(currentState);

  useEffect(() => {
    if (data.length === 1) {
      setSelectedItem(data[0]._id);
      onSelect({ id: data[0]._id });
    }

  }, [data, onSelect]);

  const handleChange = (event) => {
    const newValue = event.target.value
    setSelectedItem(newValue);
    onSelect({ id: newValue});
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedItem}
          label={label}
          onChange={handleChange}
        >
    {data.map((container)=>(
        <MenuItem value={container._id}>{container.name}</MenuItem>
    ))}
        
        </Select>
      </FormControl>
    </Box>
  );
}