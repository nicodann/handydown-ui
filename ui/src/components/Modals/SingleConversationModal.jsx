import { format } from 'timeago.js';
import {
  Box,
  CardHeader ,
  Divider,
  Modal,
  Typography,
} from '@mui/material';
import { flexbox } from '@mui/system';
import Message from './Message';
import ReplyForm from './ReplyForm';

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
    itemId,
    name,
    offered, 
    image, 
    creator, 
    receiver,
    messages,
    loggedInUser,
    addMessage,
    open, 
    handleClose,
    setTabValue 
  } = props

  const hiddenBodyStyle = {
    height: '20px',
    overflow:'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: 'nowrap',
    marginTop: 2
  };

  const messagesArray = messages.map((message, index) => {
    const bodyStyle = (index === messages.length - 1) ? {...hiddenBodyStyle, ...{ height: 'auto', overflow: 'visible', whiteSpace: 'wrap' } } : hiddenBodyStyle;
    return (
        <Message
          key={message.id}
          user={creator.id === message.userId ? creator.username : receiver.username}
          aligned={creator.id === message.userId ? "left" : "right"}
          createdAt={message.createdAt}
          body={message.body}
          style={bodyStyle}
        />
    )
  });

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
        <ReplyForm
          itemId={itemId} //
          name={name}
          offered={offered}
          loggedInUser={loggedInUser}
          creatorId={creator.id}
          receiverId={receiver.id}
          addMessage={addMessage}
          handleClose={handleClose}
          setTabValue={setTabValue}
        />
      </Box>
    </Modal>
  )
};
