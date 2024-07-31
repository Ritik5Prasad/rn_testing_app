import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import FooterTextTouchable from "../../../src/components/ui/FooterTextTouchable";
import TextStyle from "../../../src/styles/TextStyle";

describe("FooterTextTouchable", () => {
  it("should render with the correct text", () => {
    const text = "Test Footer Text";
    render(<FooterTextTouchable onPress={() => { }} text={text} />);

    const displayedText = screen.getByText(text);
    expect(displayedText).toBeTruthy();
  });

  it("should call onPress when pressed", () => {
    const onPressMock = jest.fn();
    render(<FooterTextTouchable onPress={onPressMock} text="Test Footer Text" />);

    const footerView = screen.getByTestId("footer-button");
    fireEvent.press(footerView);
    expect(onPressMock).toHaveBeenCalled();
  });

  it("should apply custom styles", () => {
    const customStyle = { backgroundColor: 'red' };
    render(
      <FooterTextTouchable
        onPress={() => { }}
        text="Test Footer Text"
        style={customStyle}
      />
    );

    const footerView = screen.getByTestId("footer-view");
    expect(footerView).toHaveStyle(customStyle);
  });

  it("should apply default styles", () => {
    render(<FooterTextTouchable onPress={() => { }} text="Test Footer Text" />);

    const footerView = screen.getByTestId("footer-view");
    expect(footerView).toHaveStyle({
      position: "relative",
      alignSelf: "center",
    });
  });
});
