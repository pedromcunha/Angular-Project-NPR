'use strict';

describe('Video Listing Controller', function() {
  var ptor;
  var searchBar;
  var searchIcon;
  var listings;
  var errorMessage;
  var actionGenre;

  beforeEach(function(){
      browser.get('http://localhost:1337/#/'); //navigates to the root state

      ptor = protractor.getInstance(); //gets the instance of protractor

      ptor.waitForAngular(); //waits for angular to bootstrap

      searchBar = element(by.css('[ng-enter="vm.searchYoutube(vm.searchText, 3)"]'));
      searchIcon = element(by.css('[ng-click="vm.searchYoutube(vm.searchText, 3)"]'));

      listings = element(by.css('[ng-repeat="video in vm.trailers.videos"]'));
      errorMessage = element(by.css('.no-vids-error'));

      actionGenre = element(by.repeater('genre in vm.genres').row(0));

      ptor.waitForAngular();

  });


  it('Should search for the top three trailers when the search field is submitted', function() {

    expect(browser.getLocationAbsUrl()).toMatch('/');

    expect(listings.isPresent()).toBe(false);

    searchBar.sendKeys('Thor', protractor.Key.ENTER);

    expect(listings.isPresent()).toBe(true);
  });

  it('Should show an error message if there are no videos found matching the search query', function() {

    expect(browser.getLocationAbsUrl()).toMatch('/');

    expect(errorMessage.isPresent()).toBe(false);

    searchBar.sendKeys('fsfsdfsdfsfdfsfsfsfdfsfsfsfsfsfsfsfsfdfs', protractor.Key.ENTER);

    expect(listings.isPresent()).toBe(false);

    expect(errorMessage.isPresent()).toBe(true);

  });

  it('Should search for the top 21 youtube trailers matching a genre query', function() {

    expect(browser.getLocationAbsUrl()).toMatch('/');

    expect(listings.isPresent()).toBe(false);

    actionGenre.click();

    expect(listings.isPresent()).toBe(true);

  });

  it('Should only have the ratings selection if the user is logged in', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/');

    searchBar.sendKeys('Thor', protractor.Key.ENTER);

    var ratingIcons = element(by.css('.ratingQueryLarge'));

    expect(ratingIcons.isPresent()).toBe(false);

    var openLoginModalButton = element(by.css('[ng-click="vm.openLogin()"]'));

    openLoginModalButton.click();

    var usernameField = element(by.model('modal.username'));
    var passwordField = element(by.model('modal.password'));
    var loginButton = element(by.css('[ng-click="modal.login()"]'));

    usernameField.sendKeys('someusername');
    passwordField.sendKeys('somepassword');

    loginButton.click();

    expect(ratingIcons.isPresent()).toBe(true);
  });
});