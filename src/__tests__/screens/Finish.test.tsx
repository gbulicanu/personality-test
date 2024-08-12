import { describe, test } from '@jest/globals';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import axios from 'axios';

import Landing from '../../screens/Landing';
import Finish from '../../screens/Finish';

import { mockTraitExtrovert } from '../../__mocks__';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Finish screen', () => {
    const time = 1723459384.318743;
    const router = createMemoryRouter([
        {
        path: "/",
        element: <Landing />
        },
        {
        path: "/finish",
        element: <Finish />
        }
    ], { initialEntries: ['/finish']});

    beforeAll(() => {
        localStorage.setItem('personality-trait', JSON.stringify(mockTraitExtrovert));
    });

    test('should render retake button', async () => {
        render(<RouterProvider router={router} />);

        await waitFor(() => {
            const button = screen.getByText(/Retake test/i);

            expect(button).toBeInTheDocument();
        });
    });

    test('should be able to navigate to landing screen', async () => {
        render(<RouterProvider router={router} />);

        await waitFor(() => {
            const button = screen.getByText(/Retake test/i);
            
            mockedAxios.get.mockResolvedValueOnce({data: {time}});
            fireEvent.click(button);

            expect(localStorage.getItem('personality-trait')).toBeNull();
            expect(screen.getByText(/Start Personality Test/i)).toBeInTheDocument();
        });
    });
});