import * as React from 'react';
import { 
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
// import { PinDrop } from '@mui/icons-material'; 
import { format } from 'timeago.js';

export default function Item(props) {
  const { name, description, image, offered, createdAt, location, userName } = props;

  return (
    <Card style={{height: '100%'}}>
      <CardActionArea style={{display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%', height: '100%'}} > 
        <CardHeader
          avatar={
            <Avatar> 
              {offered ? "O" : "W"}
            </Avatar>
          }
          title={name}
          subheader={format(createdAt)}
        />
        <CardMedia
          component="img"
          height="200"
          src={require('../images/baseball-glove.jpg')}
          alt={description}
        />
        <CardContent style={{flexGrow: 1}}>
          <Typography variant="body2" color="text.secondary">{description}</Typography>
        </CardContent>
        <CardActions style={{width: '100%', paddingLeft: '16px', paddingRight: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto'}}>
              <Typography display="block" gutterBottom>{location}</Typography>
              <Typography display="block" gutterBottom>{userName}</Typography>
        </CardActions>
      </CardActionArea>
      </Card>
  );
}
