import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TabBar from './TabBar';
import SearchBar from './SearchBar';

function Header() {
  return (
    <>
      <div className="left">
        <Typography variant="h1" component="div" gutterBottom>HandyDown</Typography>
      </div>
      <div className="right">
        <Button variant="text">login</Button>
        <Button variant="text">register</Button>
        <Button variant="text">logout</Button>
        <Button variant="contained">Post Ad</Button>
      </div>
      <TabBar/>
      <SearchBar/>
    </>
  )
}

export default Header