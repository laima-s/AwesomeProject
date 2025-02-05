import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import PeopleScreen from '../app/components/PeopleScreen';
import useFetch from '../app/hooks/useFetch';

jest.mock('../app/hooks/useFetch');

describe('PeopleScreen', () => {
    it('renders loading state correctly', () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        render(<PeopleScreen />);

        expect(screen.getByText('Loading...')).toBeTruthy();
        expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
    });

    it('renders error state correctly', () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: { message: 'Failed to fetch data' },
        });

        render(<PeopleScreen />);

        expect(screen.getByText('Error: Failed to fetch data')).toBeTruthy();
    });

    it('renders people correctly', () => {
        const mockData = {
            results: [
                { name: 'Luke Skywalker', height: '172', mass: '77' },
                { name: 'Darth Vader', height: '202', mass: '136' },
            ],
        };

        (useFetch as jest.Mock).mockReturnValue({
            data: mockData,
            isLoading: false,
            error: null,
        });

        render(<PeopleScreen />);

        expect(screen.getByText('Luke Skywalker')).toBeTruthy();
        expect(screen.getByText('Height: 172')).toBeTruthy();
        expect(screen.getByText('Mass: 77')).toBeTruthy();

        expect(screen.getByText('Darth Vader')).toBeTruthy();
        expect(screen.getByText('Height: 202')).toBeTruthy();
        expect(screen.getByText('Mass: 136')).toBeTruthy();
    });

    it('filters data based on search query', () => {
        const mockData = {
            results: [
                { name: 'Luke Skywalker', height: '172', mass: '77' },
                { name: 'Darth Vader', height: '202', mass: '136' },
            ],
        };

        (useFetch as jest.Mock).mockReturnValue({
            data: mockData,
            isLoading: false,
            error: null,
        });

        render(<PeopleScreen />);

        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.changeText(searchInput, 'Luke');

        expect(screen.getByText('Luke Skywalker')).toBeTruthy();
        expect(screen.queryByText('Darth Vader')).toBeNull();
    });
});