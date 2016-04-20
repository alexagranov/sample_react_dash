import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Statement from './Statement';
import { StatementFormContainer } from './StatementForm';

class StatementList extends React.Component {
    getStatements() {
        return this.props.statements || [];
    }

    render() {
        const statementNodes = this.getStatements().map(statement =>
            <Row className="show-grid" key={statement.id}>
                <Statement feed={statement.feed} key={statement.id}>
                    {[`${(statement.numTrans / statement.totalTrans * 100.0).toFixed(2)}`,
                      '% Completed'].join('')}
                </Statement>
            </Row>
        );
        return (
            <div className="statementList">
                <h1>Statements</h1>
                <Grid>
                    {statementNodes}
                    <StatementFormContainer />
                    { this.props.children }
                </Grid>
            </div>
        );
    }
}

StatementList.propTypes = {
    children: React.PropTypes.node,
    statements: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => (
    { statements: state.get('feeds') }
);

export const StatementListContainer = connect(mapStateToProps)(StatementList);

export default StatementList;
