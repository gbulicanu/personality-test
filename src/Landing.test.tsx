import { describe, test} from '@jest/globals';

import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import Landing from './Landing';
import Questions from './Questions';

describe('Landing screen', () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/questions",
      element: <Questions />
    }
  ], { initialEntries: ['/']});

  test('should render start button', () => {
    render(<RouterProvider router={router} />);

    const linkElement = screen.getByText(/start personality test/i);
    
    expect(linkElement).toBeInTheDocument();
  });
  
  test("should navigate to questions screen", () => {
    render(<RouterProvider router={router} />);
  
    fireEvent.click(screen.getByText(/start personality test/i));
  
    expect(screen.getByTestId('questions')).toBeInTheDocument();
  });
});