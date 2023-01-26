import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Header from './Header';
export default function HeaderBox() {
  const [headerList, setHeaderList] = useState([uuid()]);

  const addHeader = () => {};
  return (
    <IconButton onClick={addHeader}>
      <AddBoxOutlinedIcon />
    </IconButton>
    HeaderList.map((header) => <Header id={headerId} />)
  );
}
