import React from 'react';
// import { styled } from '@mui/material/styles';
import { Box,
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { format } from 'timeago.js';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

function ItemList(props) {
  const { tabValue, tabIndex, items } = props;

  return (
    <div 
      role="tabpanel"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
    >
      {tabValue === tabIndex && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={6}>
            { items.map((item) => ( 
              <React.Fragment key={item.id}>
                <Grid item style={{display: 'flex'}} xs={4} >
                    <Card style={{height: '100%'}}>
                      <CardActionArea style={{display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%', height: '100%'}} > 
                        <CardHeader
                          avatar={
                            <Avatar> 
                              {item.offered ? "O" : "W"}
                            </Avatar>
                          }
                          title={item.name}
                          subheader={format(item.createdAt)}
                        />
                        <CardMedia
                          component="img"
                          height="200"
                          src={require('../images/baseball-glove.jpg')}
                          alt={item.description}
                        />
                        <CardContent style={{flexGrow: 1}}>
                          <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                        </CardContent>
                        <CardActions style={{width: '100%', paddingLeft: '16px', paddingRight: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto'}}>
                              <Typography display="block" gutterBottom>{item.user.location}</Typography>
                              <Typography display="block" gutterBottom>{item.user.username}</Typography>
                        </CardActions>
                      </CardActionArea>
                      </Card>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default ItemList;