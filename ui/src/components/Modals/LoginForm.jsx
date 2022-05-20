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
    const { loginFormOpen, handleLoginFormClose, setLoggedInUser } = props;

    // const hashedPass = bcrypt.hashSync(password, 10);

    const [formValue, setFormValue] = useState({
      username: '',
      password: ''
    });

    // const str2bool = (value) => {
    //   if (value && typeof value === "string") {
    //        if (value.toLowerCase() === "true") return true;
    //        if (value.toLowerCase() === "false") return false;
    //   }
    //   return value;
    // };

    const handleChange = (event) => {
      setFormValue({
        ...formValue,
        [event.target.name]: event.target.value
      });
    };

    // useEffect(() => {
    //   console.log(formValue)
    // })

    const handleSubmit = async (event) => {
      event.preventDefault();
      const loginFormData = new FormData();
      console.log("loginFormData", loginFormData)
      try {
        const response = await axios({
          method: 'post',
          url: '/users/login',
          data: loginFormData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("responseData: ",response.data)
        setLoggedInUser(response.data);
        loginFormOpen(false);
      } catch(error) {
        console.log(error);
      }
    };

    return (
      <Modal
        // open={loginFormOpen}
        open={true}
        onClose={handleLoginFormClose}
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
              {/* <FormControl>
                <RadioGroup row name="offered" defaultValue="true" onChange={handleChange}>
                  <FormControlLabel 
                    value="true"
                    control={<Radio />}
                    label="Offering"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Wanted"
                  />
                </RadioGroup>
              </FormControl> */}
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
              {/* <Button
            component="label"
            variant="outlined"
            sx={{mt: 2}}
          >
            Add an Image
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              hidden
              id="file"
            />
          </Button> */}
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
                  onClick={handleLoginFormClose}
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