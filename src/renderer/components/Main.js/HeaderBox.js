import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Header from './Header';
import Box from '@mui/material/Box/Box';

export default function HeaderBox() {
  const initalObj = {};
  initalObj[uuid()] = { key: '', value: '', checked: false };
  const [headerList, setHeaderList] = useState(initalObj);

  const onChangeKey = (id, event) => {
    headerList[id].key = event.currentTarget.value;
    setHeaderList({ ...headerList });
  };
  const handleCheck = (id, event) => {
    headerList[id].checked = event.currentTarget.checked;
    setHeaderList({ ...headerList });
  };
  const onChangeValue = (id, event) => {
    headerList[id].value = event.currentTarget.value;
    setHeaderList({ ...headerList });
  };
  const addHeader = () => {
    const newHeader = {};
    newHeader[uuid()] = { key: '', value: '', checked: false };
    setHeaderList({ ...headerList, ...newHeader });
  };
  const deleteFromHeaderList = (id) => {
    console.log(id);
    if (Object.keys(headerList).length === 1) return;
    delete headerList[id];
    setHeaderList({ ...headerList });
  };
  return (
    <Box>
      <IconButton onClick={addHeader}>
        <AddBoxOutlinedIcon />
      </IconButton>
      {Object.keys(headerList).map((id) => {
        return (
          <Header
            id={id}
            key={id}
            delete={deleteFromHeaderList}
            headerKey={id.key}
            value={id.value}
            handleCheck={handleCheck}
            onChangeKey={onChangeKey}
            onChangeValue={onChangeValue}
          />
        );
      })}
    </Box>
  );
}
