import {
  Modal,
  Typography,
  Box,
  Divider,
  CardHeader } from '@mui/material';
import Message from './Message';
import { format } from 'timeago.js';
import Form from './Form';
import { flexbox } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SingleConversationModal(props) {
  const {open, handleClose, image, name, messages} = props

  const messagesArray = messages.map(message => {
    return (
        <Message
          key={message.id}
          user={message.userId}
          createdAt={message.createdAt}
          body={message.body}
        />
    )
  })

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="body1">{name}</Typography>
          <img src={image} alt={name} width={200}/>
        </Box>
        {messagesArray}
        {/* <Divider />
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="body1">{messages[0].userId}</Typography>
          <Typography variant="body1">{format(messages[0].createdAt)}</Typography>
        </Box>
        <Typography variant="body2" gutterBottom>{messages[0].body}</Typography>
        <Divider />
        <Form /> */}
      </Box>
      
      
    </Modal>
  )
} 