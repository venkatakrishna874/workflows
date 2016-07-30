var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat');
var coffeeSources = ['Compounents/coffee/tagline.coffee'];
var jsSource = ['Compounents/scripts/*.js'];
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
		.pipe(gulp.dest('Builds/Development/JS'));

});
