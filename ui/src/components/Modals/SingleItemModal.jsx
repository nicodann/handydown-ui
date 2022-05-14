// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import React from 'react';
import Form from '../Form';
import {
  Box,
  Button,
  Typography,
  Modal
} from '@mui/material'

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

export default function SingleItemModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Single Item Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="Baseball Glove"
            src={require('../../images/baseball-glove.jpg')}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Baseball Glove
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
            <Typography variant="button" display="block" gutterBottom>
              Location 
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Username 
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Created At
            </Typography>
          </Box>
          <Form />
        </Box>
      </Modal>
    </div>
  );
}