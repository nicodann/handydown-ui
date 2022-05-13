import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ItemList from './ItemList'
import MessageList from './MessageList';
import SingleMessage from './SingleMessage';
  
function Body() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4}}>
        <ItemList/>
      <MessageList />
      </Container>
      <SingleMessage />
    </>
  )
}

export default Body