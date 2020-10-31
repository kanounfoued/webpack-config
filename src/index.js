import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

class Welcome extends React.Component {
    render () {
        return <App />;
    }
}
ReactDOM.render(<Welcome />, document.getElementById('root'));
