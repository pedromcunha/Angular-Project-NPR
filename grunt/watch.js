module.exports = {
    javascript: {
        files: ['public/js/**/*.js', 'public/js/app.js'],
        tasks: ['concat', 'uglify']
    },
    styles: {
    	files: ['public/styles/scss/*.scss'],
        tasks: ['compass', 'cssmin']
    }
};