import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

export const setFeeds = (state, feeds) =>
  state.set('feeds', List(feeds));

export const addFeed = (state, feed) =>
  state.updateIn(['feeds'], List(), feeds => feeds.push(feed));

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_FEEDS':
            return setFeeds(state, action.feeds);
        case 'ADD_FEED':
            return addFeed(state, action.feed);
        default:
            return setFeeds(state, []);
    }
};

export default reducer;
