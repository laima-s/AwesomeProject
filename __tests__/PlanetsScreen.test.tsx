import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PlanetsScreen from '../app/components/PlanetsScreen';
import useFetch from '../app/hooks/useFetch';

jest.mock('../app/hooks/useFetch');

describe('PlanetsScreen', () => {
    it('renders loading state correctly', () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        render(<PlanetsScreen />);

        expect(screen.getByText('Loading...')).toBeTruthy();
        expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
    });

    it('renders error state correctly', () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: { message: 'Failed to fetch' },
        });

        render(<PlanetsScreen />);

        expect(screen.getByText('Error: Failed to fetch')).toBeTruthy();
    });

    it('renders planets list correctly', () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: {
                results: [
                    { name: 'Tatooine', climate: 'arid', terrain: 'desert' },
                    { name: 'Alderaan', climate: 'temperate', terrain: 'grasslands, mountains' },
                ],
            },
            isLoading: false,
            error: null,
        });

        render(<PlanetsScreen />);

        expect(screen.getByText('Tatooine')).toBeTruthy();
        expect(screen.getByText('Climate: arid')).toBeTruthy();
        expect(screen.getByText('Terrain: desert')).toBeTruthy();

        expect(screen.getByText('Alderaan')).toBeTruthy();
        expect(screen.getByText('Climate: temperate')).toBeTruthy();
        expect(screen.getByText('Terrain: grasslands, mountains')).toBeTruthy();
    });
});
