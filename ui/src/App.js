import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    axios.get("/").then((data) => {
        console.log("Here is data from the api:", data)
    })
  }) 
  return (
    <>
      {/* <Header/>
      <Body/> */}
    </>
  );
}

export default App;
