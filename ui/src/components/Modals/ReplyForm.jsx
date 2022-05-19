import { useState } from 'react';

// import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ReplyForm(props) {

  const { replyMessageFunction } = props;

  const [replyMessage, setReplyMessage] = useState('');
console.log('replyMessage!!!', replyMessage)
  return (
    <Box sx={{mt: 3}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography>New Message</Typography>
        <Typography component="span">Re: Baseball Glove - Offered</Typography>
      </Box>
      <TextField
        type="text"
        name="description"
        label="Dear HandyDown User,"
        multiline
        rows={5}
        sx={{ width: '100%'}}
        // onChange={handleChange}
      />
      {/* <TextareaAutosize
        aria-label="minimum height"
        minRows={6}
        placeholder="Minimum 3 rows"
        // multiline
        style={{ width: '100%' }}
        value={replyMessage}
        onChange={(e) => setReplyMessage(e.target.value) }
      /> */}
        <Button onClick={() => replyMessageFunction(replyMessage)} variant="outlined" sx={{mt: 2}}>Reply</Button>
    </Box>
  );
}
