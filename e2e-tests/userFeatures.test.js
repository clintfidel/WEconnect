const path = require('path');
const {
  userDetails, businessDetails, businessDetails2,
  businessDetails3
} = require('./userDetailsMock');

module.exports = {
  "users can signup and logout": (browser) => {
    browser
      .url('http://localhost:5600')
      .waitForElementVisible('body', 5000)
      .click('button.signup')
      .setValue('input[name=fullname]', userDetails.fullname)
      .setValue('input[name=username]', userDetails.username)
      .setValue('input[name=email]', userDetails.email)
      .setValue('input[name=password]', userDetails.password)
      .setValue('input[name=passwordConfirm]', userDetails.cpassword)
      .click('button.btn')
      .waitForElementVisible('.toast-message', 5000)
      .click('button.toast-close-button')
      .waitForElementVisible('#navbarDropdownMenuLink', 10000)
      .click('#navbarDropdownMenuLink')
      .click('#logout');
  },
  'users should receive an error if required fields for signup are empty':
  (browser) => {
    browser
      .url('http://localhost:5600/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=fullname]', '    ')
      .setValue('input[name=username]', '    ')
      .setValue('input[name=email]', 'jhnony@gmail.com')
      .setValue('input[name=password]', 'jhnony12')
      .setValue('input[name=passwordConfirm]', 'jhnony12')
      .click('button.btn')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Invalid Input');
  },
  'users should not be able to sign up with an existing email':
  (browser) => {
    browser
      .url('http://localhost:5600/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=fullname]', userDetails.fullName)
      .setValue('input[name=username]', userDetails.username)
      .setValue('input[name=email]', userDetails.email)
      .setValue('input[name=password]', userDetails.password)
      .setValue('input[name=passwordConfirm]', userDetails.cpassword)
      .click('button.btn')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'email already exist');
  },
  'users should not be able to login with an invalid details':
  (browser) => {
    browser
      .url('http://localhost:5600/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'jhonny')
      .setValue('input[name=password]', 'jhonny123')
      .click('button.btn')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Invalid Credentials.');
  },
  'users should be able to login':
  (browser) => {
    browser
      .url('http://localhost:5600/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', userDetails.username)
      .setValue('input[name=password]', userDetails.password)
      .click('button.btn')
      .waitForElementVisible('.toast-message', 4000)
      .click('button.toast-close-button');
  },
  'users should not be able to register business with invalid input':
  (browser) => {
    browser
      .url('http://localhost:5600/register-business')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', '      ')
      .click('select[name=location]')
      .waitForElementVisible('#ADAMAWA', 5000)
      .click('#ADAMAWA')
      .click('select[name=categoryId]')
      .waitForElementVisible('#fashion', 5000)
      .click('#fashion')
      .setValue('textarea[name=details]', businessDetails.details)
      .click('button.register-button')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Invalid character in Business Name!')
      .pause(2000);
  },
  'users should be able to register business':
  (browser) => {
    browser
      .url('http://localhost:5600/register-business')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', businessDetails.name)
      .click('select[name=location]')
      .waitForElementVisible('#ADAMAWA', 5000)
      .click('#ADAMAWA')
      .click('select[name=categoryId]')
      .waitForElementVisible('#fashion', 5000)
      .click('#fashion')
      .setValue('#upload-business', path.resolve('./client/public/images/business.png'))
      .setValue('textarea[name=details]', businessDetails.details)
      .click('button.register-button')
      .waitForElementVisible('.toast-message', 10000)
      .click('button.toast-close-button')
      .pause(2000);
  },
  'users should be able to register one more business':
  (browser) => {
    browser
      .url('http://localhost:5600/register-business')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', businessDetails2.name)
      .click('select[name=location]')
      .waitForElementVisible('#LAGOS', 5000)
      .click('#LAGOS')
      .click('select[name=categoryId]')
      .waitForElementVisible('#sports', 5000)
      .click('#sports')
      .setValue('#upload-business', path.resolve('./client/public/images/business.png'))
      .setValue('textarea[name=details]', businessDetails2.details)
      .click('button.register-button')
      .waitForElementVisible('.toast-message', 10000)
      .click('button.toast-close-button')
      .pause(2000);
  },
  'users should be able to register another business':
  (browser) => {
    browser
      .url('http://localhost:5600/register-business')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', businessDetails3.name)
      .click('select[name=location]')
      .waitForElementVisible('#BORNO', 5000)
      .click('#BORNO')
      .click('select[name=categoryId]')
      .waitForElementVisible('#entertainment', 5000)
      .click('#entertainment')
      .setValue('#upload-business', path.resolve('./client/public/images/business.png'))
      .setValue('textarea[name=details]', businessDetails3.details)
      .click('button.register-button')
      .waitForElementVisible('.toast-message', 10000)
      .click('button.toast-close-button')
      .pause(2000);
  },
  'users should be able to search business by location':
  (browser) => {
    browser
      .url('http://localhost:5600/all-business')
      .waitForElementVisible('select[name=location]', 5000)
      .click('select[name=location]')
      .waitForElementVisible('#BORNO', 5000)
      .click('#BORNO')
      .pause(2000);
  },
  'users should be able to search business by category':
  (browser) => {
    browser
      .url('http://localhost:5600/all-business')
      .waitForElementVisible('select[name=category]', 5000)
      .click('select[name=category]')
      .waitForElementVisible('#entertainment', 5000)
      .click('#entertainment')
      .pause(2000);
  },
  'users should be able to search business by name':
  (browser) => {
    browser
      .url('http://localhost:5600/all-business')
      .waitForElementVisible('input[name=name]', 5000)
      .setValue('input[name=name]', businessDetails3.name)
      .pause(2000)
      .click('.reset-button')
      .pause(2000);
  },
  'users should be able to view business':
  (browser) => {
    browser
      .url('http://localhost:5600/all-business')
      .waitForElementVisible('.view-button', 5000)
      .click('.view-button')
      .waitForElementVisible('.business-image', 5000)
      .assert.containsText('#business-name', businessDetails3.name)
      .assert.containsText('#business-location', 'BORNO')
      .assert.containsText('#business-category', 'entertainment')
      .assert.containsText('#business-details', businessDetails3.details);
  },
  'users should be able to review business':
  (browser) => {
    browser
      .url('http://localhost:5600/view-business/2')
      .waitForElementVisible('textarea[name=comments]', 5000)
      .setValue('textarea[name=comments]', 'Nice Business')
      .waitForElementVisible('.5-stars', 5000)
      .setValue('.5-stars', 3)
      .pause(2000)
      .waitForElementVisible('.send-button', 5000)
      .click('.send-button')
      .pause(2000);
  },
  'users should be able to edit review':
  (browser) => {
    browser
      .url('http://localhost:5600/view-business/2')
      .waitForElementVisible('.edit-review', 5000)
      .click('.view-button')
      .waitForElementVisible('.editReview-textarea', 5000)
      .setValue('textarea[name=comments]', 'great Business')
      .waitForElementVisible('.edit-5stars', 5000)
      .setValue('.edit-5stars', 3)
      .pause(2000)
      .waitForElementVisible('.btn', 5000)
      .waitForElementVisible('.edit-button', 5000)
      .click('.edit-button')
      .pause(2000);
  },
  'users should be able to edit business':
  (browser) => {
    browser
      .url('http://localhost:5600/view-business/1')
      .waitForElementVisible('#edit-business', 5000)
      .click('#edit-business')
      .waitForElementVisible('input[name=name]', 5000)
      .setValue('input[name=name]', ' Limited')
      .pause(2000)
      .waitForElementVisible('#modal-button', 5000)
      .click('#modal-button')
      .pause(2000)
      .waitForElementVisible('.toast-message', 10000)
      .click('button.toast-close-button')
      .pause(2000);
  },
  'users should be able to delete business':
  (browser) => {
    browser
      .url('http://localhost:5600/view-business/1')
      .waitForElementVisible('#delete-business', 5000)
      .click('#delete-business')
      .waitForElementVisible('.swal-button--danger', 5000)
      .click('.swal-button--danger')
      .pause(2000)
      .waitForElementVisible('.swal-button--confirm', 10000)
      .click('.swal-button--confirm')
      .pause(2000);
  },
  "users should be able to edit profile": (browser) => {
    browser
      .url('http://localhost:5600/myprofile')
      .waitForElementVisible('button.btn-info', 5000)
      .click('button.btn-info')
      .waitForElementVisible('input[name=fullname]', 5000)
      .setValue('input[name=fullname]', ' Clint')
      .pause(2000)
      .waitForElementVisible('#modal-button', 5000)
      .click('#modal-button')
      .pause(2000)
      .waitForElementVisible('.toast-message', 4000)
      .click('button.toast-close-button')
      .pause(2000)
      .waitForElementVisible('#navbarDropdownMenuLink', 5000)
      .click('#navbarDropdownMenuLink')
      .click('#logout')
      .pause(2000)
      .end();
  },
};
