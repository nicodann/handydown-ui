import React from 'react';
import ReplyForm from './ReplyForm';
import {
  Box,
  Button,
  Typography,
  Modal,
  Divider,
  Card,
  CardActionArea,
  CardHeader,
  // 'onClick' is not defined         no-undef
  // offered' is not defined         no-undef
  // 'username' is not defined 
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'timeago.js';
import { axios } from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SingleItemModal(props) {

  const { name, description, offered, image, createdAt, open, handleClose, userName, location, loggedInUserID, itemId, creatorId, tabIndex } = props;
  console.log('SIMPROPS', props);

  const replyMessageFunction = (message) => {
    console.log('MESSAGE', message);
    // retrieve itemId userId
    const data = { itemId, creatorId, loggedInUserID, message }
    try {
      axios.post('/api/conversations', {data} )
        .then((response) => {
          console.log('response', response);
        })
    } catch(err) {

    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      {/* <Card style={{height: '100%'}}>
          <CardHeader
            style={{justifyContent: 'space-between', width: '100%'}}
            title={name}
            subheader={format(createdAt)}
            action={ offered ? <Button component="div" color="success">Offered</Button> : <Button component="div" color="error">Wanted</Button>}
          />
          <CardMedia
            component="img"
            height="200"
            src={image}
            alt={name}
          />
          <CardContent style={{flexGrow: 1, width: '100%' }}>
            <Typography noWrap variant="body2" color="text.secondary">{description}</Typography>
          </CardContent>
          <CardActions style={{width: '100%', paddingLeft: '16px', paddingRight: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto'}}>
            <Typography display="block" gutterBottom>{location}</Typography>
            <Typography display="block" gutterBottom>{userName}</Typography>
          </CardActions>
        </Card> */}
        {/* <Box
          sx={{
            height: 100,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          
        /> */}
        
          <Box
            sx={{display: 'flex', justifyContent: 'space-between'}}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {name}
            </Typography>
            {offered ? <Button component="div" color="success">Offered</Button> : <Button component="div" color="error">Wanted</Button>}
          </Box>
          <Typography variant="subheader" display="block" >
            {format(createdAt)}
          </Typography>
        
        <img src={image} style={{height: '200px', width: '100%', objectFit: 'cover', paddingTop: '16px'}} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '24px'}}>
          <Typography display="block">{location}</Typography>
          <Typography display="block">{userName}</Typography>
        </Box>
        <Divider sx={{mt: 3}} />
        {console.log(
          'loggedInUserID:', loggedInUserID,
          'creatorId:', creatorId
,           )}
        {loggedInUserID !== creatorId  &&  <ReplyForm replyMessageFunction={replyMessageFunction} />}
        {tabIndex === 2 && loggedInUserID === creatorId &&
          <Button variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
        }
      </Box>
    </Modal>
  );
}