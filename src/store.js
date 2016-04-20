import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';

const makeStore = (socket) => {
    const createStoreWithMiddleware = applyMiddleware(
        remoteActionMiddleware(socket)
    )(createStore);
    return createStoreWithMiddleware(reducer);
};

export default makeStore;
