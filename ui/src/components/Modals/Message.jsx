import Form from './Form';
import {
  Divider,
  Typography,
  Box } from '@mui/material';
import { format } from 'timeago.js';

export default function Message(props) {
  const {user, createdAt, body } = props;
  return (
    <>
      <Divider />
      <Box sx={{display:"flex", justifyContent:"space-between"}}>
        <Typography variant="body1">{user}</Typography>
        <Typography variant="body1">{format(createdAt)}</Typography>
      </Box>
      <Typography variant="body2" gutterBottom>{body}</Typography>
      <Divider />
      <Form /> 
    </>
  )
};