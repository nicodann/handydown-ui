import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { AppContextWrapper } from './context/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextWrapper>
      <App />
    </AppContextWrapper>
  </React.StrictMode>
);

