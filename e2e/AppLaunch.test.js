describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have logo image', async () => {
    await expect(element(by.id('logo-image'))).toBeVisible();
    await expect(element(by.id('loading-indicator'))).toBeVisible();
  });

  it('should navigate to Onboarding Screen', async () => {
    await waitFor(element(by.id('OnboardingScreen')))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id('OnboardingScreen'))).toBeVisible();
  });
});
