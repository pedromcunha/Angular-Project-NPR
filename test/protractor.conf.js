exports.config = {
    specs: ['e2e/*.js'],

    suites: {
        homepage: 'e2e/homePage.spec.js',
        registration: 'e2e/registrationController.spec.js',
        login: 'e2e/loginController.spec.js',
        videoQuery: 'e2e/videoListingController.spec.js'
    }
};