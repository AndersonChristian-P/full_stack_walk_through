import React from 'react';
import { Provider } from "react-redux"
import store from "./redux/store"
import './App.css';
import { HashRouter } from "react-router-dom"
import Navbar from "./Components/Navbar"
import router from "./router"

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Navbar />
        {router}
      </HashRouter>
    </Provider>
  );
}

export default App;


