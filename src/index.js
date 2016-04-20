import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import io from 'socket.io-client';
import App from './components/App';
import History from './components/History';
import { StatementListContainer } from './components/StatementList';
import { setFeeds } from './actions';
import makeStore from './store';

/**
 * This file is the application entry point. This is the first code to be run
 * when the application is loaded by a browser.
 */

/**
 * Connect to our backend
 */
const socket = io(`${location.protocol}//${location.hostname}:3000`);

/**
 * Create our Redux store
 */
const store = makeStore(socket);

socket.on('state', state => {
    store.dispatch(setFeeds(state));
});

/**
 * Mounts rootReactComponent to appRootDomElement.
 * @param {DOMElement} appRootDomElement - element to mount root react component to
 */

const routes = (
    <Route component={App}>
        <Route path="/" component={StatementListContainer} />
        <Route path="/history/:feed" component={History} />
    </Route>
);

const initApp = (appRootDomElement) => {
    render((
        <Provider store={store}>
            <Router history={hashHistory}>
                {routes}
            </Router>
        </Provider>
    ), appRootDomElement);
};

/**
 * Make initApp globally available so script in index.html file can call it with
 * DOM element to mount the root react component to.
 */
window.initProjectManager = initApp;
