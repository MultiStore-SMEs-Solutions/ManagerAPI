/* eslint-disable no-undef */
import React from 'react'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/Store/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import { createRoot } from 'react-dom/client'
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_URLDEPLOY || process.env.REACT_APP_APIURLOCAL


const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider >
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
