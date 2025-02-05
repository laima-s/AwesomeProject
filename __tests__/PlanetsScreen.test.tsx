import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import PlanetsScreen from '../app/components/PlanetsScreen';
import useFetch from '../app/hooks/useFetch';

jest.mock('../app/hooks/useFetch');
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('PlanetsScreen', () => {
  it('renders loading state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { getByText, getByTestId } = render(<PlanetsScreen />);

    expect(getByText('Loading...')).toBeTruthy();
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('renders error state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to fetch data' },
    });

    const { getByText } = render(<PlanetsScreen />);

    expect(getByText('Error: Failed to fetch data')).toBeTruthy();
  });

  it('renders data correctly', () => {
    const mockData = {
      results: [
        { name: 'Tatooine', climate: 'arid', population: '200000' },
        { name: 'Alderaan', climate: 'temperate', population: '2000000000' },
      ],
    };

    (useFetch as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<PlanetsScreen />);

    expect(getByText('Tatooine')).toBeTruthy();
    expect(getByText('Climate: arid')).toBeTruthy();
    expect(getByText('Population: 200000')).toBeTruthy();
    expect(getByText('Alderaan')).toBeTruthy();
    expect(getByText('Climate: temperate')).toBeTruthy();
    expect(getByText('Population: 2000000000')).toBeTruthy();
  });

  it('opens the correct URL when a planet is pressed', () => {
    const mockData = {
      results: [
        { name: 'Tatooine', climate: 'arid', population: '200000' },
      ],
    };

    (useFetch as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<PlanetsScreen />);
    const planetItem = getByText('Tatooine');

    fireEvent.press(planetItem);

    expect(Linking.openURL).toHaveBeenCalledWith('https://starwars.fandom.com/wiki/Tatooine');
  });

  it('renders DataScreen with correct props', () => {
    const { getByText } = render(<PlanetsScreen />);
    expect(getByText('Tatooine')).toBeTruthy();
    expect(getByText('Climate: arid')).toBeTruthy();
    expect(getByText('Population: 200000')).toBeTruthy();
  });
});