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
export default function HistoryBlock(props) {
  const dispatch = useDispatch();

  // Blocks that will be mapped using UUID as key
  // Each block will have a button to remove it from the history
  // Each block will have a button to see the response by overwriting the current response in the redux store

  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.reqResInfo.method}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.reqResInfo.url}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              dispatch(deleteReqRes(props.reqResInfo.id));
            }}
          ></Button>
          <Button
            onClick={() => {
              dispatch(setResponse(props.reqResInfo.response));
            }}
          >
            See Response
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
