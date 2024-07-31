import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import SplashScreen from '../../src/screens/SplashScreen';
import { prepareNavigation, resetAndNavigate } from '../../src/utils/NavigationUtil';

// Mock the navigation functions
jest.mock('../../src/utils/NavigationUtil', () => ({
    prepareNavigation: jest.fn(),
    resetAndNavigate: jest.fn(),
}));

describe('SplashScreen', () => {
    it('should render correctly', () => {
        const { getByTestId } = render(<SplashScreen />);

        // Check if the image and ActivityIndicator are rendered
        expect(getByTestId('logo-image')).toBeTruthy();
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('should call prepareNavigation on mount', () => {
        render(<SplashScreen />);

        expect(prepareNavigation).toHaveBeenCalled();
    });

    it('should navigate to OnBoardingScreen after 3 seconds', async () => {
        render(<SplashScreen />);

        await waitFor(() => {
            expect(resetAndNavigate).toHaveBeenCalledWith('OnBoardingScreen');
        }, { timeout: 3500 }); // Wait for slightly more than 3 seconds
    });

 
});
