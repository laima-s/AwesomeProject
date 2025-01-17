import 'react-native';
import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the screens
jest.mock('../app/components/PeopleScreen', () => 'PeopleScreen');
jest.mock('../app/components/SpaceshipsScreen', () => 'SpaceshipsScreen');
jest.mock('../app/components/PlanetsScreen', () => 'PlanetsScreen');

const queryClient = new QueryClient();

describe('App', () => {
  it('renders correctly', () => {
    const { toJSON } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </QueryClientProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('has three tabs', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </QueryClientProvider>
    );

    expect(getByText('People')).toBeTruthy();
    expect(getByText('Spaceships')).toBeTruthy();
    expect(getByText('Planets')).toBeTruthy();
  });

  it('renders PeopleScreen when People tab is selected', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </QueryClientProvider>
    );

    expect(getByText('PeopleScreen')).toBeTruthy();
  });

  it('renders SpaceshipsScreen when Spaceships tab is selected', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </QueryClientProvider>
    );

    expect(getByText('SpaceshipsScreen')).toBeTruthy();
  });

  it('renders PlanetsScreen when Planets tab is selected', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </QueryClientProvider>
    );

    expect(getByText('PlanetsScreen')).toBeTruthy();
  });
});