import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import projectReducer from './reducers/ProjectReducer'
import thunk from 'redux-thunk'

const store = createStore(projectReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

