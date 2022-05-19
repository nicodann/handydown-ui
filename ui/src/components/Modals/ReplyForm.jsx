import { useState } from 'react';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ReplyForm(props) {

  const { replyMessageFunction } = props;

  const [replyMessage, setReplyMessage] = useState('');
console.log('replyMessage!!!', replyMessage)
  return (
    <>
    <Typography variant="subtitle2">New Message Re: <Typography component="span" variant="caption">Baseball Glove - Offered</Typography></Typography>
    <TextareaAutosize
      aria-label="minimum height"
      minRows={6}
      placeholder="Minimum 3 rows"
      // multiline
      style={{ width: '100%' }}
      value={replyMessage}
      onChange={(e) => setReplyMessage(e.target.value) }
    />
    <div>
      <Button onClick={() => replyMessageFunction(replyMessage)} variant="outlined">Reply</Button>
    </div>
    </>
  );
}
