import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './header';

class Welcome extends React.Component {
  render() {
    return (
      <>
        <Header />
        <App />
      </>
    );
  }
}
ReactDOM.render(<Welcome />, document.getElementById('root'));
