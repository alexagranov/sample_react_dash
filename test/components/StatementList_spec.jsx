import React from 'react';
import { List } from 'immutable';
import { renderIntoDocument } from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import StatementList from '../../src/components/StatementList';
import makeStore from '../../src/store';

describe('StatementList', () => {
    const statements = List.of(
        { id: 1, feed: 'Deezer', numTrans: 45, totalTrans: 90 },
        { id: 2, feed: 'iTunes-Music', numTrans: 500, totalTrans: 2000 }
    );

    it('renders a list of statements', () => {
        const store = makeStore();

        renderIntoDocument(
            <Provider store={store}>
                <StatementList statements={statements} />
            </Provider>
        );
    });

});
