var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat');

var coffeeSources = ['Compounents/coffee/tagline.coffee'];
var jsSource = ['Compounents/scripts/*.js'];
var sassSources = ['Compounents/sass/style.scss'];
gulp.task('log', function () {
	gutil.log('Welcome gulp');
});
gulp.task('coffee', function () {
	gulp.src(coffeeSources)
		.pipe(coffee({
				bare: true
			})
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
});
gulp.task('js', function () {
	gulp.src(jsSource)
		.pipe(concat('scrip.js'))
		.pipe(browserify())
		.pipe(gulp.dest('Builds/Development/JS'));

});
gulp.task('compass', function () {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'Compounents/sass',
			image: 'Builds/Development/images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('Builds/Development/CSS'));
});
gulp.task('default',['coffee','js','compass']);
