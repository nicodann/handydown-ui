import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { AppContextWrapper } from './context/state';

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppContextWrapper>
        <App />
      </AppContextWrapper>
    </React.StrictMode>
  );
} else {
  console.error("Could not find root element")
}


