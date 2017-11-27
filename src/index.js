import React from 'react'
import ReactDOM from 'react-dom'
import BooksApp from './App'
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <BooksApp /> 
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
