import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('has three tabs', () => {
    const { getByText } = render(<App />);
    expect(getByText('People')).toBeTruthy();
    expect(getByText('Planets')).toBeTruthy();
    expect(getByText('Spaceships')).toBeTruthy();
  });

  it('renders People tab icon', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('People-icon')).toBeTruthy();
  });

  it('renders Planets tab icon', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('Planets-icon')).toBeTruthy();
  });

  it('renders Spaceships tab icon', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('Spaceships-icon')).toBeTruthy();
  });
});