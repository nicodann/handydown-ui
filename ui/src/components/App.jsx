import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css'
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Link,
  Tabs,
  Tab,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { VolunteerActivism } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';
import ItemList from './ItemList';
import ConversationList from './ConversationList';
import AddItemForm from './Modals/AddItemForm';
import LoginForm from './Modals/LoginForm';
import RegistrationForm from './Modals/RegistrationForm';

export default function App() {

  // STATE
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [ITEMS, setITEMS] = useState(null);
  const [tabbedItems, setTabbedItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([])
  const [conversations, setConversations] = useState([]);
  const [tabValue, setTabValue ] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [regFormOpen, setRegFormOpen] = useState(false);
  const [transition, setTransition] = useState(false);

  const handleTransition = () => {
    setTransition(true);
          setTimeout(() => {
            setTransition(false);
          }, 1000);
  }
  // const checkLoggedInUser = async () => {
    //   try {
      //     const response = await axios({
        //       method: 'post',
        //       url: '/api/users/logged_in',
        //     });
        //     setLoggedInUser(response.data);
        //   } catch (error) {
          //     console.log('POST /api/users/logged_in', error.response.data)
          //     console.log(error);
          //   }
          // };
          
  // CHECK IF USER HAS PREVIOUSLY LOGGED IN
  useEffect(() => {

    // 👇️ set style on body element
    // document.body.style.backgroundColor = '#bbdefb';
    document.body.style.backgroundColor = '#f5f5f5';

    
  }, []);
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setLoggedInUser(foundUser);
    }
  }, [])

  // FETCH ALL ITEMS
  useEffect(() => {
    axios.get("/api/items")
    .then((items) => {
      setITEMS(items.data);
      console.log('HERE ARE THE ITEMS', items.data);
      return items.data;
    })
    .then((data) => {
      setTabbedItems(data.filter((item) => {
        if (loggedInUser) {
          return item.offered === true && item.userId !== loggedInUser.id; 
        } else {
          return item.offered === true
        }
      }))
  })
    .catch((error) => console.log(error));
  }, [loggedInUser]);

  // FETCH ALL CONVERSATIONS BELONGING TO LOGGED IN USER
  useEffect(() => {
    if (loggedInUser) {
      axios.get(`/api/conversations/by/user/${loggedInUser.id}`)
        .then((conversations) => {
          setConversations(conversations.data);
          console.log("HERE ARE THE CONVERSATIONS", conversations.data)
        })
        .catch((error) => console.log(error));

    }
    }, [loggedInUser]);

  // LOGIN
  const loginUser = async (loginFormData) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/users/login',
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(response.data));
      setLoggedInUser(response.data);
      setTabValue(0);
      setTabbedItems(ITEMS.filter((item) => item.offered && loggedInUser && item.userID !== loggedInUser.id));
    } catch(error) {
      const message = error.response.data;
      return message;
    }
  };

  // REGISTER
  const registerUser = async (registrationFormData) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/users',
        data: registrationFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoggedInUser(response.data);
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch(error) {
      console.log(error)
    }
  }

  // LOGOUT
  const logoutUser = async () => {
    console.log("logging out")
    // try {
    //   await axios({
    //     method: 'post',
    //     url: '/api/users/logout'
    //   })
    // } catch(error) {
    //   console.log(error);
    // }

    setLoggedInUser(null);
    localStorage.clear();
    setConversations([]);
    handleTransition();
    setTabValue(0);
    setTabbedItems(ITEMS.filter((item) => item.offered))
  };

  // ADD ITEM
  const addItem = async (newItemFormData) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/items',
        data: newItemFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newItem = response.data;
      setITEMS([newItem, ...ITEMS]);
      setTabValue(2);
      setTabbedItems([newItem, ...ITEMS.filter((item) => item.userId === loggedInUser.id)]);
    } catch(error) {
      console.log(error);
    }
  };

  // DELETE ITEM
  const deleteItem = async (itemId, offered) => {
    try {
      await axios.delete(`/api/items/${itemId}`);
      // handleTransition();
      if (tabValue === 2) {
        setTabbedItems(tabbedItems.filter((tabbedItem) => tabbedItem.id !== itemId));
      }
      setITEMS(ITEMS.filter((item) => item.id !== itemId));
    } catch(err) {
      console.log(err);
    }
  };

  // ADD MESSAGE
  const addMessage = async (newMessageFormData) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/messages',
        data: newMessageFormData,
      });
      console.log('returned conversation', response.data);
      const returnedConversation = response.data;
      const filteredConversations= conversations.filter(conversation => conversation.id !== returnedConversation.id);
      setConversations([returnedConversation, ...filteredConversations]);
      // console.log('returnedConversation', returnedConversation)
      return returnedConversation;
    } catch(err) {
      console.log(err);
    };
  };

  const handleTabClick = (_event, newTabValue) => {
    const currentTab = newTabValue;
    setSearchText('');

    if (currentTab === 0) {
      setTabbedItems(ITEMS.filter((item) => { 
        if (loggedInUser) {
          return item.offered === true && item.userId !== loggedInUser.id; 
        } else {
          return item.offered === true
        }
      }));
    } else if (currentTab === 1) {
      setTabbedItems(ITEMS.filter((item) => {
        if (loggedInUser) {
          return !item.offered && item.userId !== loggedInUser.id; 
        } else {
          return !item.offered
        }
      }));
    } else if (currentTab === 2) {
      if (loggedInUser) {
        setTabbedItems(ITEMS.filter((item) => item.userId === loggedInUser.id));
      } else {
        setTabbedItems([]);
      }
    }
    setTabValue(currentTab);
  };

  const handleSearchInput = (event) => {
    const keyword = event.target.value;

    if (keyword !== '') {
      setSearchedItems(tabbedItems.filter((item) => item.name.toLowerCase().startsWith(keyword.toLowerCase())));
    } else {
      setSearchedItems(tabbedItems);
    }

    setSearchText(keyword);
  };

  //MARK CONVO AS READ
  const markAsRead =  async (conversationId, readByWhom) => {
    try {
       await axios.put(`/api/conversations/${conversationId}`, {creatorOrReceiverId: readByWhom});
    } catch(err) {
      console.log(err);
    }
    
  }

  // RENDER

  if ((ITEMS === null) || (ITEMS && transition)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <CircularProgress size={80} />
      <Typography sx={{mt: 2}}>Loading...</Typography>
    </Box>
    )
  } else {

    return (
    <>
      <CssBaseline />
      <AppBar position="sticky" elevation="0">
        <Toolbar>
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
      
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: 1, borderBottom: 1, borderColor: 'divider', background: '#42A5F5' }}>
        <Tabs value={tabValue} onChange={handleTabClick}>
          <Tab label="Offers" sx={{color: 'white'}}/>
          <Tab label="Wanted" sx={{color: 'white'}}/>
          {/* <Tab label="My Items" />
          <Tab label="My Messages" /> */}
          <Tab 
            label="My Items"
            sx={{color: 'white'}} 
            style={
              loggedInUser ? { display: "inline-flex" } : {display: "none"} 
            } 
          />
          <Tab 
            label="My Messages"
            sx={{color: 'white'}} 
            style={
              loggedInUser ? { display: "inline-flex" } : {display: "none"} 
            } 
          />
        </Tabs>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: 4 }}>
        <TextField
          type="search"
          value={searchText}
          onChange={handleSearchInput}
          id="outlined-search"
          label="Search by item name..."
          sx={{ background: "white", visibility: (tabValue === 3 || tabbedItems.length === 0) ? 'hidden' : 'visible'}}
        />
      </Box>
      <Container maxWidth="lg" sx={{ py: 4}}>
        <ItemList 
          items={searchText !== '' ? searchedItems : tabbedItems}
          tabValue={tabValue}
          tabIndex={0}
          deleteItem={deleteItem}
          addMessage={addMessage}
          loggedInUser={loggedInUser}
          setTabValue={setTabValue}
        />
        <ItemList
          items={searchText !== '' ? searchedItems : tabbedItems}
          tabValue={tabValue}
          tabIndex={1}
          deleteItem={deleteItem}
          addMessage={addMessage} // for ReplyForm
          loggedInUser={loggedInUser} // for ReplyForm, among others
          setTabValue={setTabValue}
        />
        <ItemList
          items={searchText !== '' ? searchedItems : tabbedItems}
          tabValue={tabValue}
          tabIndex={2}
          deleteItem={deleteItem}
          loggedInUser={loggedInUser} // for ReplyForm, among others
          setTabValue={setTabValue}
        />
        <ConversationList
          conversations={conversations}
          loggedInUser={loggedInUser} // for ReplyForm, among others
          addMessage={addMessage} // for ReplyForm
          tabValue={tabValue}
          setTabValue={setTabValue}
          tabIndex={3}
          markAsRead={markAsRead}
          // loggedInUserID={loggedInUser && loggedInUser.id}
        />
      </Container>
    </>
  ); 
}
}
