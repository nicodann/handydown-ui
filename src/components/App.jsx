// import dotenv from 'dotenv';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css'
import {
  Box,
  Container,
  CssBaseline,
  Tabs,
  Tab,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import ItemList from './ItemList';
import ConversationList from './ConversationList';
import AddItemForm from './Modals/AddItemForm';
import LoginForm from './Modals/LoginForm';
import RegistrationForm from './Modals/RegistrationForm';
import apiUrl from '../lib/apiURL';
import { useAppContext } from '../context/state';
import useLoggedInUser from '../hooks/useLoggedInUser';
import useItems from '../hooks/useItems';
// import { loginUser, logoutUser, registerUser } from '../routes/user.js';
import { addItem, deleteItem, editItem } from '../routes/item.js';
import { addMessage } from '../routes/message.js';

export default function App() {


  // STATE
  const { items: ITEMS, tabbedItems} = useItems()
  const [searchedItems, setSearchedItems] = useState([])
  const [conversations, setConversations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [transition, setTransition] = useState(false);
  const [transitionPhrase, setTransitionPhrase] = useState('Loading...')
  const {loggedInUser} = useLoggedInUser();
  const {
    setTabbedItems,
    setTabValue,
    tabValue
  } = useAppContext()

  const handleTransition = (phrase) => {
    setTransitionPhrase(phrase)
    setTransition(true);
          setTimeout(() => {
            setTransition(false);
            setTransitionPhrase('Loading...')
          }, 1000);
  }

  const apiURL = apiUrl;

  // FETCH ALL CONVERSATIONS BELONGING TO LOGGED IN USER
  useEffect(() => {
    if (loggedInUser) {
      axios.get(`${apiURL}/api/conversations/by/user/${loggedInUser.id}`)
        .then((conversations) => {
          setConversations(conversations.data);
        })
        .catch((error) => console.log(error));

    }
    }, [loggedInUser, apiURL]);

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
       await axios.put(`${apiURL}/api/conversations/${conversationId}`, {readByWhom: readByWhom});
    } catch(err) {
      console.log(err);
    }
    
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  // RENDER

  if ((ITEMS === null) || (ITEMS && transition)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <CircularProgress size={80} />
      <Typography sx={{mt: 2}}>{transitionPhrase}</Typography>
    </Box>
    )
  } else {

    return (
    <>
      <CssBaseline />
      <Navbar 
        LoginForm={LoginForm}
        RegistrationForm={RegistrationForm}
        setTransition={setTransition}
        setTransitionPhrase={setTransitionPhrase}
        addItem={addItem}
        AddItemForm={AddItemForm}
      />
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        sx={{ 
          pt: 1, 
          borderBottom: 1, 
          borderColor: 'divider', 
          background: '#42A5F5' 
      }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleTabClick}
          orientation={isSmallScreen ? 'vertical' : 'horizontal'}
        >
          <Tab label="Offers" sx={{color: 'white'}}/>
          <Tab label="Wanted" sx={{color: 'white'}}/>
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
          editItem={editItem}
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
