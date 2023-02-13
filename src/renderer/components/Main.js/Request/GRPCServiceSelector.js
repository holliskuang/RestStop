import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import { setBodyType } from 'renderer/state/currentReqRes';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';

// This is the selector for the Service Method of the GRPC request

export default function GRPCServiceSelector() {
  const reqState = useSelector((state) => state.currentReqRes);
  const dispatch = useDispatch();
  return (
    <FormControl>
      <InputLabel id="Content Type">Methods</InputLabel>
      
      <Select
        label="Content Type"
        defaultValue="text/plain"
        value={reqState.bodyType}
        onChange={(event) => {
          dispatch(setBodyType(event.target.value));
        }}
      >
        {reqState.rpcs.map((rpc) => {
          return <MenuItem value={rpc}>{rpc}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}
