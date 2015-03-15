'use strict';

var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	jade = require('gulp-jade'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	batch = require('gulp-batch');

gulp.task('styles', function() {
	gulp.src('./app/styl/app.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus({
			compress: true
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./out/'));
});

gulp.task('templates', function() {
	gulp.src('./app/templates/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./out/'));
});

gulp.task('watch', function() {
	gulp.start('default');

	watch('./app/styl/*', batch(function() {
		gulp.start('styles');
	}));

	watch('./app/templates/*', batch(function() {
		gulp.start('templates');
	}));
});

gulp.task('default', ['styles', 'templates']);
