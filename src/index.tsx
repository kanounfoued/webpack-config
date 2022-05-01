import React from 'react';
import { createRoot } from 'react-dom/client';
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

const container = document.getElementById('root') || document.createElement('div');

createRoot(container).render(<Welcome />);
