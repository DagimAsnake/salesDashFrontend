import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AdminAuthContextProvider } from './components/store/Admin-authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AdminAuthContextProvider>
    <App />
  </AdminAuthContextProvider>
);

