import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios"
import {BrowserRouter} from "react-router-dom"
import StoreContextProvider from './Context/StoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "https://food-delivery-app-backend-4ncu.onrender.com";
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
