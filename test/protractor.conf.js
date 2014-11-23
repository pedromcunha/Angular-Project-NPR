exports.config = {
    specs: ['e2e/*.js'],

    suites: {
        homepage: 'e2e/homePage.spec.js',
        registration: 'e2e/registrationController.spec.js'
    }
};