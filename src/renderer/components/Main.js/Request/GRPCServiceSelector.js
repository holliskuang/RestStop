import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import { setBodyType } from 'renderer/state/currentReqRes';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import { setService } from 'renderer/state/currentReqRes';

// This is the selector for the Service Method of the GRPC request

export default function GRPCServiceSelector() {
  const reqState = useSelector((state) => state.currentReqRes);
  const dispatch = useDispatch();

  // RCPC is an object , but we need to map
  // the keys to an array of strings
  // so we can use the array to populate the selector
  const rpcs = Object.values(reqState.rpcs);
  console.log(rpcs);

  return (
    <FormControl sx={{
      width:'30%'
    }}>
      <InputLabel id="Content Type">Methods</InputLabel>

      <Select
        label="Content Type"
        defaultValue="text/plain"
        value={reqState.service}
        onChange={(event) => {
          dispatch(setService(event.target.value));
        }}
      >
        {rpcs.map((rpc) => {
          return (
            <MenuItem key={rpc.name} value={rpc}>
              {rpc.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
