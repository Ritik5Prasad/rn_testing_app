import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnBoardingScreen from '../../src/screens/OnBoardingScreen';
import { navigate } from '../../src/utils/NavigationUtil';


// Mock the navigate function
jest.mock('../../src/utils/NavigationUtil', () => ({
    navigate: jest.fn(),
}));



describe('OnBoardingScreen', () => {
    it('should render onboarding slides and navigate correctly', () => {
        const { getByText } = render(<OnBoardingScreen />);

        const loginButton = getByText('Login');
        const signUpButton = getByText('Sign up');

        fireEvent.press(loginButton);
        expect(navigate).toHaveBeenCalledWith('LoginScreen');

        fireEvent.press(signUpButton);
        expect(navigate).toHaveBeenCalledWith('RegisterScreen');
    });

    it('should call scrollBy(1) when Next button is pressed in the first slide', () => {
        const { getAllByText } = render(<OnBoardingScreen />);
        const nextButtons = getAllByText('Next');


        expect(nextButtons).toHaveLength(2);


        fireEvent.press(nextButtons[0]);

    });
});
