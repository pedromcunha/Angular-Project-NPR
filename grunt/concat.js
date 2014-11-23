module.exports = {
    options: {
        separator: ';',
    },
    dist: {
        src: [
            ['public/js/app.js',
                'public/js/controllers/headerController.js',
                'public/js/controllers/*.js',
                'public/js/directives/*.js',
                'public/js/factories/*.js',
                'public/js/filters/*.js'
            ],
        ],
        dest: 'public/js/main.js'
    },
};