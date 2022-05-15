import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Typography,
  Button,
  Container,
  Tabs,
  Tab,
  Box,
  TextField
} from '@mui/material';
import { VolunteerActivism } from '@mui/icons-material';
import ItemList from './ItemList';
import ConversationList from './ConversationList';
import SingleMessage from './SingleMessage';
import SingleItemModal from './Modals/SingleItemModal';
import MySingleItemModal from './Modals/MySingleItemModal';

function App() {
  
  const [items, setItems] = useState([]);

  const [conversations, setConversations] = useState([]);

  const [tabValue, setTabValue ] = useState(0);

  const handleTabChange = (_event, newTabValue) => {
    setTabValue(newTabValue);
  }

  useEffect(() => {
    axios.get("/api/items")
    .then((items) => {
      setItems(items.data);
      console.log("HERE ARE THE ITEMS", items.data);
    })
    .catch();
  }, []);

  // useEffect(() => {
  //   axios.get("/api/conversations/by/user/1")
  //     .then((conversations) => {
  //       setConversations(conversations.data);
  //       console.log("HERE ARE THE CONVERSATIONS", conversations.data)
  //     })
  //     .catch();
  //   }, []);

  // useEffect(() => {
  //   axios.get("/").then((data) => {
  //     console.log("Here is data from the api:", data)
  //   })
  // });

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
        <TextField id="outlined-search" label="Search for items..." type="search" />
      </Box>
      {/* BODY -- ITEMS OR MESSAGES */}
      <Container maxWidth="lg" sx={{ py: 4}}>
        <ItemList items={items} tabValue={tabValue} tabIndex={0} />
        <ItemList items={items} tabValue={tabValue} tabIndex={1} />
        <ItemList items={items} tabValue={tabValue} tabIndex={2} />
        <ConversationList conversations={conversations} tabValue={tabValue} tabIndex={3} />
      </Container>
      <SingleMessage />
      <SingleItemModal />
      <MySingleItemModal />
    </>
  ); 
}

export default App;