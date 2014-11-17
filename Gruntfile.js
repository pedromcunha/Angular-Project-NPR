module.exports = function (grunt) {
	//load all plugins
	require('load-grunt-config')(grunt, {
		init: true,
		loadGruntTasks: {
            config: require('./package.json'),
            scope: 'devDependencies'
        }
	});

	// Composite tasks
	grunt.registerTask('dist', ['concat', 'uglify']);
};