'use strict';

describe('Registration Form Modal', function() {
  var ptor;
  var usernameField;
  var passwordField;


  beforeEach(function(){
      browser.get('http://localhost:1337/#/'); //navigates to the root state

      ptor = protractor.getInstance(); //gets the instance of protractor

      ptor.waitForAngular(); //waits for angular to bootstrap

      element(by.css('[ng-click="vm.openRegistration()"]')).click();
      ptor.waitForAngular();

      usernameField = element(by.model('modal.username'));
      passwordField = element(by.model('modal.password'));

  });


  it('Should be invalid if the username and password are not entered', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/');

    expect(usernameField.getAttribute('class')).toMatch('ng-invalid');
    expect(passwordField.getAttribute('class')).toMatch('ng-invalid');

  });

  it('Should be valid if a username and password are entered', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/');
  
    usernameField.sendKeys("someusername");

    passwordField.sendKeys("somepassword");


    expect(usernameField.getAttribute('class')).toMatch('ng-valid-required');
    expect(passwordField.getAttribute('class')).toMatch('ng-valid-required');
  });
});