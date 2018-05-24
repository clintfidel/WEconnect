module.exports = {
  "Render landing page with all elements": (browser) => {
    browser
      .url('http://localhost:5600')
      .waitForElementVisible('body', 5000)
      .assert.visible('button.signup')
      .assert.containsText('button.signup', 'Sign Up')
      .assert.visible('button.login')
      .assert.containsText('button.login', 'Login')
      .assert.visible('h2')
      .assert.containsText('h2', 'Business made easy!')
      .assert.visible('p')
      .assert.containsText('p', 'WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with. This is also an opportunity to get insight as to starting up a business. Explore this amazing business relationship App and get experienced in the experience!')
      .assert.visible('section.footer');
    browser.expect.element('img').to.have.attribute('src')
      .which.contains('images/logo-with-background.png');
    browser.pause(5000);
    browser.end();
  }
};
