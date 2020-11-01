import React from 'react';

import './style.css';

interface IPropsType {}

const App: React.FC<IPropsType> = () => {
  return (
    <div>
      <div className="app">This is my app.</div>
    </div>
  );
};

export default App;
