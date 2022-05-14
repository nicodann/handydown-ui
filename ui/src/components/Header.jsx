import React from 'react'
import Typography from '@mui/material/Typography' 
import Grid from '@mui/material/Grid';

import TabBar from './TabBar';
import SearchBar from './SearchBar';
import ButtonTray from './ButtonTray';
import VolunteerActivism from '@mui/icons-material/VolunteerActivism';

export default function Header() {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ py: 3, px: 2 }}>
        <Grid item xs="auto">
          <VolunteerActivism sx={{ fontSize: 60}}/>
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