import { applyMiddleware, compose, createStore } from 'redux';
import reducer, { INITIAL_STATE } from './reducer';
import remoteActionMiddleware from './remote_action_middleware';

const makeStore = (socket) => {
    const store = createStore(reducer, INITIAL_STATE, compose(
        applyMiddleware(remoteActionMiddleware(socket)),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store;
};

export default makeStore;
