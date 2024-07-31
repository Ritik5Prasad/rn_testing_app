import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.useFakeTimers();

// Mock react-native-size-matters if needed
jest.mock('react-native-size-matters');

// Mock redux-persist
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((_config, reducers) => reducers),
    // Mock other exports if needed
  };
});

test('The Main App Renders Correctly', () => {
  const { toJSON } = render(<App />);
  expect(toJSON()).toMatchSnapshot();
});
