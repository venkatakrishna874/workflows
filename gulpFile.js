var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	minifyHTML = require('gulp-minify-html'),
	concat = require('gulp-concat');

var coffeeSources,
	jsSource,
	htmlSources,
	jsonSource,
	sassSources,
	outputDir,
	styleSource;

var env = process.env.NODE_ENV || 'Development';
if (env === 'Development') {
	outputDir = 'Builds/Development/';
	styleSource = 'expnaded';
} else {
	outputDir = 'Builds/production/';
	styleSource = 'compressed';

}

coffeeSources = ['Compounents/coffee/tagline.coffee'];
jsSource = ['Compounents/scripts/*.js'];
sassSources = ['Compounents/sass/style.scss'];

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
		.pipe(concat('script.js'))
		.pipe(browserify())
	.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'JS'))
		.pipe(connect.reload());

});
gulp.task('compass', function () {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'Compounents/sass',
			image: outputDir + 'images',
			style: 'compressed'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest(outputDir + 'CSS'))
		.pipe(connect.reload());
});
gulp.task('watch', function () {
	gulp.watch('Compounents/**/*', ['coffee', 'js', 'compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSource, ['json']);
});
gulp.task('connect', function () {
	connect.server({
		root: outputDir,
		livereload: true
	});
});
htmlSources = [outputDir + '*.html']
gulp.task('html', function () {
	gulp.src('Builds/Development/*.html')
	.pipe(gulpif(env === 'production', minifyHTML()))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload());
});
jsonSource = [outputDir + 'JS/*.json'];
gulp.task('json', function () {
	gulp.src(jsonSource)
		.pipe(connect.reload());
});
gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);
