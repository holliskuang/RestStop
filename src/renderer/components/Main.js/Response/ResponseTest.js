import { Divider, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box, display } from '@mui/system';
import { useSelector } from 'react-redux';

export default function ResponseTest() {
  const reqAndRes = useSelector((state) => state.currentReqRes);
  const response = reqAndRes.response.responseTest;
  const test = reqAndRes.response.originalTest;
  console.log(response);

  return (
    <Paper
      elevation={18}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        height: '26vh',
      }}
    >
      <Box
        sx={{
          height: '15%',
          display: 'flex',
          width: '100%',
          pt: '2%',
          pl: '2%',
          bottomBorder: '1px solid black',
        }}
      >
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'flex-start',

            maxHeight: '1vh',
          }}
        >
          {' '}
          Test
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'flex-start',

            maxHeight: '1vh',
          }}
        >
          {' '}
          Response
        </Box>
      </Box>
      <<Divider sx={{ width: '100%', color: 'black' }} />>
 
      {response !== undefined ? (
        <Paper
          sx={{
            backgroundColor: response ? '#54B435' : '#FF6464',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <Box
            sx={{
              m: '20px',
              width: '40%',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {test}
          </Box>

          <Box
            sx={{
              m: '20px',
              width: '40%',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {response ? 'Success' : 'Failed'}
          </Box>
        </Paper>
      ) : (
        <Box sx={{ minHeight: '70%' }}>
        </Box>
      )}
    </Paper>
  );
}
