import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer, { setFeeds, addFeed } from '../src/reducer';

describe('application logic', () => {

    describe('setFeeds', () => {

        it('initializes the state with feeds', () => {
            const state = Map();
            const feeds = List.of('Deezer', 'iTunes-Music');
            const nextState = setFeeds(state, feeds);
            expect(nextState).to.equal(Map({
                feeds: List.of('Deezer', 'iTunes-Music')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const feeds = ['Deezer', 'iTunes-Music'];
            const nextState = setFeeds(state, feeds);
            expect(nextState).to.equal(Map({
                feeds: List.of('Deezer', 'iTunes-Music')
            }));
        });

        it('adds a first feed to state', () => {
            const state = Map();
            const nextState = addFeed(state, 'Spotify');
            expect(nextState).to.equal(Map({
                feeds: List.of('Spotify')
            }));
            expect(state).to.equal(Map());
        });

        it('adds a new feed to state', () => {
            const state = Map({
                feeds: List.of('Deezer', 'iTunes-Music')
            });
            const nextState = addFeed(state, 'Spotify');
            expect(nextState).to.equal(Map({
                feeds: List.of('Deezer', 'iTunes-Music', 'Spotify')
            }));
            expect(state).to.equal(Map({
                feeds: List.of('Deezer', 'iTunes-Music')
            }));
        });

    });

    describe('reducer', () => {

        it('has an initial state', () => {
            const action = { type: 'SET_FEEDS', feeds: ['Deezer', 'iTunes-Music'] };
            const nextState = reducer(undefined, action);
            expect(nextState).to.equal(fromJS({
                feeds: ['Deezer', 'iTunes-Music']
            }));
        });

        it('handles SET_FEEDS', () => {
            const initialState = Map();
            const action = { type: 'SET_FEEDS', feeds: ['Deezer', 'iTunes-Music'] };
            const nextState = reducer(initialState, action);

            expect(nextState).to.equal(fromJS({
                feeds: ['Deezer', 'iTunes-Music']
            }));
        });

        it('handles ADD_FEED', () => {
            const initialState = fromJS({
                feeds: ['Deezer', 'iTunes-Music']
            });
            const action = { type: 'ADD_FEED', feed: 'Spotify' };
            const nextState = reducer(initialState, action);

            expect(nextState).to.equal(fromJS({
                feeds: ['Deezer', 'iTunes-Music', 'Spotify']
            }));
        });

        it('can be used with reduce', () => {
            const actions = [
                { type: 'SET_FEEDS', feeds: ['Deezer', 'iTunes-Music'] },
                { type: 'ADD_FEED', feed: 'Spotify' },
                { type: 'ADD_FEED', feed: 'SME France' }
            ];
            const finalState = actions.reduce(reducer, Map());

            expect(finalState).to.equal(fromJS({
                feeds: ['Deezer', 'iTunes-Music', 'Spotify', 'SME France']
            }));
        });

    });

});
