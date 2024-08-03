import {by} from 'detox';

describe('Onboarding Process', () => {
  beforeAll(async () => {
    await device.launchApp();
    await waitFor(element(by.id('OnboardingScreen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should display the first slide and navigate to next slide', async () => {
    await expect(
      element(by.text('Grab all events now only in your hands')),
    ).toBeVisible();
    await element(by.id('OnboardingScreen')).takeScreenshot();

    await element(by.text('Next')).tap();
    await expect(
      element(by.text('Easy payment & fast event ticket')),
    ).toBeVisible();
  });

  it('should navigate to login screen on third slide', async () => {
    await element(by.id('OnboardingScreen')).takeScreenshot();
    await element(by.text('Next')).tap();
    await element(by.text('Login')).tap();
    await expect(element(by.id('LoginScreen'))).toBeVisible();
  });
});
