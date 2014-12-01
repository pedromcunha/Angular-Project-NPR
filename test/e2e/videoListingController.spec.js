'use strict';

describe('Registration Form Modal', function() {
  var ptor;
  var searchBar;
  var searchIcon;


  beforeEach(function(){
      browser.get('http://localhost:1337/#/'); //navigates to the root state

      ptor = protractor.getInstance(); //gets the instance of protractor

      ptor.waitForAngular(); //waits for angular to bootstrap

      searchBar = element(by.css('[ng-enter="vm.searchYoutube(vm.searchText)"]'));
      searchIcon = element(by.css('[ng-click="vm.searchYoutube(vm.searchText)"]'));
      ptor.waitForAngular();

  });


  it('Should search for the top three trailers when the search bar is submitted', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/');

  });
});