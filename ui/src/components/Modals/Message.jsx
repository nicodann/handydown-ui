import { format } from 'timeago.js';
import {
  Divider,
  Typography,
  Box } from '@mui/material';

export default function Message(props) {
  const {user, createdAt, body, style } = props;
  return (
    <>
      <Divider />
      <Box sx={{display:"flex", justifyContent:"space-between"}}>
        <Typography variant="body1">{user}</Typography>
        <Typography variant="body1">{format(createdAt)}</Typography>
      </Box>
      <Typography variant="body2" gutterBottom sx={style}>{body}</Typography>
    </>
  )
};