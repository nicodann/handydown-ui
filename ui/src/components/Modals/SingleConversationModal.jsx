import {
  Divider,
  Modal,
  Typography,
  Box } from '@mui/material';
import Form from './Form';
export default function SingleConversationModal(props) {
  // const {otherPartyName, dateCreated, body, open, handleClose } = props;
  const {open, handleClose, otherPartyName, image, dateCreated, body, name} = props

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box display="flexbox" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">{otherPartyName}</Typography>
        <img src={image} alt={name}/>
        <Typography variant="body1">{dateCreated}</Typography>

       </Box>
       <Typography variant="body2" gutterBottom>
         {body}
       </Typography>

    </Modal>
    // <Modal
    //         // open={open}
    //         // onClose={handleClose}
    //         aria-labelledby="modal-modal-title"
    //         aria-describedby="modal-modal-description"
    //       >
    //   <Box display="flexbox" justifyContent="space-between" alignItems="center">
    //     <Typography variant="body1">{otherPartyName}</Typography>
    //     {/* <Typography variant="body1">{dateCreated}</Typography> */}
    //   </Box>
    //   <Typography variant="body2" gutterBottom>
    //     {/* {body} */}
    //   </Typography>
    //   <Form />
    //   <Divider />
    // </ Modal>
  )
} 