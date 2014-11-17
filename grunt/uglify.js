module.exports = {
	js: {
	    files: {
	            'public/js/main.min.js': ['public/js/main.js']
	    },
	    options: {
	        // the banner is inserted at the top of the output
	        banner: '/*Trailer Parke <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	    }
	}
};
