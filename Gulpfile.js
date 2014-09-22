var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	sourcemaps = require('gulp-sourcemaps');


//This task is for the javascript compiler for production use (minify and uglify)
gulp.task('js', function(){
	gulp.src(['edvisor/angular/app.js', 'edvisor/angular/controllers/*.js', 'edvisor/angular/directives/*.js', 'edvisor/angular/factories/*.js', 'edvisor/angular/filters/*.js'])//source of the javascript, you can use [...] for more sources
		.pipe(concat('main.js'))//the output js file
		.pipe(sourcemaps.init())
			.pipe(ngAnnotate())
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('edvisor/angular'));
});

//This task is for the javascript compiler for dev debugging (only concats)
gulp.task('js_dev', function(){
	gulp.src(['edvisor/angular/app.js', 'edvisor/angular/controllers/*.js', 'edvisor/angular/directives/*.js', 'edvisor/angular/factories/*.js', 'edvisor/angular/filters/*.js'])//source of the javascript, you can use [...] for more sources
		.pipe(concat('main.js'))//the output js file
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('edvisor/angular'));
});
