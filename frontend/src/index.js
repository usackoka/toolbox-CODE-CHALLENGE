import React from 'react';
import ReactDOM, { Route } from 'react-dom';
import App from './App';
import { QueryParamProvider } from 'use-query-params';

ReactDOM.render(
  <QueryParamProvider ReactRouterRoute={Route}>
        <App />
  </QueryParamProvider>,
  document.getElementById('root')
);

