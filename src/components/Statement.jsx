import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const marked = require('marked');

class Statement extends React.Component {
    rawMarkup() {
        const rawMarkup = marked(this.props.children.toString(), { sanitize: true });
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div className="statement">
                <Col xs={12} sm={6}>
                    <h2 className="statementFeed">
                        { this.props.feed }
                    </h2>
                    <span dangerouslySetInnerHTML={this.rawMarkup()} />
                </Col>
                <Col xs={12} sm={6} className="text-right">
                    <LinkContainer to={{ pathname: `/history/${this.props.feed}` }}>
                        <Button bsStyle="primary">View</Button>
                    </LinkContainer>
                </Col>
            </div>
        );
    }
}

Statement.propTypes = {
    children: React.PropTypes.node,
    feed: React.PropTypes.string.isRequired
};

export default Statement;
