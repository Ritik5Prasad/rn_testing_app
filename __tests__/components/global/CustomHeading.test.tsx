import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomHeading from '../../../src/components/global/CustomHeading';
import { goBack } from '../../../src/utils/NavigationUtil';


// Mock the goBack function
jest.mock('../../../src/utils/NavigationUtil', () => ({
    goBack: jest.fn(),
}));

describe('CustomHeading', () => {
    it('should render the title correctly', () => {
        const title = 'Test Title';
        const { getByText } = render(<CustomHeading title={title} />);

        expect(getByText(title)).toBeTruthy();
    });

    it('should call goBack when the back button is pressed', () => {
        const { getByTestId } = render(<CustomHeading title="Test Title" />);
        const backButton = getByTestId('back-button');

        fireEvent.press(backButton);

        expect(goBack).toHaveBeenCalled();
    });
});
