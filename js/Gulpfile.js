var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	sourcemaps = require('gulp-sourcemaps');


//This task is for the javascript compiler for production use (minify and uglify)
gulp.task('js', function(){
	gulp.src(['app.js', 'controllers/*.js', 'directives/*.js', 'factories/*.js', 'filters/*.js'])//source of the javascript, you can use [...] for more sources
		.pipe(concat('main.js'))//the output js file
		.pipe(sourcemaps.init())
			.pipe(ngAnnotate())
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('../js'));
});

//This task is for the javascript compiler for dev debugging (only concats)
gulp.task('js_dev', function(){
	gulp.src(['app.js', 'controllers/*.js', 'directives/*.js', 'factories/*.js', 'filters/*.js'])//source of the javascript, you can use [...] for more sources
		.pipe(concat('main.js'))//the output js file
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('../js'));
});
