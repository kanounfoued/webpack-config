import React from 'react';
import { add } from './headerFunction';

interface IPropsType {}

const Header: React.FC<IPropsType> = () => {
  const adding = (): number | string => {
    return add(2, 3);
  };

  return <header>I am a heder {adding()} </header>;
};

export default Header;
