import { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

export default function RegistrationForm(props) {
  const { registrationFormOpen, setRegistrationFormOpen, registerUser } = props;

  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    password: '',
    location: ''
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registrationFormData = new FormData();
    registrationFormData.append("username", formValue.username);
    registrationFormData.append("email", formValue.email);
    registrationFormData.append("password", formValue.password);
    registrationFormData.append("location", formValue.location);
    registerUser(registrationFormData);
    setRegistrationFormOpen(false);
    
  };

  return (
    <Modal
      open={registrationFormOpen}
      onClose={() => setRegistrationFormOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, 
      }}>
        <Typography variant="h4">Register</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column"}}>
            <TextField
              type="text"
              name="username"
              label="Username"
              sx={{ mt: 1}}
              onChange={handleChange}
            />
            <TextField
              type="text"
              name="email"
              label="Email"
              sx={{ mt: 1}}
              onChange={handleChange}
            />
            <TextField
              type="text"
              name="password"
              label="Password"
              sx={{mt:1}}
              onChange={handleChange}
            />
            <TextField
              type="text"
              name="location"
              label="Location"
              sx={{ mt: 1}}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
              <Button
                variant="outlined" 
                sx={{ml:1}}
                onClick={() => setRegistrationFormOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
      </Box>
    </Modal>
  )
};
