import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import "./css/index.css";
import "leaflet/dist/leaflet.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

