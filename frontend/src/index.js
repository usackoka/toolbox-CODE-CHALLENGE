import React from 'react';
import ReactDOM, { Route } from 'react-dom';
import App from './App';
import { FirebaseAppProvider } from 'reactfire'
import config from 'firebase/config';
import { Suspense } from 'react';
import { QueryParamProvider } from 'use-query-params';

ReactDOM.render(
  <QueryParamProvider ReactRouterRoute={Route}>
    <FirebaseAppProvider suspense={true} firebaseConfig={config}>
      <Suspense fallback={'Conectando a firebase...'}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
  </QueryParamProvider>,
  document.getElementById('root')
);

