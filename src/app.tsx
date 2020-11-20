import React from 'react';
import img from './asset/LD.png';

import './style.css';

interface IPropsType {}

const App: React.FC<IPropsType> = () => {
  return (
    <div>
      <div className="app">This is my app.</div>
      <img src={img} alt="img" />
    </div>
  );
};

export default App;
