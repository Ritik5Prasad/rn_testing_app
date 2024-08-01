import { fireEvent, render, screen } from '@testing-library/react-native'
import CustomButton from '../../../src/components/ui/CustomButton'
describe('Custom Button', () => {
    const title = 'Test Button'
    it('should render with the correct title', () => {

        render(<CustomButton onPress={() => { }} title={title} />)

        const buttonText = screen.getByText(title)
        expect(buttonText).toBeTruthy()
    })

    it('should show Activity indicator when loading is true', () => {
        render(<CustomButton onPress={() => { }} title={title} loading={true} />)
        const activityIndicator = screen.getByTestId('activity-indicator');
        expect(activityIndicator).toBeOnTheScreen()
    })
})
