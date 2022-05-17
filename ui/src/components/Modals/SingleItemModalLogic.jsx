// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import React from 'react';
// import Form from './Form';
import {
  // Box,
  Button,
  // Typography,
  // Modal
} from '@mui/material'
import SingleItemModal from './SingleItemModal';

export default function SingleItemModalLogic() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Single Item Modal</Button>
      <SingleItemModal
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}