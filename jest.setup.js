import 'react-native-gesture-handler/jestSetup';
import 'react-native-reanimated/mock';
import Reanimated from 'react-native-reanimated/mock';
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PeopleScreen from '../app/components/PeopleScreen';
import useFetch from '../app/hooks/useFetch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mocking react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaConsumer: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

jest.mock('../app/hooks/useFetch');

const queryClient = new QueryClient();

describe('PeopleScreen', () => {
    it('renders loading state correctly', () => {
        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <PeopleScreen />
            </QueryClientProvider>
        );

        expect(screen.getByText('Loading...')).toBeTruthy();
        expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
    });

    it('renders error state correctly', () => {
        useFetch.mockReturnValue({
            data: null,
            isLoading: false,
            error: { message: 'Failed to fetch data' },
        });

        render(
            <QueryClientProvider client={queryClient}>
                <PeopleScreen />
            </QueryClientProvider>
        );

        expect(screen.getByText('Error: Failed to fetch data')).toBeTruthy();
    });

    it('renders data correctly', () => {
        useFetch.mockReturnValue({
            data: {
                results: [
                    { name: 'Luke Skywalker', height: '172', mass: '77' },
                    { name: 'Darth Vader', height: '202', mass: '136' },
                ],
            },
            isLoading: false,
            error: null,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <PeopleScreen />
            </QueryClientProvider>
        );

        expect(screen.getByText('Luke Skywalker')).toBeTruthy();
        expect(screen.getByText('Height: 172')).toBeTruthy();
        expect(screen.getByText('Mass: 77')).toBeTruthy();

        expect(screen.getByText('Darth Vader')).toBeTruthy();
        expect(screen.getByText('Height: 202')).toBeTruthy();
        expect(screen.getByText('Mass: 136')).toBeTruthy();
    });
});
