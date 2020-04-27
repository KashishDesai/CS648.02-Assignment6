/* eslint-disable linebreak-style */
/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

// const contentnode = document.getElementById('contents');
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import Page from './Page.jsx';

function App() {
  return (
    <Router>
      <Page />
    </Router>
  );
}

const element = <App />;

ReactDOM.render(element, document.getElementById('content'));

if (module.hot) {
  module.hot.accept();
}
