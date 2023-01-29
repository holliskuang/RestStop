import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import { setBodyType } from 'renderer/state/requestSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ReqBodyTextBoxSelector() {
  const reqState = useSelector((state) => state.request);
  const dispatch = useDispatch();
  return (
    <FormControl>
      <Select
        label="Content Type"
        defaultValue="xml"
        placeholder="text/plain"
        value={reqState.bodyType}
        onChange={(event) => {
          dispatch(setBodyType(event.target.value));
        }}
      >
        <ListSubheader>
          Text
          <MenuItem value="xml">text/plain</MenuItem>
          <MenuItem value="html">text/html</MenuItem>
          <MenuItem value="json">application/json</MenuItem>
          <MenuItem value="javascript">application/javascript</MenuItem>
          <MenuItem value="xml">application/xml</MenuItem>
        </ListSubheader>
      </Select>
    </FormControl>
  );
}
