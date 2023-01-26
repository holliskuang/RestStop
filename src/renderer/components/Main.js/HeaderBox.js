import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Header from './Header';
import Box from '@mui/material/Box/Box';

export default function HeaderBox() {
  const initalObj = {};
  initalObj[uuid()] = { key: '', value: '' };
  const [headerList, setHeaderList] = useState(initalObj);

  /*const onChangeKey = (id, event) => {
    console.log(headerList)
    headerList[id].key = event.currentTarget.value;
    setHeaderList({ ...headerList });
  } */
  const addHeader = () => {
    const newHeader = {};
    newHeader[uuid()] = { key: '', value: '' };
    setHeaderList({ ...headerList, ...newHeader });
  };
  const deleteFromHeaderList = (id) => {
    console.log(id);
    if (Object.keys(headerList).length === 1) return;
    delete headerList[id];
    setHeaderList({ ...headerList});
  };
  return (
    <Box>
      <IconButton onClick={addHeader}>
        <AddBoxOutlinedIcon />
      </IconButton>
      {Object.keys(headerList).map((id) => {
        return <Header id={id} key={id} delete={deleteFromHeaderList} onChangeKey={onChangeKey}/>;
      })}
    </Box>
  );
}
