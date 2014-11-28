module.exports = function (grunt) {
	//load all plugins
	require('load-grunt-config')(grunt, {
		init: true,
		loadGruntTasks: {
            config: require('./package.json'),
            scope: 'dependencies'
        }
	});

	// Composite tasks
	grunt.registerTask('dist', ['concat', 'replace:dist', 'uglify', 'cssmin', 'compass']);

	grunt.registerTask('dev', ['concat', 'replace:dev', 'uglify', 'cssmin', 'compass']);

};