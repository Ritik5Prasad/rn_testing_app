import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import OnboardItem from '../../../src/components/global/OnboardItem';

describe('OnboardItem', () => {
  const mockOnPressFirst = jest.fn();
  const mockOnPressSecond = jest.fn();
  const imageSource = {uri: 'https://example.com/image.jpg'};
  const title = 'Test Title';
  const subtitle = 'Test Subtitle';
  const buttonTitleFirst = 'First Button';
  const buttonTitleSecond = 'Second Button';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with one button', () => {
    const {getByText, getByTestId} = render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
      />,
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(subtitle)).toBeTruthy();
    expect(getByText(buttonTitleFirst)).toBeTruthy();
    expect(getByTestId('background-image')).toBeTruthy();
  });

  it('should render correctly with two buttons', () => {
    const {getByText} = render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
        onPressSecond={mockOnPressSecond}
        buttonTitleSecond={buttonTitleSecond}
      />,
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(subtitle)).toBeTruthy();
    expect(getByText(buttonTitleFirst)).toBeTruthy();
    expect(getByText(buttonTitleSecond)).toBeTruthy();
  });

  it('should call onPressFirst when the first button is pressed', () => {
    const {getByText} = render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
      />,
    );

    fireEvent.press(getByText(buttonTitleFirst));
    expect(mockOnPressFirst).toHaveBeenCalled();
  });

  it('should call onPressSecond when the second button is pressed', () => {
    const {getByText} = render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
        onPressSecond={mockOnPressSecond}
        buttonTitleSecond={buttonTitleSecond}
      />,
    );

    fireEvent.press(getByText(buttonTitleSecond));
    expect(mockOnPressSecond).toHaveBeenCalled();
  });
});
