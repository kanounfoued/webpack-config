import React from 'react';
import { add } from './headerFunction';

const Header: React.FC = () => {
  const adding = (): number | string => {
    return add(2, 3);
  };

  return <header>I am a heder {adding()} </header>;
};

export default Header;
