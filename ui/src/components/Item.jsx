import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

export default function Item() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          src={require('../images/baseball-glove.jpg')}
          alt="baseball glove"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Baseball Glove
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
            <Typography variant="button" display="block" gutterBottom>
              Location 
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Created At
            </Typography>
        </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
