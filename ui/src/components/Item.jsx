import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

export default function Item(props) {
  const { name, description, image, offered, createdAt } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          src={require('../images/baseball-glove.jpg')}
          alt={description}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{name}</Typography>
          <Typography variant="body2" color="text.secondary">{description}</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
              <Typography variant="button" display="block" gutterBottom>Location</Typography>
              <Typography variant="button" display="block" gutterBottom>{createdAt}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
