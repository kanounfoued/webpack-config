import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/app';
import Header from './components/common/header';

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
