export const setFeeds = (state) => {
    // Need the following line to translate from JSON to an Object...
    const feeds = JSON.parse(state).feeds;
    return { type: 'SET_FEEDS', feeds };
};

export const addFeed = (feed) => {
    return {
        meta: { remote: true },
        type: 'ADD_FEED',
        feed
    };
};
