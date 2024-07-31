import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { persistor, store } from '../../src/redux/store'; // Import the configured store
import RegisterScreen from '../../src/screens/RegisterScreen';
import { navigate } from '../../src/utils/NavigationUtil';


// Mock the navigation function
jest.mock('../../src/utils/NavigationUtil', () => ({
    navigate: jest.fn(),
}));

jest.mock('redux-persist', () => ({
    persistStore: jest.fn().mockReturnValue({
        purge: jest.fn(),
    }),
    persistReducer: jest.requireActual('redux-persist').persistReducer,

}));

describe('RegisterScreen', () => {


    afterEach(() => {
        persistor.purge();  // Ensure persistor is cleaned up
        jest.clearAllMocks();  // Clear mocks after each test
    });

    it('should render correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        expect(getByPlaceholderText('First name')).toBeTruthy();
        expect(getByPlaceholderText('Last name')).toBeTruthy();
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText("Already have an account? Login In")).toBeTruthy();
    });

    it('should handle input changes correctly', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const firstNameInput = getByPlaceholderText('First name');
        const lastNameInput = getByPlaceholderText('Last name');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(firstNameInput, 'Ritik');
        fireEvent.changeText(lastNameInput, 'Prasad');

        expect(emailInput.props.value).toBe('test@example.com');
        expect(passwordInput.props.value).toBe('password123');
        expect(firstNameInput.props.value).toBe('Ritik');
        expect(lastNameInput.props.value).toBe('Prasad');
    });

    it('should validate inputs correctly', async () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        fireEvent.changeText(getByPlaceholderText('Email'), '');
        fireEvent.changeText(getByPlaceholderText('Password'), '');
        fireEvent.changeText(getByPlaceholderText('First name'), '');
        fireEvent.changeText(getByPlaceholderText('Last name'), '');
        fireEvent.press(getByTestId('Register'));

        await waitFor(() => {
            expect(getByText('Please enter your email')).toBeTruthy();
            expect(getByText('Enter your password')).toBeTruthy();
            expect(getByText('Enter your last name')).toBeTruthy();
            expect(getByText('Please enter your first name')).toBeTruthy();
        });
    });

    it('should validate email format correctly', async () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.press(getByTestId('Register'));

        await waitFor(() => {
            expect(getByText('Please enter a valid email')).toBeTruthy();
        });
    });

    it('should clear email error on focus', async () => {
        const { getByPlaceholderText, queryByText, getByTestId, getByText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        // Simulate input change to an invalid value
        fireEvent.changeText(getByPlaceholderText('Email'), '');
        fireEvent.changeText(getByPlaceholderText('First name'), '');
        fireEvent.changeText(getByPlaceholderText('Last name'), '');
        fireEvent.changeText(getByPlaceholderText('Password'), '');
        fireEvent.press(getByTestId('Register'));

        // Check if the email error message is displayed
        await waitFor(() => {
            expect(getByText('Please enter your email')).toBeTruthy();
            expect(getByText('Enter your password')).toBeTruthy();
            expect(getByText('Enter your last name')).toBeTruthy();
            expect(getByText('Please enter your first name')).toBeTruthy();
        });

        // Simulate focus on the email input field
        fireEvent(getByPlaceholderText('Email'), 'focus');
        fireEvent(getByPlaceholderText('First name'), 'focus');
        fireEvent(getByPlaceholderText('Last name'), 'focus');
        fireEvent(getByPlaceholderText('Password'), 'focus');

        // Check if the email error message is cleared
        expect(queryByText('Please enter your email')).toBeNull();
        expect(queryByText('Please enter your first name')).toBeNull();
        expect(queryByText('Enter your last name')).toBeNull();
        expect(queryByText('Enter your password')).toBeNull();


    });

    it('should clear password error on focus', async () => {
        const { getByPlaceholderText, queryByText, getByTestId, getByText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        // Simulate input change to an invalid value
        fireEvent.changeText(getByPlaceholderText('Password'), '');
        fireEvent.press(getByTestId('Register'));

        // Check if the password error message is displayed
        await waitFor(() => {
            expect(getByText('Enter your password')).toBeTruthy();
        });

        // Simulate focus on the password input field
        fireEvent(getByPlaceholderText('Password'), 'focus');

        // Check if the password error message is cleared
        expect(queryByText('Enter your password')).toBeNull();
    });

    it('should set errors correctly on input validation failure', async () => {
        const { getByPlaceholderText, getByTestId, getByText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        // Simulate input change to invalid values
        fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
        fireEvent.changeText(getByPlaceholderText('Password'), '');
        fireEvent.changeText(getByPlaceholderText('First name'), '');
        fireEvent.changeText(getByPlaceholderText('Last name'), '');
        fireEvent.press(getByTestId('Register'));

        // Check if the correct error messages are set
        await waitFor(() => {
            expect(getByText('Please enter a valid email')).toBeTruthy();
            expect(getByText('Enter your password')).toBeTruthy();
            expect(getByText('Enter your last name')).toBeTruthy();
            expect(getByText('Please enter your first name')).toBeTruthy();
        });
    });

    it('should call registeruser and navigate on successful register', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.changeText(getByPlaceholderText('First name'), 'Ritik');
        fireEvent.changeText(getByPlaceholderText('Last name'), 'Prasad');
        fireEvent.press(getByTestId('Register'));
    });

    it('should display loading state correctly', () => {
        const { getByTestId, getByPlaceholderText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.press(getByTestId('Register'));
    });

    it('should navigate to RegisterScreen on sign up link press', () => {
        const { getByText } = render(
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        );

        fireEvent.press(getByText("Already have an account? Login In"));
        expect(navigate).toHaveBeenCalledWith('LoginScreen');
    });

})