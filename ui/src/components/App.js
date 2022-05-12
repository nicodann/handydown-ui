import * as React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import { useEffect } from 'react';

// import Button from '@mui/material/Button';
import Header from 'components/Header';
import Body from 'components/Body';

function App() {
  useEffect(() => {
    axios.get("/").then((data) => {
        console.log("Here is data from the api:", data)
    })
  })
  return (
    <>
      <Header/>
      <Body/>
    </>
  ) 
  // return <Button variant="contained">Hello HandyDown</Button>;
}

export default App;
