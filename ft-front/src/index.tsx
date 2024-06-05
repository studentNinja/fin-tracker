import React from 'react';
import ReactDOM from 'react-dom/client'; // Імпортуйте createRoot
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import './styles/index.css';
import './styles/buttons.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
