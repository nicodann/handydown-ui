import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography
 } from '@mui/material';

export default function ReplyForm(props) {

  const {
    itemId,
    name,
    offered,
    creatorId,
    loggedInUser,
    addMessage,
    handleClose,
    setTabValue
  } = props;

  const [messageBody, setMessageBody] = useState('');
  
  const handleMessageBodyChange = (event) => {
    setMessageBody(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const newMessageFormData = new FormData();
    newMessageFormData.append("itemId", itemId);
    newMessageFormData.append("userId", loggedInUser.id);
    newMessageFormData.append("otherUserId", creatorId);
    newMessageFormData.append("body", messageBody);
    addMessage(newMessageFormData);
    setTabValue(3);
    handleClose();
  };
  
  return (
    <Box sx={{mt: 3}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography>New Message</Typography>
        <Typography component="span">Re: {name} - {offered ? "Offered" : "Wanted"}</Typography>
      </Box>
      <Box component="form" onSubmit={handleMessageSubmit} sx={{ display: "flex", flexDirection: "column"}}>
        <TextField
          type="text"
          name="body"
          placeholder="Write message here"
          multiline
          rows={5}
          sx={{ width: '100%'}}
          onChange={handleMessageBodyChange}
        />
        {/* <input
          type="hidden"
          name="itemId"
          value={itemId}
        />
        <input
          type="hidden"
          name="userId"
          value={loggedInUser.id}
        />
        <input
          type="hidden"
          name="otherUserId"
          value={creatorId}
        /> */}
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Button type="submit" variant="contained" sx={{mt: 2}}>Reply</Button>
        </Box>
      </Box>
    </Box>
  );
};
