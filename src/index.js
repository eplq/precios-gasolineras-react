import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import "./css/index.css";
import "leaflet/dist/leaflet.css";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

