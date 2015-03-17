'use strict';

var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	jade = require('gulp-jade'),
	sourcemaps = require('gulp-sourcemaps'),
	livereload = require('gulp-livereload'),
	plumber = require('gulp-plumber'),
	gutil = require('gulp-util');

var watching = false;

function exitIfNotWatching(error) {
	if (watching) {
		gutil.log(error.message);
	}
	else {
		throw error;
	}
}

gulp.task('styles', function() {
	gulp.src('./app/styl/app.styl')
		.pipe(plumber(exitIfNotWatching))
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
		.pipe(plumber(exitIfNotWatching))
		.pipe(jade())
		.pipe(gulp.dest('./out/'))
		.pipe(livereload());
});

gulp.task('watch', function() {
	watching = true;
	gulp.start('default');
	livereload.listen();
	gulp.watch('./app/styl/*', ['styles']);
	gulp.watch('./app/templates/*', ['templates'])
});

gulp.task('default', ['styles', 'templates']);
