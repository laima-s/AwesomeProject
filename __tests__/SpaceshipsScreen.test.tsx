import React from 'react';
import { render } from '@testing-library/react-native';
import SpaceshipsScreen from '../app/components/SpaceshipsScreen';
import DataScreen from '../app/screen/DataScreen';

jest.mock('../app/screen/DataScreen', () => jest.fn());

describe('SpaceshipsScreen', () => {
    it('renders correctly', () => {
        (DataScreen as jest.Mock).mockReturnValue(null);
        const { toJSON } = render(<SpaceshipsScreen />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('passes the correct props to DataScreen', () => {
        const mockRenderItem = jest.fn();
        (DataScreen as jest.Mock).mockImplementation(({ renderItem }) => {
            renderItem({ item: { name: 'X-Wing', model: 'T-65', manufacturer: 'Incom Corporation' } });
            return null;
        });

        render(<SpaceshipsScreen />);
        expect(DataScreen).toHaveBeenCalledWith(
            expect.objectContaining({
                endpoint: 'spaceships',
                renderItem: expect.any(Function),
                backgroundImage: expect.any(Number), // Assuming backgroundImage is a require statement
            })
        );
        expect(mockRenderItem).toHaveBeenCalledWith({
            item: { name: 'X-Wing', model: 'T-65', manufacturer: 'Incom Corporation' },
        });
    });

    it('renders spaceship items correctly', () => {
        const mockRenderItem = jest.fn();
        (DataScreen as jest.Mock).mockImplementation(({ renderItem }) => {
            renderItem({ item: { name: 'X-Wing', model: 'T-65', manufacturer: 'Incom Corporation' } });
            return null;
        });

        const { getByText } = render(<SpaceshipsScreen />);
        expect(getByText('X-Wing')).toBeTruthy();
    });
});