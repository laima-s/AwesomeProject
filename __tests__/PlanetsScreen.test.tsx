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
      error: { message: 'Failed to fetch data' },
    });

    render(<PlanetsScreen />);

    expect(screen.getByText('Error: Failed to fetch data')).toBeTruthy();
  });

  it('renders planets correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: 'Tatooine', climate: 'arid', population: '200000' },
          { name: 'Alderaan', climate: 'temperate', population: '2000000000' },
        ],
      },
      isLoading: false,
      error: null,
    });

    render(<PlanetsScreen />);

    expect(screen.getByText('Tatooine')).toBeTruthy();
    expect(screen.getByText('Climate: arid')).toBeTruthy();
    expect(screen.getByText('Population: 200000')).toBeTruthy();

    expect(screen.getByText('Alderaan')).toBeTruthy();
    expect(screen.getByText('Climate: temperate')).toBeTruthy();
    expect(screen.getByText('Population: 2000000000')).toBeTruthy();
  });
});
