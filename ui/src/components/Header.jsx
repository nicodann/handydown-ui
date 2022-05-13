import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TabBar from './TabBar';
import SearchBar from './SearchBar';
import ButtonTray from './ButtonTray';

function Header() {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ py: 3, px: 2 }}>
        <Grid item xs="auto">
          <Typography variant="h3" component="div" >HandyDown</Typography>
        </Grid>
        <Grid item xs="auto">
          <ButtonTray/>
        </Grid>
      </Grid>
      <TabBar/>
      <SearchBar/>
    </>
  )
}

export default Header