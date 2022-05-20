  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
  } from '@mui/material';
  // const bcrypt = require('bcrypt');

  function LoginForm(props) {
    const { loginFormOpen, setLoginFormOpen, loginUser } = props;

    // const hashedPass = bcrypt.hashSync(password, 10);

    const [formValue, setFormValue] = useState({
      username: '',
      password: ''
    });

    const handleChange = (event) => {
      setFormValue({
        ...formValue,
        [event.target.name]: event.target.value
      });
    };

    useEffect(() => {
      console.log("formValue:", formValue)
    })

    const handleSubmit = async (event) => {
      event.preventDefault();
      const loginFormData = new FormData();
      loginFormData.append("username", formValue.username);
      loginFormData.append("password", formValue.password);
      loginUser(loginFormData)
      setLoginFormOpen(false);
      
    };

    return (
      <Modal
        open={loginFormOpen}
        // open={true}
        onClose={() => setLoginFormOpen(false)}
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
          <Typography variant="h4">Login</Typography>
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
                name="password"
                label="Password"
                sx={{mt:1}}
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
                  onClick={() => setLoginFormOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
        </Box>
      </Modal>
    )
  };

  export default LoginForm;