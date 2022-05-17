import {
  Divider,
  Modal,
  Typography } from '@mui/material';
import Form from './Form';
import Box from "@mui/material/Box";
export default function SingleConversationModal(props) {
  const {username, dateCreated, body, open, handleClose } = props;

  return (
    <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
      <Box display="flexbox" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">{username}</Typography>
        <Typography variant="body1">{dateCreated}</Typography>
      </Box>
      <Typography variant="body2" gutterBottom>
        {body}
      </Typography>
      <Form />
      <Divider />
    </ Modal>
  )
} 