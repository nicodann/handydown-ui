import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Stack,
  Tabs,
  Tab,
  TextField,
  Typography,
  IconButton
} from '@mui/material';
import { VolunteerActivism } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ItemList from './ItemList';
import ConversationList from './ConversationList';
import NewItemForm from './Modals/NewItemForm';

function App() {

  const [ITEMS, setITEMS] = useState([]);
  const [tabbedItems, setTabbedItems] = useState([]);
  const [foundItems, setFoundItems] = useState([])
  const [tabValue, setTabValue ] = useState(0);
  const [name, setName] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loggedInUserID, setLoggedInUserID] = useState(3);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false); 

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
    axios.get(`/api/conversations/by/user/${loggedInUserID}`)
      .then((conversations) => {
        setConversations(conversations.data);
        console.log("HERE ARE THE CONVERSATIONS", conversations.data)
      })
      .catch();
    }, []);

  const handleNewItem = async (newItem) => {
    const newTabbedItems = [...tabbedItems, newItem];
    (tabValue === 0 && newItem.offered) || 
      (tabValue === 1 && !newItem.offered) ||
      (tabValue === 2 && newItem.userId === loggedInUserID) ? 
      setTabbedItems(newTabbedItems) : setTabbedItems(tabbedItems);
    setITEMS([...ITEMS, newItem]);
  }
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
      <Grid 
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
        {/* NAVBAR--LOGO */}
        <Grid item xs="auto" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <VolunteerActivism sx={{ color: 'primary.main', fontSize: 40 }}/>
          <Typography variant="h5" sx={{ml: 2, color: 'primary.main'}}>HandyDown</Typography>
        </Grid>
        {/* NAVBAR--BUTTONTRAY */}
        <Grid item xs="auto">
          <Stack direction="row" spacing={2}>
            {/* <Button variant="text">register</Button> */}
            {/* <Button variant="text">login</Button> */}
            <IconButton sx={{mr: -3.5}}><AccountCircleIcon color="primary"/></IconButton><Button component="span">nicoDann</Button>
            <Button variant="text">Logout</Button>
            <Button color="primary" variant="contained" onClick={handleOpenForm}>Post Item</Button>
            <NewItemForm openForm={openForm} handleNewItem={handleNewItem} loggedInUserID={loggedInUserID} handleCloseForm={handleCloseForm} />
          </Stack>
        </Grid>
      </Grid>
      {/* TABBAR */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: 1, borderBottom: 1, borderColor: 'divider' }}>
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
        <ItemList items={name !== '' ? foundItems : tabbedItems} tabValue={tabValue} tabIndex={0} loggedInUserID={loggedInUserID}/>
        <ItemList items={name !== '' ? foundItems : tabbedItems} tabValue={tabValue} tabIndex={1} loggedInUserID={loggedInUserID}/>
        <ItemList items={name !== '' ? foundItems : tabbedItems} tabValue={tabValue} tabIndex={2} loggedInUserID={loggedInUserID} />
        <ConversationList conversations={conversations} tabValue={tabValue} tabIndex={3} loggedInUserID={loggedInUserID}/>
      </Container>
      
    </>
  ); 
}

export default App;