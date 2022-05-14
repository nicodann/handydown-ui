// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';
import {
  CssBaseline,
  Container
} from '@mui/material';
import ItemList from './ItemList'
import MessageList from './MessageList';
import SingleMessage from './SingleMessage';
import SingleItemModal from './SingleItemModal';
import MySingleItemModal from './MySingleItemModal';
  
function Body() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4}}>
        <ItemList/>
        <MessageList />
      </Container>
      <SingleMessage />
      <SingleItemModal />
      <MySingleItemModal />
    </>
  )
}

export default Body