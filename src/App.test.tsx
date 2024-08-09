import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { log } from 'console';

test('renders start personality test button', () => {
  render(<App />);
  const linkElement = screen.getByText(/start personality test/i);
  expect(linkElement).toBeInTheDocument();
});