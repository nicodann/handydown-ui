// import dotenv from 'dotenv';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
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
import { useAppContext } from '../context/state';
import useItems from '../hooks/useItems';
import { deleteItem, editItem } from '../routes/item'
import { addMessage } from '../routes/message';
import { Item } from '../types/item';
import useConversations from '../hooks/useConversations';
import { markAsRead } from '../routes/conversation';
import useLoggedInUser from '../hooks/useLoggedInUser';

export default function App() {
  const [searchedItems, setSearchedItems] = useState<Item[]>([])
  const [searchText, setSearchText] = useState("");
  const [transition, setTransition] = useState(false);
  const [transitionPhrase, setTransitionPhrase] = useState('Loading...')
  const { items, tabbedItems, loadingItems } = useItems();
  const { conversations } = useConversations();
  const loggedInUser = useLoggedInUser();

  const {
    setTabbedItems,
    setTabValue,
    tabValue,
  } = useAppContext()

  const handleTabClick = (_event: SyntheticEvent<Element, Event>, value: any) => {
    const currentTab = value;
    setSearchText('');

    if (currentTab === 0) {
      setTabbedItems(items.filter((item: Item) => { 
        if (loggedInUser) {
          return item.offered === true && item.userId !== loggedInUser.id; 
        } else {
          return item.offered === true
        }
      }));
    } else if (currentTab === 1) {
      setTabbedItems(items.filter((item: Item) => {
        if (loggedInUser) {
          return !item.offered && item.userId !== loggedInUser.id; 
        } else {
          return !item.offered
        }
      }));
    } else if (currentTab === 2) {
      if (loggedInUser) {
        setTabbedItems(items.filter((item: Item) => item.userId === loggedInUser.id));
      } else {
        setTabbedItems([]);
      }
    }
    setTabValue(currentTab);
  };

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const keyword = event.target as HTMLInputElement;

    const value = keyword.value

    if (value !== '') {
      setSearchedItems(tabbedItems.filter(
        (item: Item) => item.name.toLowerCase().startsWith(value.toLowerCase())
      ));
    } else {
      setSearchedItems(tabbedItems);
    }

    setSearchText(value);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  // RENDER

  return (
    <>
      <CssBaseline />
      <Navbar 
        setTransition={setTransition}
        setTransitionPhrase={setTransitionPhrase}
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
      {((transition) || (loadingItems)) && 
        (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
          <CircularProgress size={80} />
          <Typography sx={{mt: 2}}>{transitionPhrase}</Typography>
        </Box>
        )
      }
      {!(items === null) && !loadingItems && !transition &&
        (
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
          />
        </Container>

        )
      }
    </>
  ); 
// }
}
