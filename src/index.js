import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import './styles/index.css';

const store = configureStore(window.REDUX_STATE || {});

ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    document.getElementById('root')
);
