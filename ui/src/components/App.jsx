import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  CssBaseline,
  // Grid,
  IconButton,
  // Stack,
  Tabs,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import { VolunteerActivism } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ItemList from './ItemList';
import ConversationList from './ConversationList';
import AddItemForm from './Modals/AddItemForm';
import LoginForm from './Modals/LoginForm';

function App() {

  const [ITEMS, setITEMS] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [tabbedItems, setTabbedItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([])
  const [tabValue, setTabValue ] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [loggedInUser, setLoggedInUser] = useState();
  const [loggedInUserID, setLoggedInUserID] = useState(3);
  const [formOpen, setFormOpen] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);

  useEffect(() => {
    console.log("loggedInUser:" ,loggedInUser)
  })

  useEffect(() => {
    axios.get("/api/items")
    .then((items) => {
      setITEMS(items.data);
      console.log("HERE ARE THE ITEMS", items.data);
      return items.data;
    })
    .then(() => 
      setTabbedItems(ITEMS.filter((item) => { 
        return item.offered === true && item.userId !== loggedInUserID; 
      }))
    )
    .catch();
  }, []);

  useEffect(() => {
    axios.get(`/api/conversations/by/user/${loggedInUserID}`)
      .then((conversations) => {
        setConversations(conversations.data);
        console.log("HERE ARE THE CONVERSATIONS", conversations.data)
      })
      .catch();
    }, [loggedInUserID]);

  const loginUser = async (loginFormData) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/users/login',
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoggedInUser(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  const logoutUser = async () => {
    console.log("logging out")
    try {
      const response = await axios({
        method: 'post',
        url: '/api/users/logout'
      })
    } catch(error) {
      console.log(error)
    }

    setLoggedInUser(prev => null);
  }

  const addItem = async (newItemFormData) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/items',
        data: newItemFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newItem = response.data;
      if ((tabValue === 0 && newItem.offered) ||
          (tabValue === 1 && !newItem.offered) ||
          (tabValue === 2 && newItem.userId === loggedInUserID)) {
        setTabbedItems([newItem, ...tabbedItems]);
      } 
      setITEMS([newItem, ...ITEMS]);
    } catch(error) {
      console.log(error);
    }
  };

  const deleteItem = async (itemId, offered) => {
    try {
      const response = await axios.delete(`/api/items/${itemId}`);
      console.log("AXIOS DELETE RESPONSE", response);
      if ((tabValue === 0 && offered) ||
          (tabValue === 1 && !offered) ||
          (tabValue === 2)) {
        setTabbedItems(tabbedItems.filter((tabbedItem) => tabbedItem.id !== itemId));
      }
      setITEMS(ITEMS.filter((item) => item.id !== itemId));
    } catch(err) {
      console.log(err);
    }
  };

  const addMessage = async (newMessageFormData) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/messages',
        data: newMessageFormData,
      });
      console.log(response.data);
      // const returnedConversation = response.data;
      // if conversations includes returnedConversation
        // replace oldConversation with returnedConversation
          // const filteredConversations = conversations.filter conversation => conversation.id !== returnedConversation.id
          // setConversations(returnedConversation, filteredConversations)
      // else 
        // setConversations(returnedConversation, ...conversations)
    } catch(err) {
      console.log(err);
    };
  };

  const handleTabClick = (_event, newTabValue) => {
    const currentTab = newTabValue;
    setSearchText('');

    if (currentTab === 0) {
      setTabbedItems(ITEMS.filter((item) => { 
        return item.offered === true && item.userId !== loggedInUserID; 
      }));
    } else if (currentTab === 1) {
      setTabbedItems(ITEMS.filter((item) => {
        return !item.offered && item.userId !== loggedInUserID; 
      }));
    } else if (currentTab === 2) {
      setTabbedItems(ITEMS.filter((item) => item.userId === loggedInUserID));
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

  return (
    <>
      <CssBaseline />
      {/* NAVBAR */}
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <VolunteerActivism />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HandyDown
            </Typography>
            <IconButton sx={{mr: -1.5}}>
              <AccountCircleIcon style={{fill: "white"}}/>
            </IconButton>
            <Button color="inherit" component="span">nicoDann</Button>
            <Button color="inherit" variant="text">Logout</Button>
            <Button color="warning"  variant="contained" onClick={() => setFormOpen(true)} sx={{ml: 1}}>Post Item</Button>
            <AddItemForm 
              color="inherit" formOpen={formOpen} addItem={addItem} loggedInUserID={loggedInUserID} handleFormClose={() => setFormOpen(false)} />
          </Toolbar>
        </AppBar>
      {/* <Grid 
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          py: 3,
          px: 2,
          borderBottom: 1,
          borderColor: 'divider'
        }}
        >
        
        <Grid item xs="auto" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <VolunteerActivism sx={{ color: 'primary.main', fontSize: 40 }}/>
          <Typography variant="h5" sx={{ml: 2, color: 'primary.main'}}>HandyDown</Typography>
        </Grid>
        <Grid item xs="auto">
          <Stack direction="row" spacing={2}>

            { !loggedInUser ?
              <>
                <Button variant="text">register</Button>
                <Button variant="text" onClick={() => setLoginFormOpen(true)}>login</Button>
                <LoginForm
                  loginFormOpen={loginFormOpen}
                  loginUser={loginUser}
                  setLoginFormOpen={setLoginFormOpen}
                />
              
              </>
            :
              <>
                <IconButton sx={{mr: -3.5}}><AccountCircleIcon color="primary"/></IconButton><Button component="span">{loggedInUser.username}</Button>
                <Button variant="text" onClick={logoutUser}>Logout</Button>
              </>
            }

            <Button color="primary" variant="contained" onClick={handleFormOpen}>Post Item</Button>
            <AddItemForm 
              formOpen={formOpen} 
              addItem={addItem} 
              loggedInUserID={loggedInUserID} 
              handleFormClose={handleFormClose} 
            />

          </Stack>
        </Grid>
      </Grid> */}
      {/* TABBAR */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabClick}>
          <Tab label="Offers" />
          <Tab label="Wanted" />
          <Tab label="My Items" />
          <Tab label="My Messages" />
        </Tabs>
      </Box>
      {/* SEARCHBAR */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: 4 }}>
        <TextField
          type="search"
          value={searchText}
          onChange={handleSearchInput}
          id="outlined-search"
          label="Search by item name..."
          sx={{ visibility: tabValue !== 3 ? 'visible': 'hidden'}}
        />
      </Box>
      {/* BODY -- ITEMS OR MESSAGES */}
      <Container maxWidth="lg" sx={{ py: 4}}>
        <ItemList 
          items={searchText !== '' ? searchedItems : tabbedItems}
          tabValue={tabValue}
          tabIndex={0}
          loggedInUserID={loggedInUserID}
          deleteItem={deleteItem}
        />
        <ItemList
          items={searchText !== '' ? searchedItems : tabbedItems}
          tabValue={tabValue}
          tabIndex={1}
          loggedInUserID={loggedInUserID}
          deleteItem={deleteItem}
        />
        <ItemList
          items={searchText !== '' ? searchedItems : tabbedItems}
          tabValue={tabValue}
          tabIndex={2}
          loggedInUserID={loggedInUserID}
          deleteItem={deleteItem}
        />
        <ConversationList
          conversations={conversations}
          tabValue={tabValue}
          tabIndex={3}
          loggedInUserID={loggedInUserID}
        />
      </Container>
    </>
  ); 
}

export default App;