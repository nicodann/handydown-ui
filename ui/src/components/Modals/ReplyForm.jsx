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
    receiverId,
    loggedInUser,
    addMessage,
    handleClose,
    setTabValue,
    isSingleConversationModal,
    setModalProps,
  } = props;

  console.log('typeof creatorId', typeof creatorId);
  console.log('typeof receiverId', typeof receiverId);
  const [messageBody, setMessageBody] = useState('');

  const findOtherUserId = () =>
    receiverId === null ? creatorId : (loggedInUser.id === receiverId ? creatorId : receiverId);

  const handleMessageBodyChange = (event) => {
    setMessageBody(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const newMessageFormData = new FormData();
    newMessageFormData.append("itemId", itemId);
    newMessageFormData.append("userId", loggedInUser.id);
    newMessageFormData.append("otherUserId", findOtherUserId());
    newMessageFormData.append("body", messageBody);
    const newConversation = addMessage(newMessageFormData);
    if (isSingleConversationModal) {
      setModalProps(newConversation)
    } else {
      setTabValue(3);
      handleClose();
    }
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
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Button type="submit" variant="contained" sx={{mt: 2}}>Reply</Button>
        </Box>
      </Box>
    </Box>
  );
};
