import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import SpaceshipsScreen from '../app/components/SpaceshipsScreen';
import { Starship } from '../app/types';
import DataScreen from '../app/screen/DataScreen';
import useFetch from '../app/hooks/useFetch';

jest.mock('../app/hooks/useFetch');
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

jest.mock('../app/screen/DataScreen', () => jest.fn());

const mockStarship: Starship = {
    name: 'Millennium Falcon',
    model: 'YT-1300 light freighter',
    manufacturer: 'Corellian Engineering Corporation',
};

describe('SpaceshipsScreen', () => {
    it('renders correctly', () => {
        (DataScreen as jest.Mock).mockImplementation(({ renderItem }) => renderItem({ item: mockStarship }));
        const { getByText } = render(<SpaceshipsScreen />);

        expect(getByText('Millennium Falcon')).toBeTruthy();
        expect(getByText('Model:')).toBeTruthy();
        expect(getByText('YT-1300 light freighter')).toBeTruthy();
        expect(getByText('Manufacturer:')).toBeTruthy();
        expect(getByText('Corellian Engineering Corporation')).toBeTruthy();
    });

    it('opens the correct URL when a starship is pressed', () => {
        (DataScreen as jest.Mock).mockImplementation(({ renderItem }) => renderItem({ item: mockStarship }));
        const { getByText } = render(<SpaceshipsScreen />);
        const openURLSpy = jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());

        fireEvent.press(getByText('Millennium Falcon'));

        expect(openURLSpy).toHaveBeenCalledWith('https://starwars.fandom.com/wiki/Millennium_Falcon');
    });

    it('renders loading state correctly', () => {
        (useFetch as jest.Mock).mockReturnValue({
          data: null,
          isLoading: true,
          error: null,
        });
    
        const { getByText, getByTestId } = render(<SpaceshipsScreen />);
    
        expect(getByText('Loading...')).toBeTruthy();
        expect(getByTestId('ActivityIndicator')).toBeTruthy();
    });
    
    it('renders error state correctly', () => {
        (useFetch as jest.Mock).mockReturnValue({
          data: null,
          isLoading: false,
          error: { message: 'Failed to fetch data' },
        });
    
        const { getByText } = render(<SpaceshipsScreen />);
    
        expect(getByText('Error: Failed to fetch data')).toBeTruthy();
    });
    
    it('renders data correctly', () => {
        const mockData = {
          results: [
            { name: 'Millennium Falcon', model: 'YT-1300 light freighter', manufacturer: 'Corellian Engineering Corporation' },
            { name: 'X-wing', model: 'T-65 X-wing starfighter', manufacturer: 'Incom Corporation' },
          ],
        };
    
        (useFetch as jest.Mock).mockReturnValue({
          data: mockData,
          isLoading: false,
          error: null,
        });
    
        const { getByText } = render(<SpaceshipsScreen />);
    
        expect(getByText('Millennium Falcon')).toBeTruthy();
        expect(getByText('Model: YT-1300 light freighter')).toBeTruthy();
        expect(getByText('Manufacturer: Corellian Engineering Corporation')).toBeTruthy();
        expect(getByText('X-wing')).toBeTruthy();
        expect(getByText('Model: T-65 X-wing starfighter')).toBeTruthy();
        expect(getByText('Manufacturer: Incom Corporation')).toBeTruthy();
    });
    
    it('opens the correct URL when a spaceship is clicked', () => {
        const mockData = {
          results: [
            { name: 'Millennium Falcon', model: 'YT-1300 light freighter', manufacturer: 'Corellian Engineering Corporation' },
          ],
        };
    
        (useFetch as jest.Mock).mockReturnValue({
          data: mockData,
          isLoading: false,
          error: null,
        });
    
        const { getByText } = render(<SpaceshipsScreen />);
        const spaceshipItem = getByText('Millennium Falcon');
    
        fireEvent.press(spaceshipItem);
    
        expect(Linking.openURL).toHaveBeenCalledWith('https://starwars.fandom.com/wiki/Millennium_Falcon');
    });
});