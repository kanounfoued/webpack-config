import React, { FC } from 'react';
import img from '../assets/images/LD.png';

import '../styles/style.css';

const App: FC = () => {
  return (
    <div>
      <div className="app">This is my app.</div>
      <img src={img} alt="img" />
    </div>
  );
};

export default App;
