import React from 'react';
import ReactDOM from 'react-dom/client'; //webapp (ReactNative for mobile)
import './App/Layout/index.css'
import App from './App/Layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './App/Stores/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
        <App />

  </StoreContext.Provider>
);
//Store context provides context 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
