import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders the People tab', () => {
    const { getByText } = render(<App />);
    expect(getByText('People')).toBeTruthy();
  });

  it('renders the Planets tab', () => {
    const { getByText } = render(<App />);
    expect(getByText('Planets')).toBeTruthy();
  });

  it('renders the Spaceships tab', () => {
    const { getByText } = render(<App />);
    expect(getByText('Spaceships')).toBeTruthy();
  });

  it('renders the correct icon for the People tab', () => {
    const { getByTestId } = render(<App />);
    const peopleIcon = getByTestId('People-icon');
    expect(peopleIcon).toBeTruthy();
  });

  it('renders the correct icon for the Planets tab', () => {
    const { getByTestId } = render(<App />);
    const planetsIcon = getByTestId('Planets-icon');
    expect(planetsIcon).toBeTruthy();
  });

  it('renders the correct icon for the Spaceships tab', () => {
    const { getByTestId } = render(<App />);
    const spaceshipsIcon = getByTestId('Spaceships-icon');
    expect(spaceshipsIcon).toBeTruthy();
  });
});
