var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


var config = {
	dist: 'dist',
    production: false
};


// Webserver
gulp.task('serve', function() {
	gulp.src('dist')
		.pipe(webserver({
			livereload : true,
			host : '0.0.0.0'
		}));
});

// HTML
gulp.task('html', function() {
	gulp.src('app/*.html')
		.pipe(gulp.dest(config.dist));
});


// Styles
gulp.task('styles', function() {
	gulp.src('app/styles/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('errror', function(err) {
			console.error(error);
			this.emit('end');
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function() {
	var bundler = watchify(browserify(
		'./app/scripts/app.js', {debug: true})
		.transform(babelify.configure({
			stage: 0
		})));

	bundler.on('update', function() {
		console.log('rebundling...');
		rebundle();
	});

	bundler.on('log', console.log);

	function rebundle() {
		bundler.bundle()
			.on('error', function(err) {
				console.error(err.message);
			})
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('dist/scripts'));
	}

	return rebundle();
});


// Bundle
gulp.task('bundle', ['styles', 'scripts'], function(){
	gulp.src('./app/*.html')
		.pipe(gulp.dest(config.dist));
});

// Watch
gulp.task('watch', ['html', 'serve', 'bundle'], function () {

    // Watch .scss files
	gulp.watch('app/styles/**/*.scss', ['styles']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});