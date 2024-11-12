  import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
  import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Alert
  } from '@mui/material';
import { useAppContext } from '../../context/state';
import useItems from '../../hooks/useItems';
import { loginUser } from '../../routes/user';
import useLoggedInUser from '../../hooks/useLoggedInUser';

type LoginFormProps = {
  loginFormOpen: boolean,
  setLoginFormOpen: Dispatch<SetStateAction<boolean>>,
  setTransition: Dispatch<SetStateAction<boolean>>,
  setTransitionPhrase: Dispatch<SetStateAction<string>>
}

export default function LoginForm(props: LoginFormProps) {
  const { 
    loginFormOpen,
    setLoginFormOpen,
    setTransition,
    setTransitionPhrase
  } = props;

  const [formValue, setFormValue] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
    setAlertDisplay("none");
  };
  const[alertDisplay, setAlertDisplay] = useState("none")
  const [errorMessage, setErrorMessage] = useState('')

  const alertStyles = {
    marginTop: 2, 
    display: alertDisplay
  }
  const loggedInUser = useLoggedInUser();

  const {
    setLoggedInUser,
    setTabbedItems,
    setTabValue
  } = useAppContext()

  const { items } = useItems();

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const loginFormData = new FormData();
    // loginFormData.append("username", formValue.username);
    // loginFormData.append("password", formValue.password);
    const loginFormData = {
      username: formValue.username,
      password: formValue.password
    }
    loginUser(
      loginFormData,
      setLoggedInUser,
      setTabbedItems,
      setTabValue,
      loggedInUser,
      items
    )
      .then(message => {
        if ((message && message.includes("password")) || (message && message.includes("username"))) {
          setErrorMessage(message);
          setAlertDisplay("flex")
        } else {
          setLoginFormOpen(false);
          setTransitionPhrase('Logging In...')
          setTransition(true);
          setTimeout(() => {
            setTransition(false);
            setTransitionPhrase('Loading...')
          }, 2000);
        }
      })
      .catch(err => console.log(err))
    
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
        width: '100%',
        maxWidth: 600,
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
            <Alert severity="error" sx={alertStyles}>{errorMessage}</Alert>
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
