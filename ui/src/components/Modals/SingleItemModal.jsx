import { format } from 'timeago.js';
import {
  Box,
  Button,
  Typography,
  Modal,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
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

export default function SingleItemModal(props) {

  const {
    itemId,
    name,
    description,
    offered,
    image,
    createdAt,
    creatorId,
    location,
    loggedInUser,
    addMessage,
    deleteItem,
    open,
    handleClose,
    setTabValue,
    tabIndex,
    handleEditClick,
    item
  } = props;

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    deleteItem(itemId, offered);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{display: 'flex', justifyContent: 'space-between'}}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {name}
          </Typography>
          {offered ? <Button component="div" color="success" sx={{mr: -1}}>Offered</Button> : <Button component="div" color="error" sx={{mr: -1}}>Wanted</Button>}
        </Box>
        <Box style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography>
            {format(createdAt)}
          </Typography>
          <Box style={{display: 'flex', justifyContent: 'space-between'}}>
            <LocationOnIcon color="primary"/>
            <Typography display="block">{location}</Typography>
          </Box>
        </Box>
        <img alt={name} src={image} style={{height: '100%', maxHeight: '350px', width: '100%', objectFit: 'cover', paddingTop: '16px'}} />
        <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
          {description}
        </Typography>
        {loggedInUser && loggedInUser.id !== creatorId  &&  
          <ReplyForm 
            itemId={itemId}
            name={name}
            offered={offered}
            loggedInUser={loggedInUser}
            creatorId={creatorId}
            receiverId={null}
            addMessage={addMessage}
            handleClose={handleClose}
            setTabValue={setTabValue}
          />}
        {loggedInUser && tabIndex === 2 && loggedInUser.id === creatorId &&
          <Box>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              sx={{mt: 3}}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
            <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{mt: 3}}
            onClick={() => handleEditClick(item)}
            >
              Edit
            </Button>
          </Box>
          }
        </Box>
    </Modal>
  );
};