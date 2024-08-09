import { render, screen } from '@testing-library/react';
import Landing from './Landing';

test('renders start personality test button', () => {
  render(<Landing />);
  const linkElement = screen.getByText(/start personality test/i);
  expect(linkElement).toBeInTheDocument();
});