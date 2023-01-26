import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
export default function Header() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);


  // if checked==true , retrieve key value 

  const handleClick = () => {
    setChecked(event.target.checked);
    // add to array in redux
  }
  return (
    <Box>
      <Checkbox
        checked={checked}
        onChange={handleClick}
      ></Checkbox>
      <TextField
        variant="standard"
        label="Key"
        onChange={(event) => {
          setKey(event.target.value);
        }}
      ></TextField>
      <TextField
        variant="standard"
        label="Value"
        onChange={(event) => {
          setValue(event.target.value);
        }}
      ></TextField>
    </Box>
  );
}
