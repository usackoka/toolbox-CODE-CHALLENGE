import React from 'react';
import ReactDOM, { Route } from 'react-dom';
import App from './App';
import { QueryParamProvider } from 'use-query-params';
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(
  <QueryParamProvider ReactRouterRoute={Route}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryParamProvider>,
  document.getElementById('root')
);
