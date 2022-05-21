import { useState } from 'react';

// import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ReplyForm(props) {

  const { setTabValue, addMessage, handleClose, itemId, name, offered, loggedInUserID, loggedInUser, creatorId } = props;

  const [messageBody, setMessageBody] = useState('');
  
  const handleMessageBodyChange = (event) => {
    setMessageBody(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const newMessageFormData = new FormData();
    newMessageFormData.append("itemId", itemId);
    newMessageFormData.append("userId", loggedInUserID);
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
          value={loggedInUserID}
          // value={loggedInUser.id}
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
}
