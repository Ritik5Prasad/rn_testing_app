describe('Login Process', () => {
  beforeAll(async () => {
    await device.launchApp();
    await waitFor(element(by.id('OnboardingScreen')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.text('Next')).tap();
    await element(by.text('Next')).tap();
    await element(by.text('Sign up')).tap();
    await element(by.id('first_name')).typeText('Ritik');
    await element(by.id('last_name')).typeText('Prasad');
    await element(by.id('email')).typeText('ritik@gmail.com');
    await element(by.id('password')).typeText('12345678');
    await device.pressBack();
  });

  it('Should fill email and password and navigate to home screen', async () => {
    await expect(element(by.id('Register'))).toBeVisible();
    await element(by.id('Register')).tap();
    await expect(element(by.text('Testing Complete'))).toBeVisible();
  });``
});
