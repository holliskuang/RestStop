import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setResponse } from '../../../state/currentReqRes.js';
import { setResponseMode } from '../../../state/currentReqRes.js';

export default function TimeBlock(props) {
  const dispatch = useDispatch();
  const date = props.time;
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
          <Typography>{props.time}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
   
              dispatch(setResponseMode(props.reqResInfo.object.responseMode));
              dispatch(setResponse(props.reqResInfo.object));
            }}
          >
            See Response
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
