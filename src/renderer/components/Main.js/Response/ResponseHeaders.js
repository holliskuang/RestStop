import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

// convert to string to avoid any object rendering errors
function createData(key, value) {
  key = key.toString();
  value = value.toString();
  return { key, value };
}
export default function BasicTable() {
  const rows = [];
  const response = useSelector((state) => state.currentReqRes.response);
  console.log(response);
  // If we have not had a response yet, return an empty table

  // else if we have a response, loop through the response headers and add them to the table
  if (response != '') {
    const responseHeaders = response.responseHeaders;
    for (const [key, value] of Object.entries(responseHeaders)) {
      rows.push(createData(key, value));
    }
  }
  return (
    <TableContainer
      sx={{ height: '300px', overflowY: 'scroll' }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '50%' }}>Key</TableCell>
            <TableCell sx={{maxWidth:'50%'}}align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
