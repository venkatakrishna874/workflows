var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee');
var coffeeSource = ['Compounents/coffee/*.coffee'];
gulp.task('log', function() {
	gutil.log('Welcome gulp');
});
gulp.task('coffee', function() {
	gulp.src(coffeeSource)
	.pipe(coffee({bare:true})
		 .on('error', gutil.log)
		  .pipe(gulp.dest('Compounents/scripts'))
		 );
});