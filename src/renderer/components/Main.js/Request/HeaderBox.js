import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Header from './Header';
import Box from '@mui/material/Box/Box';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'http';
import { setHeaders } from '../../../state/currentReqRes.js';

export default function HeaderBox() {
  const initalObj = {};
  initalObj[uuid()] = { key: '', value: '', checked: true };
  const [headerList, setHeaderList] = useState(initalObj);
  const dispatch = useDispatch();

  // conglomerate header info and update redux for headers whenever local state
  // changes
  dispatch(setHeaders(headerList));

  // update redux for checked
  const handleCheck = (id, event) => {
    setHeaderList({
      ...headerList,
      [id]: { ...headerList[id], checked: event.target.checked },
    });
  };

  // update redux for key
  const onChangeKey = (id, event) => {
    setHeaderList({
      ...headerList,
      [id]: { ...headerList[id], key: event.target.value },
    });
  };

  // update redux for value
  const onChangeValue = (id, event) => {
    setHeaderList({
      ...headerList,
      [id]: { ...headerList[id], value: event.target.value },
    });
  };

  // add new header to local state
  const addHeader = () => {
    const newHeader = {};
    newHeader[uuid()] = { key: '', value: '', checked: false };
    setHeaderList({ ...headerList, ...newHeader });
  };

  // delete header from local state
  const deleteFromHeaderList = (id) => {
    if (Object.keys(headerList).length === 1) return;
    let newHeader = { ...headerList };
    delete newHeader[id];
    setHeaderList({ ...newHeader });
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
