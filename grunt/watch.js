module.exports = {
    javascript: {
        files: ['public/js/app.js',
            'public/js/controllers/*.js',
            'public/js/directives/*.js',
            'public/js/factories/*.js',
            'public/js/filters/*.js'
        ],
        tasks: ['concat', 'uglify']
    },
    styles: {
        files: ['public/styles/scss/*.scss'],
        tasks: ['compass', 'cssmin']
    },
    html: {
        files: ['public/templates/*.html'],
        tasks: ['html2js']
    }
};