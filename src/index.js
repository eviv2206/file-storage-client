import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import App from './common/ui/components/App/App';
import {HashRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <App/>
    </HashRouter>
);

