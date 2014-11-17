module.exports = {
    add_banner: {
        options: {
            banner: '/* Trailer Parke <%= grunt.template.today("dd-mm-yyyy") %>  */\n'
        },
        files: {
            'public/styles/css/main.min.css': ['public/styles/css/main.css']
        }
    }
};