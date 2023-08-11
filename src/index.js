import React from 'react';
import ReactDOM from 'react-dom/client';
import MainRoutes from './routes';
import './styles/styles.css'
import {BrowserRouter} from 'react-router-dom'
import { ContextProvider } from './Context/context';
import { PlayContextProvider } from './Context/playContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
    <ContextProvider>
      <PlayContextProvider>
        <MainRoutes />
      </PlayContextProvider>
    </ContextProvider>
  </BrowserRouter>  
);
