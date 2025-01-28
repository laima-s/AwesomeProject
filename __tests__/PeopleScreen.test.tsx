import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PeopleScreen from '../app/components/PeopleScreen';
import DataScreen from '../app/screen/DataScreen';
import useFetch from '../app/hooks/useFetch';

jest.mock('../app/hooks/useFetch');
jest.mock('../app/screen/DataScreen', () => jest.fn());

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
        (useFetch as jest.Mock).mockReturnValue({
            data: {
                results: [
                    { name: 'Luke Skywalker', height: '172', mass: '77' },
                    { name: 'Darth Vader', height: '202', mass: '136' },
                ],
            },
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

    it('passes the correct props to DataScreen', () => {
        const mockRenderItem = jest.fn();
        (DataScreen as jest.Mock).mockImplementation(({ renderItem }) => {
            renderItem({ item: { name: 'Luke Skywalker', height: '172', mass: '77' } });
            return null;
        });

        render(<PeopleScreen />);
        expect(DataScreen).toHaveBeenCalledWith(
            expect.objectContaining({
                endpoint: 'people',
                renderItem: expect.any(Function),
                backgroundImage: expect.any(Number), // Assuming backgroundImage is a require statement
            })
        );
    });
});