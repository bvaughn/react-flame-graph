import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

fetch('/raw.json')
  .then(response => response.json())
  .then(data => {
    ReactDOM.render(<App data={data} />, document.getElementById('root'));
  });
