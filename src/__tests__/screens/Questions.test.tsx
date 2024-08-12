import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import axios from 'axios';

import Questions from '../../screens/Questions';
import Finish from '../../screens/Finish';

import { 
  mockQuestionAnswers1,
  mockQuestionAnswers2,
  mockQuestions,
  mockTraitIntrovert
} from '../../__mocks__';

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

    beforeEach(() => {
        mockedAxios.get.mockResolvedValueOnce({data: mockQuestions});
        mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers1});
    });

  test('should render counter heading', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
        const heading = screen.getByText(/Question 1 of 3/i);
        expect(heading).toBeInTheDocument();
    });
  });

  test('should render required note', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
        const heading = screen.getByText(/All questions are required/i);
        expect(heading).toBeInTheDocument();
    });
  });


  test('should render next button disabled initially', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
        const nextButton = screen.getByTestId('next-button');
        expect(nextButton).toBeDisabled();
    });
  });

  test('should not render previous button initially', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
        const previousButton = screen.queryByTestId('prev-button');
        expect(previousButton).not.toBeInTheDocument();
    });
  });


  test('should enable next button after selecting', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
        const nextButton = screen.getByTestId('next-button');

        fireEvent.click(screen.getByTestId('question-A'));

        expect(nextButton).toBeEnabled();
    });
  });

  test('should be able to move to next question', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
        const nextButton = screen.getByTestId('next-button');
        const firstQuestionRadio = screen.getByTestId('question-A');
        fireEvent.click(firstQuestionRadio);
        mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers1});

        fireEvent.click(nextButton);

        const firstQuestionLabel = screen.getByTestId('question-label-A');
        const previousButton = screen.queryByTestId('prev-button');
        expect(firstQuestionRadio).not.toBeChecked();
        expect(nextButton).toBeDisabled();
        expect(previousButton).toBeInTheDocument();
        expect(firstQuestionLabel).toHaveTextContent(mockQuestionAnswers1.answers[0].title);
    });
  });

  test('should be able to move to previous question', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
        const nextButton = screen.getByTestId('next-button');
        const firstQuestionRadio = screen.getByTestId('question-A');
        fireEvent.click(firstQuestionRadio);
        mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers1});
        fireEvent.click(nextButton);
        const previousButton = screen.getByTestId('prev-button');
        mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers2});

        fireEvent.click(previousButton);

        const heading = screen.queryByText(/Question 1 of 3/i);
        expect(heading).toBeInTheDocument();
        
        const firstQuestionRadioLabel = screen.getByTestId('question-label-A');
        expect(firstQuestionRadioLabel).toHaveTextContent(mockQuestionAnswers1.answers[0].title);
    });
  });

  test('should be able to see finish button on last question', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId('next-button'));

    const nextButton = screen.getByTestId('next-button');
    const firstQuestionRadio = screen.getByTestId('question-A');

    fireEvent.click(firstQuestionRadio);
    mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers1});
    fireEvent.click(nextButton);

    fireEvent.click(firstQuestionRadio);
    mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers2});
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      const finishButton = screen.queryByTestId('finish-button');
      expect(finishButton).toBeInTheDocument();
      expect(finishButton).toBeDisabled();

      fireEvent.click(firstQuestionRadio);
  
      expect(finishButton).toBeEnabled();
    });
  });

  test('should be able to post question answers', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId('next-button'));

    const nextButton = screen.getByTestId('next-button');
    const firstQuestionRadio = screen.getByTestId('question-A');

    fireEvent.click(firstQuestionRadio);
    mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers1});
    fireEvent.click(nextButton);

    fireEvent.click(firstQuestionRadio);
    mockedAxios.get.mockResolvedValueOnce({data: mockQuestionAnswers2});
    fireEvent.click(nextButton);
    
    
    await waitFor(() => screen.getByTestId('finish-button'));
    const finishButton = screen.getByTestId('finish-button');

    await waitFor(() => {
      fireEvent.click(firstQuestionRadio);
      mockedAxios.post.mockResolvedValueOnce({data: mockTraitIntrovert});
      fireEvent.click(finishButton);
      expect(screen.getByTestId('retake-button')).toBeInTheDocument();
      expect(localStorage.getItem('personality-trait')).toEqual(JSON.stringify(mockTraitIntrovert))
    });
  });
});