import {
  Modal,
  Typography,
  Box,
  Divider,
  CardHeader } from '@mui/material';
import Message from './Message';
import { format } from 'timeago.js';
import ReplyForm from './ReplyForm';
import { flexbox } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SingleConversationModal(props) {
  const {
    open, 
    handleClose, 
    image, 
    name, 
    messages, 
    creator, 
    receiver
  } = props

  const hiddenBodyStyle = {
    height: '20px',
    overflow:'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: 'nowrap'
  }

  const messagesArray = messages.map((message, index) => {
    const bodyStyle = (index === messages.length - 1) ? {...hiddenBodyStyle, ...{ height: 'auto', overflow: 'visible', whiteSpace: 'wrap' } } : hiddenBodyStyle;
    return (
        <Message
          key={message.id}
          user={creator.id === message.userId ? creator.username : receiver.username}
          createdAt={message.createdAt}
          body={message.body}
          style={bodyStyle}
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
        <Box sx={{display:"flex", justifyContent:"space-between", marginBottom: '30px'}}>
          <Typography variant="h5">{name}</Typography>
          <img src={image} alt={name} width={200}/>
        </Box >
        {messagesArray}
        <ReplyForm />
      </Box>
      
      
    </Modal>
  )
} 