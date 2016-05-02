import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import makeStore from '../src/store';

describe('store', () => {

    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map({"feeds" : List()}));

        store.dispatch({
            type: 'SET_FEEDS',
            feeds: ['Deezer', 'iTunes-Music']
        });
        expect(store.getState()).to.equal(fromJS({
            feeds: ['Deezer', 'iTunes-Music']
        }));
    });

});
