import React from 'react';
import ReplyForm from './ReplyForm';
import {
  Box,
  Button,
  Typography,
  Modal,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'timeago.js';
import { axios } from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SingleItemModal(props) {

  const { name, description, offered, image, createdAt, itemId, creatorId, userName, location, loggedInUserID, open, handleClose, tabIndex, deleteItem } = props;
  console.log('SIMPROPS', props);

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    console.log('delete button!!!!!!');
    deleteItem(itemId, offered);
  }

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
        <Box
          sx={{display: 'flex', justifyContent: 'space-between'}}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {name}
          </Typography>
          {offered ? <Button component="div" color="success" sx={{mr: -1}}>Offered</Button> : <Button component="div" color="error" sx={{mr: -1}}>Wanted</Button>}
        </Box>
        <Box style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography>
            {format(createdAt)}
          </Typography>
          <Box style={{display: 'flex', justifyContent: 'space-between'}}>
            <LocationOnIcon color="primary"/>
            <Typography display="block">{location}</Typography>
          </Box>
        </Box>
        <img alt={name} src={image} style={{height: '100%', maxHeight: '350px', width: '100%', objectFit: 'cover', paddingTop: '16px'}} />
        <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
          {description}
        </Typography>
        
        
        {console.log(
          'loggedInUserID:', loggedInUserID,
          'creatorId:', creatorId
,           )}
        {loggedInUserID !== creatorId  &&  
          <ReplyForm 
            replyMessageFunction={replyMessageFunction}
          />}
        {tabIndex === 2 && loggedInUserID === creatorId &&
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{mt: 3}}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        }
      </Box>
    </Modal>
  );
}