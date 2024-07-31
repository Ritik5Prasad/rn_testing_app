import { FONTS } from "../../src/utils/Fonts";

describe('FONTS enum', () => {
  it('should have correct values', () => {
    expect(FONTS.Black).toBe('Poppins-Black');
    expect(FONTS.Bold).toBe('Poppins-Bold');
    expect(FONTS.Light).toBe('Poppins-Light');
    expect(FONTS.Medium).toBe('Poppins-Medium');
    expect(FONTS.Regular).toBe('Poppins-Regular');
    expect(FONTS.SemiBold).toBe('Poppins-SemiBold');
  });
});