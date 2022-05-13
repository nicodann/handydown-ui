import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ItemList from './ItemList'
  
function Body() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 6}}>
        <ItemList/>
      </Container>
    </>
  )
}

export default Body