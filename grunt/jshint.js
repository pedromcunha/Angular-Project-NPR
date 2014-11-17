module.exports = {
    // define the files to lint
    src: ['public/js/controllers/*.js',
        'public/js/directives/*.js',
        'public/js/factories/*.js',
        'public/js/filters/*.js'
    ],
    // configure JSHint (documented at http://www.jshint.com/docs/)
    options: {
        // more options here if you want to override JSHint defaults
        globals: {
            jQuery: true,
            console: true,
            module: true
        }
    }
};