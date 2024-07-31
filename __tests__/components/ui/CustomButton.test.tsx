import { render, fireEvent, screen } from '@testing-library/react-native';
import CustomButton from '../../../src/components/ui/CustomButton';
import { Colors } from '../../../src/utils/Colors';

jest.mock('../../../src/utils/Scaling', () => ({
    normalizeModerately: jest.fn().mockReturnValue(12),
    normalizeWidth: jest.fn().mockReturnValue(12),
}));

describe('CustomButton', () => {
    it('should render with the correct title', () => {
        const title = 'Test Button';
        render(<CustomButton onPress={() => { }} title={title} />);

        const buttonText = screen.getByText(title);
        expect(buttonText).toBeTruthy();
    });

    it('should show ActivityIndicator when loading is true', () => {
        render(<CustomButton onPress={() => { }} title="Test Button" loading={true} />);

        const activityIndicator = screen.getByTestId('activity-indicator');
        expect(activityIndicator).toBeTruthy();
    });

    it('should call onPress when the button is pressed', () => {
        const onPressMock = jest.fn();
        render(<CustomButton onPress={onPressMock} title="Test Button" />);

        const button = screen.getByText('Test Button');
        fireEvent.press(button);

        expect(onPressMock).toHaveBeenCalled();
    });

    it('should apply custom backgroundColor and textColor', () => {
        const backgroundColor = 'red';
        const textColor = 'blue';
        render(
            <CustomButton
                onPress={() => { }}
                title="Test Button"
                backgroundColor={backgroundColor}
                textColor={textColor}
            />
        );

        const button = screen.getByTestId('custom-button');
        const buttonText = screen.getByText('Test Button');

        expect(button).toHaveStyle({ backgroundColor: backgroundColor });
        expect(buttonText.props.style).toContainEqual(
            expect.objectContaining({ color: textColor })
        );
    });


    it('should apply default styles when no custom props are provided', () => {
        render(<CustomButton onPress={() => { }} title="Test Button" />);
        const button = screen.getByTestId('custom-button');
        expect(button).toHaveStyle({ backgroundColor: Colors.primary });
    });

});
