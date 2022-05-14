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
import MessageList from './MessageList';

function App() {
  
  useEffect(() => {
    axios.get("/api/items")
    .then((items) => {
      console.log("HERE ARE THE ITEMS", items);
    })
    .catch()
  }, []);

  useEffect(() => {
    axios.get("/").then((data) => {
      console.log("Here is data from the api:", data)
    })
  });
  
  // TABS STATE
  const [tabValue, setTabValue ] = useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
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
        <TextField id="outlined-search" label="Search for items..." type="search" />
      </Box>
      {/* BODY -- ITEMS OR MESSAGES */}
      <Container maxWidth="lg" sx={{ py: 4}}>
        <ItemList tabValue={tabValue} tabIndex={0} />
        <ItemList tabValue={tabValue} tabIndex={1} />
        <ItemList tabValue={tabValue} tabIndex={2} />
        <MessageList tabValue={tabValue} tabIndex={3} />
      </Container>
    </>
  ); 
}

export default App;