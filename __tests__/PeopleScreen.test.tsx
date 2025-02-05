import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import PeopleScreen from '../app/components/PeopleScreen';
import useFetch from '../app/hooks/useFetch';

jest.mock('../app/hooks/useFetch');
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('PeopleScreen', () => {
  it('renders loading state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { getByText, getByTestId } = render(<PeopleScreen />);

    expect(getByText('Loading...')).toBeTruthy();
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('renders error state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to fetch data' },
    });

    const { getByText } = render(<PeopleScreen />);

    expect(getByText('Error: Failed to fetch data')).toBeTruthy();
  });

  it('renders data correctly', () => {
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

    const { getByText } = render(<PeopleScreen />);

    expect(getByText('Luke Skywalker')).toBeTruthy();
    expect(getByText('Darth Vader')).toBeTruthy();
  });

  it('opens the correct URL when a person is clicked', () => {
    const mockData = {
      results: [
        { name: 'Luke Skywalker', height: '172', mass: '77' },
      ],
    };

    (useFetch as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<PeopleScreen />);
    const personItem = getByText('Luke Skywalker');

    fireEvent.press(personItem);

    expect(Linking.openURL).toHaveBeenCalledWith('https://starwars.fandom.com/wiki/Luke_Skywalker');
  });
});