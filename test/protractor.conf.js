exports.config = {
    specs: ['e2e/*.js'],

    suites: {
        routes: 'e2e/routes.spec.js',
        registration: 'e2e/registrationController.spec.js',
        login: 'e2e/loginController.spec.js',
        videoQuery: 'e2e/videoListingController.spec.js',
        header: 'e2e/headerController.spec.js'
    },

    onPrepare: function () {
	  require('protractor-linkuisref-locator')(protractor);
	}
};