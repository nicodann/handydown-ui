import React from 'react';
import ReplyForm from './Form';
import {
  Box,
  Button,
  Typography,
  Modal
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'timeago.js';
import { axios } from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SingleItemModal(props) {

  const { open, handleClose, image, name, description, userName, location, createdAt, loggedInUserID, itemId, creatorId } = props;
console.log(props);

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
            // component={image}
            sx={{
              height: 100,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt={name}
            src={"http://localhost:8080/images/glove2.jpg"}
            // src={require(`../../images/${image}`)}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
            <Typography variant="button" display="block" gutterBottom>
              {location} 
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              {userName}
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              {format(createdAt)}
            </Typography>
          </Box>
          {loggedInUserID !== creatorId  ? 
            <Button variant="contained" startIcon={<DeleteIcon />}>Delete</Button> : 
            <ReplyForm 
              replyMessageFunction={replyMessageFunction}
            />
          }
         {/* {loggedInUserID !== item.userId  ? 
            <Button variant="contained" startIcon={<DeleteIcon />}>Delete</Button> : 
            <ReplyForm />
          } */}
        </Box>
      </Modal>
  );
}