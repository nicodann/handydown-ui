import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Tabs,
  Tab,
  TextField,
  Typography
} from '@mui/material';
import { VolunteerActivism } from '@mui/icons-material';
import ItemList from './ItemList';
import ConversationList from './ConversationList';
import SingleMessage from './Modals/SingleConversation';
import SingleItemModal from './Modals/SingleItemModal';
import MySingleItemModal from './Modals/MySingleItemModal';

function App() {

  const [ITEMS, setITEMS] = useState([]);
  const [tabbedItems, setTabbedItems] = useState([]);
  const [foundItems, setFoundItems] = useState([])
  const [tabValue, setTabValue ] = useState(0);
  const [name, setName] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loggedInUserID, setLoggedInUserID] = useState(1);

  useEffect(() => {
    axios.get("/api/items")
    .then((items) => {
      setITEMS(items.data);
      console.log("HERE ARE THE ITEMS", items.data);
      return items.data;
    })
    .then((data) => setTabbedItems(data.filter((item) => item.offered === true)))
    .catch();
  }, []);

  useEffect(() => {
    axios.get("/api/conversations/by/user/1")
      .then((conversations) => {
        setConversations(conversations.data);
        console.log("HERE ARE THE CONVERSATIONS", conversations.data)
      })
      .catch();
    }, []);

  const handleTabChange = (_event, newTabValue) => {
    const currentTab = newTabValue;
    setName('');

    if (currentTab === 0) {
      setTabbedItems(ITEMS.filter((item) => item.offered));
    } else if (currentTab === 1) {
      setTabbedItems(ITEMS.filter((item) => !item.offered));
    } else if (currentTab === 2) {
      setTabbedItems(ITEMS.filter((item) => item.userId === loggedInUserID));
    }

    setTabValue(currentTab);
  }

  const handleSearchInput = (event) => {
    const keyword = event.target.value;

    if (keyword !== '') {
      setFoundItems(tabbedItems.filter((item) => item.name.toLowerCase().startsWith(keyword.toLowerCase())));
    } else {
      setFoundItems(tabbedItems);
    }

    setName(keyword);
  }

  return (
    <>
      <CssBaseline />
      {/* NAVBAR */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ py: 3, px: 2 }}>
        {/* NAVBAR--LOGO */}
        <Grid item xs="auto">
          <VolunteerActivism sx={{ fontSize: 60 }}/>
          <Typography variant="h3" component="div">HandyDown</Typography>
        </Grid>
        {/* NAVBAR--BUTTONTRAY */}
        <Grid item xs="auto">
        <div>
          {/* <Button variant="text">register</Button> */}
          {/* <Button variant="text">login</Button> */}
          <Button variant="disabled">userName</Button>
          <Button variant="text">logout</Button>
          <Button variant="contained" sx={{ ml: 1 }}>Post Ad</Button>
        </div>
        </Grid>
      </Grid>
      {/* TABBAR */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Offers" />
          <Tab label="Wanted" />
          <Tab label="My Items" />
          <Tab label="My Messages" />
        </Tabs>
      </Box>
      {/* SEARCHBAR */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: 4 }}>
        <TextField type="search" value={name} onChange={handleSearchInput} id="outlined-search" label="Search by item name..." />
      </Box>
      {/* BODY -- ITEMS OR MESSAGES */}
      <Container maxWidth="lg" sx={{ py: 4}}>
        <ItemList items={name !== '' ? foundItems : tabbedItems} tabValue={tabValue} tabIndex={0} />
        <ItemList items={name !== '' ? foundItems : tabbedItems} tabValue={tabValue} tabIndex={1} />
        <ItemList items={name !== '' ? foundItems : tabbedItems} tabValue={tabValue} tabIndex={2} />
        <ConversationList conversations={conversations} tabValue={tabValue} tabIndex={3} loggedInUserID={loggedInUserID}/>
      </Container>
      <SingleMessage />
      <SingleItemModal />
      <MySingleItemModal />
    </>
  ); 
}

export default App;