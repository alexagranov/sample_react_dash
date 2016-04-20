import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

class StatementForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: Date.now(), feed: '', numTrans: '', totalTrans: '' };
        this.handleFeedChange = this.handleFeedChange.bind(this);
        this.handleNumTransChange = this.handleNumTransChange.bind(this);
        this.handleTotalTransChange = this.handleTotalTransChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFeedChange(e) {
        this.setState({ feed: e.target.value });
    }

    handleNumTransChange(e) {
        this.setState({ numTrans: e.target.value });
    }

    handleTotalTransChange(e) {
        this.setState({ totalTrans: e.target.value });
    }

    handleSubmit(e) {
        const feed = this.state.feed.trim();
        const numTrans = this.state.numTrans;
        const totalTrans = this.state.totalTrans;
        e.preventDefault();
        if (!numTrans || !totalTrans || !feed)
            return;
        this.props.addFeed(this.state);
        this.setState({ feed: '', numTrans: '', totalTrans: '' });
    }

    render() {
        return (
            <form className="statementForm" onSubmit={this.handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Feed name"
                        value={this.state.feed}
                        onChange={this.handleFeedChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="# completed transactions..."
                        value={this.state.numTrans}
                        onChange={this.handleNumTransChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="# total transactions..."
                        value={this.state.totalTrans}
                        onChange={this.handleTotalTransChange}
                    />
                </div>
                <div>
                    <input type="submit" value="Post" />
                </div>
            </form>
        );
    }
}

StatementForm.propTypes = {
    addFeed: React.PropTypes.func
};

StatementForm.defaultProps = {
    id: Date.now(),
    feed: '',
    numTrans: '',
    totalTrans: ''
};

const mapStateToProps = (state) => (
    {
        id: state.get('id'),
        feed: state.get('feed'),
        numTrans: state.get('numTrans'),
        totalTrans: state.get('totalTrans')
    }
);

export const StatementFormContainer = connect(
    mapStateToProps,
    actionCreators
)(StatementForm);

export default StatementForm;
