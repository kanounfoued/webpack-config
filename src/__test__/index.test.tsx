import * as React from 'react';
import { render } from '@testing-library/react';
import App from '../views/app';

test('renders App component', () => {
  render(<App />);
  //   const linkElement = screen.getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
});
