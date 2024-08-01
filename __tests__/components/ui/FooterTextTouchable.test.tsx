
import { fireEvent, render, screen } from '@testing-library/react-native'
import FooterTextTouchable from '../../../src/components/ui/FooterTextTouchable'

describe('Footer Text Touchable', () => {
    it('should render with the correct text', () => {
        const text = "Test footer"

        render(<FooterTextTouchable onPress={() => { }} text={text} />)
        const buttonText = screen.getByText(text)
        expect(buttonText).toBeTruthy()
    })

    it('should call onPress when pressed', () => {
        const onPressMock = jest.fn()
        render(<FooterTextTouchable onPress={onPressMock} text='Button' />)

        const footerButton = screen.getByTestId('footer-button')
        fireEvent.press(footerButton)
        expect(onPressMock).toHaveBeenCalled()

        const footerView = screen.getByTestId('footer-view')
        expect(footerView).toHaveStyle({
            position: 'relative',
            alignSelf: 'center'
        })
    })
})

