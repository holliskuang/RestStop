import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';

export default function HistoryBlock(props) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.method}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.url}
          </Typography>
        </CardContent>
        <CardActions>
          <Button> Remove </Button>
          <Button> See Response</Button>
        </CardActions>
      </Card>
    </div>
  );
}
