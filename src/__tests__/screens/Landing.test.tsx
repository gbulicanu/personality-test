import { describe, test } from '@jest/globals';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import axios from 'axios';

import Landing from '../../screens/Landing';
import Questions from '../../screens/Questions';

import { mockQuestionAnswers, mockQuestions } from '../../__mocks__/questions';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Landing screen', () => {
  const time = 1723459384.318743;

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

  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({data: {time}});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render start button', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const button = screen.getByText(/start personality test/i);
    
      expect(button).toBeInTheDocument();
    });
  });

  test('should render time', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const timeParagraph = screen.getByText(/13:43:04/i, { exact: false });
      expect(timeParagraph).toBeInTheDocument();
    });
  });
  
  test("should navigate to questions screen", async () => {
    mockedAxios.get.mockResolvedValueOnce({data: mockQuestions});
    mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers});

    render(<RouterProvider router={router} />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText(/start personality test/i));
      expect(screen.getByTestId('questions')).toBeInTheDocument();
    });
  });
});