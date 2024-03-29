import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import store from "./Redux/store/store";
import {Provider} from "react-redux";

//deploy
import axios from 'axios';
// axios.defaults.baseURL ='http://localhost:3001'; //para modificar forma local  descomentar
axios.defaults.baseURL ='https://food-8tx9.onrender.com/'; //para acutalizar proyecto subido descomentar


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
