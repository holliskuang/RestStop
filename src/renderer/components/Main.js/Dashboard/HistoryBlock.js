import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import { setResponse } from '../../../state/currentReqRes';
import { deleteReqRes } from '../../../state/historyReqRes';
import { saveRequestToDB } from './DashboardController';
export default function HistoryBlock(props) {
  const dispatch = useDispatch();
  const reqResHistory = useSelector((state) => state.historyReqRes);
  // Blocks that will be mapped using UUID as key
  // Each block will have a button to remove it from the history
  // Each block will have a button to see the response by overwriting the current response in the redux store
  console.log(props);
  return (
    
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.reqResInfo.object.method}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.reqResInfo.object.url}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              dispatch(deleteReqRes(props.reqResInfo.object.id));
              console.log(reqResHistory);
            }}
          >
            {' '}
            Remove{' '}
          </Button>
          <Button
            onClick={() => {
              dispatch(setResponse(props.reqResInfo.object.response));
            }}
          >
            See Response
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
