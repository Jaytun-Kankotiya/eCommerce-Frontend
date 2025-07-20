import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer position='top-right' toastStyle={{marginTop: '3rem', marginBottom: '0rem'}} autoClose={3000}  />
    </BrowserRouter>
  </StrictMode>
);
