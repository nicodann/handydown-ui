import React from 'react'
import Typography from '@mui/material/Typography';

import TabBar from './TabBar';
import SearchBar from './SearchBar';
import ButtonTray from './ButtonTray';

function Header() {
  return (
    <>
      <div className="left">
        <Typography variant="h1" component="div" gutterBottom>HandyDown</Typography>
      </div>
      <div className="right">
       <ButtonTray/>
      </div>
      <TabBar/>
      <SearchBar/>
    </>
  )
}

export default Header