import { format } from 'timeago.js';
import {
  Typography,
  Box,
  Card } from '@mui/material';

export default function Message(props) {
  const {
    user, 
    createdAt, 
    body, 
    bodyStyle,
    aligned } = props;

  const style = {
    padding: 1.5,
    marginBottom: 2
  }
  
  const newStyle = 
    aligned === "left" ? 
    {...style, ...{marginRight: 50, background: "lightblue"}} :
    {...style,...{marginLeft: 50, background: "lightgreen"}};

  return (
    <Card sx={newStyle}>
      <Box sx={{
        display:"flex", 
        justifyContent:"space-between",
        paddingBottom: 1.25
      }}>
        <Typography variant="body1">{user}</Typography>
        <Typography variant="body1">{format(createdAt)}</Typography>
      </Box>
      <Typography variant="body2" sx={bodyStyle}>{body}</Typography>
    </Card>
  )
};