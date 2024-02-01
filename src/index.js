import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "src/assets/css/common.css";

import { BrowserRouter } from "react-router-dom";
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'
import App from "./App";
// export const apolloClient = new ApolloClient({
//   uri: 'https://casino-api.dialogmakers-international.com/graphql',
//   cache: new InMemoryCache(),
// });

// const options = {
//   // you can also just use 'bottom center'
//   position: positions.TOP_CENTER,
//   timeout: 5000,
//   // you can also just use 'scale'
//   transition: transitions.FADE
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
