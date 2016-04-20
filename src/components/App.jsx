import React from 'react';

class App extends React.Component {
    getChildren() {
        return this.props.children;
    }

    render() {
        return (
            <div className="app">
                { this.getChildren() }
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node
};

export default App;
