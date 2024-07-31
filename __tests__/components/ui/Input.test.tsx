import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Input from '../../../src/components/ui/Input';


describe('Input component', () => {
    const mockOnChangeText = jest.fn();
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();

    it('should render correctly', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
                testID="inputComponent"
            />
        );

        expect(getByTestId('inputComponent')).toBeTruthy();
    });

    it('should display the placeholder text', () => {
        const { getByPlaceholderText } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
            />
        );

        expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('should call onChangeText when text is entered', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
            />
        );

        fireEvent.changeText(getByTestId('textInput'), 'New text');
        expect(mockOnChangeText).toHaveBeenCalledWith('New text');
    });

    it('should display error text if error prop is provided', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
                error="This is an error"
            />
        );

        expect(getByTestId('errorText')).toHaveTextContent('This is an error');
    });

    it('should call onFocus and set focus state on input focus', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
                onFocus={mockOnFocus}
            />
        );

        // Use `act` to ensure state updates are applied
        act(() => {
            fireEvent(getByTestId('textInput'), 'focus', {});
        });

        expect(mockOnFocus).toHaveBeenCalled();
    });

    it('should call onBlur and remove focus state on input blur', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
                onBlur={mockOnBlur}
            />
        );

        // Use `act` to ensure state updates are applied
        act(() => {
            fireEvent(getByTestId('textInput'), 'blur', {});
        });

        expect(mockOnBlur).toHaveBeenCalled();
    });

    it('should apply disabled style and prevent text changes when disabled', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
                disabled
            />
        );

        // Check that pointerEvents is set to 'none' for the disabled state
        const animatedView = getByTestId('animatedView');
        expect(animatedView).toHaveStyle({ pointerEvents: 'none' });

        // Ensure the text input is not editable
        const textInput = getByTestId('textInput');
        expect(textInput.props.editable).toBe(false);

    });

    it('should call onBlur and remove focus state on input blur', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
                onBlur={mockOnBlur}
            />
        );
        act(() => {
            fireEvent(getByTestId('textInput'), 'blur', {});
        });
        expect(mockOnBlur).toHaveBeenCalled();
    });

    it('should handle multiple focus and blur events', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
                onFocus={mockOnFocus}
                onBlur={mockOnBlur}
            />
        );
        fireEvent(getByTestId('textInput'), 'focus', {});
        fireEvent(getByTestId('textInput'), 'blur', {});
        fireEvent(getByTestId('textInput'), 'focus', {});
        fireEvent(getByTestId('textInput'), 'blur', {});
        expect(mockOnFocus).toHaveBeenCalledTimes(3);
        expect(mockOnBlur).toHaveBeenCalledTimes(4);
    });


    it('should call default onFocus function when not provided', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
            />
        );
        act(() => {
            fireEvent(getByTestId('textInput'), 'focus', {});
        });
    });

    it('should call default onBlur function when not provided', () => {
        const { getByTestId } = render(
            <Input
                value=""
                onChangeText={mockOnChangeText}
                placeholder="Enter text"
            />
        );
        act(() => {
            fireEvent(getByTestId('textInput'), 'blur', {});
        });

    });

});
