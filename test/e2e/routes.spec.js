describe('Routes', function() {
  it('Should be on the root state', function() {
    browser.get('http://localhost:1337/#/'); //navigates to the root state

    var ptor = protractor.getInstance(); //gets the instance of protractor

    ptor.waitForAngular(); //waits for angular to bootstrap

    expect(browser.getLocationAbsUrl()).toMatch('/');
  });
  it('Should route to the rated trailers state', function() {
      browser.get('http://localhost:1337/#/rated-trailers');
      expect(browser.getLocationAbsUrl()).toMatch('/rated-trailers');
  });
  it('Should get routed back to the root state when an undefined route is navigated to', function() {
    browser.get('http://localhost:1337/#/notarealroute'); //navigates to the root state

    var ptor = protractor.getInstance(); //gets the instance of protractor

    ptor.waitForAngular(); //waits for angular to bootstrap

    expect(browser.getLocationAbsUrl()).not.toMatch('/notarealroute');
    expect(browser.getLocationAbsUrl()).toMatch('/');
  });
});