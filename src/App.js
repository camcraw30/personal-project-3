import React, {Component} from 'react';
import {Provider} from "react-redux";
import store from './redux/store';
import {HashRouter} from "react-router-dom";

import './App.css';
import routes from './routes';

export default class App extends Component {
  render() {
    return (
      <>
      <Provider store={store}>
        <HashRouter>
          {routes}
        </HashRouter>
      </Provider>
      </>
    )
  }
}