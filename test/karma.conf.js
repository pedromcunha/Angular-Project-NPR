module.exports = function(config){
  config.set({

    basePath : '../public/',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'js/main.js',
      'js/templates.js',
      '../test/unit/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};