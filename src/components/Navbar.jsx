import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { VolunteerActivism } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppContext } from '../context/state';
import {
  loginUser,
  logoutUser,
  registerUser
} from '../routes/user'
import { addItem } from '../routes/item';
import { useState } from 'react';


export default function Navbar(props) {
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [regFormOpen, setRegFormOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const {
    RegistrationForm,
    LoginForm,
    setTransition,
    setTransitionPhrase,
    AddItemForm,
  } = props;

  const {
    loggedInUser
  } = useAppContext()

  return (
    <AppBar position="sticky" elevation={0}>
    <Toolbar 
    sx={{
      display: 'flex', 
      WebkitFlexDirection: {xs:'column', sm: 'row'},
      pb:{xs:4, sm: 0}
    }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        // sx={{ mr: 2 }}
        onClick={() => window.location.replace("http://localhost:3000")}
      >
        <VolunteerActivism />
      </IconButton>
      <Link sx={{ flexGrow: 1 }} href="http://localhost:3000" underline="none" color="inherit">
        <Typography variant="h6">
          HandyDown
        </Typography>
      </Link>
      {!loggedInUser ?
        <>
          <Button 
            color="inherit"
            variant="text"
            onClick={() => setLoginFormOpen(true)}
          >
            Login
          </Button>
          <LoginForm 
            loginFormOpen={loginFormOpen}
            setLoginFormOpen={setLoginFormOpen}
            loginUser={loginUser}
            setTransition={setTransition}
            setTransitionPhrase={setTransitionPhrase}            
          />
          <Button 
            color="inherit"
            variant="text"
            onClick={() => setRegFormOpen(true)}
          >
            Register
          </Button>
          <RegistrationForm 
            registrationFormOpen={regFormOpen}
            setRegistrationFormOpen={setRegFormOpen}
            registerUser={registerUser}
          />
        </>
      :
        <>
          <IconButton style={{marginRight: '-10px'}}>
            <AccountCircleIcon style={{fill: "white"}}/>
          </IconButton>
          <Button
            color="inherit"
            component="span"
          >
            {loggedInUser.username}
          </Button>
          <Button
            color="inherit"
            variant="text"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </>
      }

        <Button
          color="warning"
          variant="contained"
          // onClick={() => setFormOpen(true)}
          onClick={loggedInUser ? () => setFormOpen(true) : () => setLoginFormOpen(true)}
          sx={{ml: 1}}
        >
          Make A Post
        </Button>
        <AddItemForm 
          color="inherit" 
          formOpen={formOpen} 
          addItem={addItem} 
          loggedInUser={loggedInUser} 
          handleFormClose={() => setFormOpen(false)} 
        />
    </Toolbar>
    </AppBar>
  );
};