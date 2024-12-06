import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./App";
import './styles.css'
import store from "./store/stroe";
import { Provider } from "react-redux";

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Access the `api` object exposed by preload.js
window.api.logMessage('Hello from the renderer!');

// Render the App component
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />    
    </Provider>
  </React.StrictMode>
);