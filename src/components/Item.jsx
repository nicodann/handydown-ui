import { format } from 'timeago.js';
import { 
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

export default function Item(props) {
  
  const { offered, name, createdAt, image, description, location, username, onClick } = props;
    
    return (
    <Grid item style={{display: 'flex'}} xs={4} >
      <Card style={{height: '100%', width: '%25'}} onClick={onClick}>
        <CardActionArea style={{display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%', height: '100%'}} > 
          <CardHeader
            style={{justifyContent: 'space-between', width: '100%', minWidth: '350px', minHeight: '120px', alignItems: 'flex-start'}}
            title={name}
            subheader={format(createdAt) }
            action={ offered ? <Button component="div" color="primary">Offered</Button> : <Button component="div" color="warning">Wanted</Button>}
          />
          <CardMedia
            component="img"
            // height="200"
            width="100%"
            src={image}
            alt={name}
          />
          <CardContent style={{flexGrow: 1, width: '100%' }}>
            <Typography noWrap variant="body2" color="text.secondary">{description}</Typography>
          </CardContent>
          <CardActions style={{width: '100%', paddingLeft: '16px', paddingRight: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto'}}>
            <Typography display="block" gutterBottom>{location}</Typography>
            <Typography display="block" gutterBottom>{username}</Typography>
          </CardActions>
        </CardActionArea>
        </Card>
    </Grid>
    );
};
