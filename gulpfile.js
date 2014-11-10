var gulp = require('gulp');
var inliner = require('gulp-inline-css');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Static server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('sass', function() {
	return gulp.src('sass/main.scss')
			.pipe(sass())
			.on('error', function (err) {
				console.log(err.message);
			})
			.pipe(gulp.dest('css'));
});

gulp.task('inline', function() {
	return gulp.src('*.html')
				.pipe(
					inliner({
						'extraCSS' : 'css/main.css'
					})
				)
				.pipe(gulp.dest('build/'))
				.pipe(reload({stream:true}));
});

gulp.task('watcher', function() {
	gulp.watch('*.html', ['inline']);
	gulp.watch('sass/main.scss', ['sass']);
	gulp.watch('css/main.css', ['inline']);
});

gulp.task('default', ['sass', 'inline', 'watcher', 'browser-sync']);

