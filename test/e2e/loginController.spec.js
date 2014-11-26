'use strict';

describe('Registration Form Modal', function() {
  var ptor;
  var usernameField;
  var passwordField;
  var loginButton;
  var logoutButton;

  beforeEach(function(){
    browser.get('http://localhost:1337/#/'); //navigates to the root state

    ptor = protractor.getInstance(); //gets the instance of protractor

    ptor.waitForAngular(); //waits for angular to bootstrap

  });

  it('Should be invalid if the username and password are not entered', function() {
      expect(browser.getLocationAbsUrl()).toMatch('/');

      element(by.css('[ng-click="vm.openLogin()"]')).click();

      usernameField = element(by.model('modal.username'));
      passwordField = element(by.model('modal.password'));

      expect(usernameField.getAttribute('class')).toMatch('ng-invalid');
      expect(passwordField.getAttribute('class')).toMatch('ng-invalid');
  });

  it('Should log the user in if password and username are correct', function() {
      expect(browser.getLocationAbsUrl()).toMatch('/');

      element(by.css('[ng-click="vm.openLogin()"]')).click();

      usernameField = element(by.model('modal.username'));
      passwordField = element(by.model('modal.password'));
      loginButton = element(by.css('[ng-click="modal.login()"]'));


      usernameField.sendKeys('someusername');
      passwordField.sendKeys('somepassword');

      var loginModal = element(by.className('modal'));

      expect(loginModal.isDisplayed()).toBeTruthy();

      loginButton.click();

      expect(loginModal.isPresent()).toBeFalsy();
  });

  it('Should log the user out once they are logged in', function() {
      var loginButton = element(by.css('[ng-click="vm.openLogin()"]'));
      var logoutButton =  element(by.css('[ng-click="vm.logOut()"]'));

      expect(loginButton.isPresent()).toBeFalsy();
      logoutButton.click();

      expect(loginButton.isPresent()).toBeTruthy();
      expect(logoutButton.isPresent()).toBeFalsy();
  });

});
