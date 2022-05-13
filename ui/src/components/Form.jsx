import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MinHeightTextarea() {
  return (
    <>
    <Typography variant="subtitle2">New Message Re: <Typography component="span" variant="caption">Baseball Glove - Offered</Typography></Typography>
    <TextareaAutosize
      aria-label="minimum height"
      minRows={6}
      placeholder="Minimum 3 rows"
      // multiline
      style={{ width: '100%' }}
    />
    <div>
      <Button variant="outlined">Reply</Button>
    </div>
    </>
  );
}
