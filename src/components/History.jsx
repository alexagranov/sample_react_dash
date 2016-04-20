import React from 'react';
import { Breadcrumb, Col } from 'react-bootstrap';

class History extends React.Component {
    getFeed() {
        return this.props.params.feed || '';
    }

    render() {
        return (
            <div className="history">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">
                        &lt; Statements
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Current Statement
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Col xs={12}>
                    <h1>History for {this.getFeed()}</h1>
                </Col>
            </div>
        );
    }
}

History.propTypes = {
    params: React.PropTypes.object.isRequired
};

export default History;
