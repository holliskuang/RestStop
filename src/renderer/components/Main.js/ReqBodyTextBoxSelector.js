import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import { setBodyType } from 'renderer/state/requestSlice';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';

// This is the selector for the content type of the request body
// It is used in conjunction with the ReqBodyTextBox component
// It is a drop down menu that allows the user to select the content type of the request body
// The content type is stored in the redux store and is used to determine the language extension of the request body

export default function ReqBodyTextBoxSelector() {
  const reqState = useSelector((state) => state.request);
  const dispatch = useDispatch();
  return (
    <FormControl>
    <InputLabel id="Content Type">Content Type</InputLabel>
      <Select
        label="Content Type"
        defaultValue="plain"
        value={reqState.bodyType}
        onChange={(event) => {
          dispatch(setBodyType(event.target.value));
        }}
      >
        <MenuItem value="plain">text/plain</MenuItem>
        <MenuItem value="html">text/html</MenuItem>
        <MenuItem value="json">application/json</MenuItem>
        <MenuItem value="javascript">application/javascript</MenuItem>
        <MenuItem value="xml">application/xml</MenuItem>
      </Select>
    </FormControl>
  );
}
