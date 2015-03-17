'use strict';

var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	jade = require('gulp-jade'),
	sourcemaps = require('gulp-sourcemaps'),
	livereload = require('gulp-livereload');

gulp.task('styles', function() {
	gulp.src('./app/styl/app.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus({
			compress: true
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./out/static/'))
		.pipe(livereload());
});

gulp.task('templates', function() {
	gulp.src('./app/templates/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./out/'))
		.pipe(livereload());
});

gulp.task('watch', function() {
	gulp.start('default');
	livereload.listen();
	gulp.watch('./app/styl/*', ['styles']);
	gulp.watch('./app/templates/*', ['templates'])
});

gulp.task('default', ['styles', 'templates']);
