import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import axios from 'axios';

import Questions from './Questions';
import Finish from './Finish';

import { mockQuestionAnswers, mockQuestions } from './__mocks__/questions';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Questions screen', () => {
    const router = createMemoryRouter(
        [{
            path: "/questions",
            element: <Questions />
        },
        {
            path: "/finish",
            element: <Finish />
        }], 
        { initialEntries: ['/questions']});

  test('should render counter heading', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: mockQuestions});
    mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers});

    render(<RouterProvider router={router} />);
    
    await waitFor(() => {
        const heading = screen.getByText(/Question 1 of 3/i);
        expect(heading).toBeInTheDocument();
    });
  });
});