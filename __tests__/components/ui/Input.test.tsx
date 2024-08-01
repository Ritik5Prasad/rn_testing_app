import { act, fireEvent, render, screen } from '@testing-library/react-native'
import Input from '../../../src/components/ui/Input';

describe("Input", () => {
    const mockOnChangeText = jest.fn()
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();

    it('should render correctly', () => {
        const { getByTestId } = render(
            <Input
                value=''
                onChangeText={mockOnChangeText}
                placeholder='Enter Text'
                testID='inputComponent'
            />)

        expect(getByTestId('inputComponent')).toBeTruthy()
    })

    it('should handle multiple focus and blur events', () => {
        const { getByTestId } = render(
            <Input
                value=''
                onChangeText={mockOnChangeText}
                placeholder='Enter Text'
                onFocus={mockOnFocus}
                onBlur={mockOnBlur}

            />)

        fireEvent(getByTestId('textInput'), 'focus', {})
        fireEvent(getByTestId('textInput'), 'blur', {})
        fireEvent(getByTestId('textInput'), 'focus', {})
        fireEvent(getByTestId('textInput'), 'blur', {})

        expect(mockOnFocus).toHaveBeenCalledTimes(2)
        expect(mockOnBlur).toHaveBeenCalledTimes(2)
    })

    it('should display error text if error prop is provided', () => {
        const { getByTestId } = render(
            <Input
                value=''
                onChangeText={mockOnChangeText}
                placeholder='Enter Text'
                error="This is an error"
            />)


        expect(getByTestId('errorText')).toHaveTextContent("This is an error")
    })

    it('should call onFocus and setFoucs state on input focus', () => {
        const { getByTestId } = render(
            <Input
                value=''
                onChangeText={mockOnChangeText}
                placeholder='Enter Text'
                onFocus={mockOnFocus}
            />)

        act(() => {
            fireEvent(getByTestId('textInput'), 'focus', {})
        })
        expect(mockOnFocus).toHaveBeenCalled()
    })

    it('should call onBlur ', () => {
        const { getByTestId } = render(
            <Input
                value=''
                onChangeText={mockOnChangeText}
                placeholder='Enter Text'
                onFocus={mockOnFocus}
            />)

        act(() => {
            fireEvent(getByTestId('textInput'), 'blur', {})
        })
        expect(mockOnFocus).toHaveBeenCalled()
    })

    it('should apply disabled style ', () => {
        const { getByTestId } = render(
            <Input
                value=''
                onChangeText={mockOnChangeText}
                placeholder='Enter Text'
                disabled
            />)

        const inputContainer = getByTestId('parent')
        expect(inputContainer).toHaveStyle({ pointerEvents: 'none' })

        const textInput = getByTestId('textInput')
        expect(textInput.props.editable).toBe(false)
    })


    it('should call default onFocus function when not provided ', () => {
        const { getByTestId } = render(
            <Input
                value=''
                onChangeText={mockOnChangeText}
                placeholder='Enter Text'

            />)

        act(() => {
            fireEvent(getByTestId('textInput'), 'focus', {})
        })
    })

    it('should call default onBlur function when not provided ', () => {
        const { getByTestId } = render(
            <Input
                value=''
                onChangeText={mockOnChangeText}
                placeholder='Enter Text'

            />)

        act(() => {
            fireEvent(getByTestId('textInput'), 'blur', {})
        })
    })





})

