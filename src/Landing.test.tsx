import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import Landing from './Landing';

test('Should render [Start Personality Test] button', () => {
  render(
    <Router>
      <Landing />
    </Router>
    );
  const linkElement = screen.getByText(/start personality test/i);
  expect(linkElement).toBeInTheDocument();
});