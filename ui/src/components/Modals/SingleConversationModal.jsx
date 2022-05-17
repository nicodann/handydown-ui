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
        <Typography variant="body1">From User {username}</Typography>
        <Typography variant="body1">Four Days Ago {dateCreated}</Typography>
      </Box>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.{body}
      </Typography>
      <Divider />
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Typography>
      <Divider />
      <Form />
    </ Modal>
  )
} 