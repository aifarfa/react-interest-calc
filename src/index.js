import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import * as Immutable from 'immutable';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer as rootReducer } from './modules'; // index

// redux setup
const initialState = Immutable.fromJS({
  compound: {},
  simple: {}
});

const store = createStore(rootReducer, initialState);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
