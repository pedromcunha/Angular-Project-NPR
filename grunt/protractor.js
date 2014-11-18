module.exports = {
    options: {
        configFile: "test/protractor.conf.js", // Default config file
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false // If true, protractor will not use colors in its output.
    },
    all: {
        options: {
            specs: ['test/e2e/homePage.spec.js'] // Target-specific arguments
        }
    }
};