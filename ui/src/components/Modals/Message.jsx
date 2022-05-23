import { format } from 'timeago.js';
import {
  Divider,
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
    padding: 1
  }
  
  const newStyle = aligned === "left" ? {...style, ...{marginRight: 50, background: "lightblue"}} : {...style,...{marginLeft: 50, background: "lightgreen"}}  

  return (
    <Card sx={newStyle}>
      {/* <Divider /> */}
      <Box sx={{
        display:"flex", 
        justifyContent:"space-between"
      }}>
        <Typography variant="body1">{user}</Typography>
        <Typography variant="body1">{format(createdAt)}</Typography>
      </Box>
      <Typography variant="body2" gutterBottom sx={bodyStyle}>{body}</Typography>
    </Card>
  )
};