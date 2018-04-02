import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import * as Immutable from 'immutable';
import { Provider } from 'react-redux';
import configureStore from './store'

import DevTools from './modules/devtools'

// redux setup
const initialState = Immutable.Map({});

// const store = createStore(rootReducer, initialState);
const store = configureStore(initialState)
const app = (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
