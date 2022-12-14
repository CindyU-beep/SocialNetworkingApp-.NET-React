import React from 'react';
import ReactDOM from 'react-dom/client'; //webapp (ReactNative for mobile)
import './App/Layout/index.css'
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App/Layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './App/Stores/store';
import { Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>
);

//Store context provides context 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


