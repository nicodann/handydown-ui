import * as React from 'react';
import { 
  Card,
  CardHeader,
  Button,
  Avatar,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Box,
} from '@mui/material';
// import { PinDrop } from '@mui/icons-material'; 
import { format } from 'timeago.js';

export default function Item(props) {
  const { name, description, image, offered, createdAt, location, userName } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
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
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="div">{name}</Typography> */}
          <Typography variant="body2" color="text.secondary">{description}</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
              <Typography display="block" gutterBottom>{location}</Typography>
              <Typography display="block" gutterBottom>{userName}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
