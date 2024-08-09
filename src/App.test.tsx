import { render, screen } from '@testing-library/react';
import App from './App';

test('renders start personality test button', () => {
  render(<App />);
  const linkElement = screen.getByText(/start personality test/i);
  expect(linkElement).toBeInTheDocument();
});