'use strict';

describe('Registration Form Modal', function() {
  var ptor;
  var searchBar;
  var searchIcon;
  var listings;
  var errorMessage;

  beforeEach(function(){
      browser.get('http://localhost:1337/#/'); //navigates to the root state

      ptor = protractor.getInstance(); //gets the instance of protractor

      ptor.waitForAngular(); //waits for angular to bootstrap

      searchBar = element(by.css('[ng-enter="vm.searchYoutube(vm.searchText)"]'));
      searchIcon = element(by.css('[ng-click="vm.searchYoutube(vm.searchText)"]'));

      listings = element(by.css('[ng-repeat="video in vm.trailers.videos"]'));
      errorMessage = element(by.css('.no-vids-error'));

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
});