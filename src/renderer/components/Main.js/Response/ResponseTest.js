import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box, display } from '@mui/system';
import { useSelector } from 'react-redux';

export default function ResponseTest() {
  const reqAndRes = useSelector((state) => state.currentReqRes);
  const response = reqAndRes.response.responseStatus;
  const test = reqAndRes.test;

  return (
    <Paper
      elevation={18}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'alternate.main',
        justifyContent: ' space-between',
      }}
    >
      <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
        {' '}
        Test
      </Box>
      <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
        {' '}
        Response
      </Box>
      {response !== '' ? (
        <Paper
          sx={{
            backgroundColor: response ? '#54B435' : '#FF6464',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
            {test}
          </Box>

          <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
            {response ? 'Success' : 'Failed'}
          </Box>
        </Paper>
      ) : null}
    </Paper>
  );
}
