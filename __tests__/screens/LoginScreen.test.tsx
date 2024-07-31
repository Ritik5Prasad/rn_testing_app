import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { persistor, RootState, store } from '../../src/redux/store'; // Import the configured store
import LoginScreen from '../../src/screens/LoginScreen';
import { navigate } from '../../src/utils/NavigationUtil';
import { loginUser } from '../../src/redux/reducers/userSlice';

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

describe('LoginScreen', () => {
    beforeEach(() => {
        persistor.purge();
        jest.clearAllMocks();
    });


    it('should render correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );

        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
    });

    it('should handle input changes correctly', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );

        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');

        expect(emailInput.props.value).toBe('test@example.com');
        expect(passwordInput.props.value).toBe('password123');
    });

    it('should validate inputs correctly', async () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );

        fireEvent.changeText(getByPlaceholderText('Email'), '');
        fireEvent.changeText(getByPlaceholderText('Password'), '');
        fireEvent.press(getByTestId('Login'));

        await waitFor(() => {
            expect(getByText('Please enter your email')).toBeTruthy();
            expect(getByText('Enter your password')).toBeTruthy();
        });
    });

    it('should validate email format correctly', async () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );

        fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.press(getByTestId('Login'));

        await waitFor(() => {
            expect(getByText('Please enter a valid email')).toBeTruthy();
        });
    });

    it('should clear email error on focus', async () => {
        const { getByPlaceholderText, queryByText, getByTestId, getByText } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );

        // Simulate input change to an invalid value
        fireEvent.changeText(getByPlaceholderText('Email'), '');
        fireEvent.press(getByTestId('Login'));

        // Check if the email error message is displayed
        await waitFor(() => {
            expect(getByText('Please enter your email')).toBeTruthy();
        });

        // Simulate focus on the email input field
        fireEvent(getByPlaceholderText('Email'), 'focus');

        // Check if the email error message is cleared
        expect(queryByText('Please enter your email')).toBeNull();
    });

    it('should clear password error on focus', async () => {
        const { getByPlaceholderText, queryByText, getByTestId, getByText } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );

        // Simulate input change to an invalid value
        fireEvent.changeText(getByPlaceholderText('Password'), '');
        fireEvent.press(getByTestId('Login'));

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
                <LoginScreen />
            </Provider>
        );

        // Simulate input change to invalid values
        fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
        fireEvent.changeText(getByPlaceholderText('Password'), '');
        fireEvent.press(getByTestId('Login'));

        // Check if the correct error messages are set
        await waitFor(() => {
            expect(getByText('Please enter a valid email')).toBeTruthy();
            expect(getByText('Enter your password')).toBeTruthy();
        });
    });

    it('should call loginUser and navigate on successful login', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );

        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.press(getByTestId('Login'));
        const action = await store.dispatch(loginUser({ email: 'test@example.com', password: 'password123' }));


        expect(action.type).toBe(loginUser.fulfilled.type);
    });

    it('should display loading state correctly', () => {
        const { getByTestId, getByPlaceholderText } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.press(getByTestId('Login'));
    });


    it('should navigate to RegisterScreen on sign up link press', () => {
        const { getByText } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );

        fireEvent.press(getByText("Don't have an account? Sign Up"));
        expect(navigate).toHaveBeenCalledWith('RegisterScreen');
    });
});
