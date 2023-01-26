import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Header(props) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);

  // if checked==true , retrieve key value

  const handleClick = () => {
    setChecked(event.target.checked);
    // add to array in redux
  };
  return (
    <Box>
      <Checkbox checked={checked} onChange={handleClick}></Checkbox>
      <TextField
        variant="standard"
        label="Key"
        value={key}
        onChange={(event) => {
          setKey(event.target.value);
        }}
      ></TextField>
      <TextField
        variant="standard"
        label="Value"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      ></TextField>
      <IconButton
        onClick={() => {
          props.delete(props.id);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
