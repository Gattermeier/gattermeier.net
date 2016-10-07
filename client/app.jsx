import React from 'react';
import { routes } from './routes';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { createStore, compose } from 'redux';
import configureStore from '../server/store.js';

import { Resolver } from 'react-resolver';
import { Provider } from 'react-redux';

import './styles/base.css';

//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//

// const initialState = window.__PRELOADED_STATE__;
// const rootReducer = (s, a) => s;
// const enhancer = compose(
//   // here is where the middleware goes..
//     typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
//   );
// const store = createStore(rootReducer, initialState, enhancer);

const store = configureStore(window.__PRELOADED_STATE__, browserHistory)
// const history = syncHistoryWithStore(browserHistory, store)

window.webappStart = () => {
  Resolver.render(
    () =>
      <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
      </Provider>,
    document.querySelector('.js-content')
  );
};
