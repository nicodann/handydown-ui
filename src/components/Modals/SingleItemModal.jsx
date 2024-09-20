import { useState } from 'react';
import { format } from 'timeago.js';
import {
  Box,
  Button,
  Typography,
  Modal,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import ReplyForm from './ReplyForm';
import EditItemForm from './EditItemForm';

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
    item,
    editItem
  } = props;

  const [editItemFormOpen, setEditItemFormOpen] = useState(false)
  const [transition, setTransition] = useState(false);
  const [transitionPhrase, setTransitionPhrase] = useState('');

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    setTransition(true);
    setTransitionPhrase('Deleting Item...');
    setTimeout(() => {
      setTransition(false);
      deleteItem(itemId, offered);
      handleClose();
    }, 1000)
  };

  // const handleEditClick = async (item) => {
  //   setEditItemFormOpen(true);
  // }

  if (transition) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ 
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: 800,
           height: 600,
           bgcolor: 'background.paper',
           border: '2px solid #000',
           boxShadow: 24,
           p: 4,
          
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column'
        } }>
          <CircularProgress size={80} />
          <Typography sx={{mt: 2}}>{transitionPhrase}</Typography>
        </Box>
      </Modal>
    )
  } else {
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
          <Typography id="modal-modal-title" variant="h4" >
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
        <Box style={{display: 'flex', justifyContent: 'center'}}> 
          <img alt={name} src={image} style={{maxHeight: '350px', paddingTop: '16px'}} />
        </Box>
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
            isSingleConversationModal={false}
            setMyMessages={null}
            myMessages={null}
          />}
        {loggedInUser && tabIndex === 2 && loggedInUser.id === creatorId &&
          <Box >
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
            sx={{mt: 3, ml: 2}}
            onClick={() => setEditItemFormOpen(true)}
            >
              Edit
            </Button>
            <EditItemForm 
              loggedInUser={loggedInUser}
              formOpen={editItemFormOpen}
              handleFormClose={() => setEditItemFormOpen(false)}
              item={item}
              editItem={editItem}
            />
          </Box>
          }
        </Box>
    </Modal>
  )
  }
};