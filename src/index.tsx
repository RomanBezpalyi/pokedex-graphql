import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { POKEAPI_URL, SERVER_URL } from './api/constants';
import store from './store/createStore';

import App from './App';
import './index.scss';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      console.warn(`GraphQL Error: ${message}`);
    });
  }
})

const pokeapiUri = new HttpLink({ uri: POKEAPI_URL });
const serverUri = new HttpLink({ uri: SERVER_URL });

const pokeapiLink = from([
  errorLink,
  pokeapiUri,
])

const serverLink = from([
  errorLink,
  serverUri
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'pokeapi',
    pokeapiLink,
    serverLink
  )
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HashRouter basename='/'>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
