var gulp = require('gulp');
var inliner = require('gulp-inline-css');

gulp.task('inline', function() {
	return gulp.src('*.html')
				.pipe(
					inliner({
						'extraCSS' : 'css/main.css'
					})
				)
				.pipe(gulp.dest('build/'));
});

gulp.task('watcher', function() {
	gulp.watch('*.html', ['inline']);
	gulp.watch('css/main.css', ['inline']);
});

gulp.task('default', ['inline', 'watcher']);

