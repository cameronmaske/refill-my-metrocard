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
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var s3 = require('gulp-s3');
var gzip = require('gulp-gzip');
var fs = require('fs');
var del = require('del');


var production = gutil.env.env === "production";
var config = {
	dist: production ? 'deploy' : 'dist',
	production: production
};

// Deploy
gulp.task('deploy', function() {
	var aws = JSON.parse(fs.readFileSync('./aws.json'));
	var options = { headers: {'Cache-Control': 'max-age=604800, no-transform, public'} }
	gulp.src('./deploy/**')
    	.pipe(gzip())
		.pipe(s3(aws, options));
})


// Webserver
gulp.task('serve', function() {
	gulp.src(config.dist)
		.pipe(webserver({
			livereload : true,
			host : '0.0.0.0'
		}));
});

// HTML
gulp.task('html', function() {
	gulp.src('app/*.html')
		.pipe(config.production ? minifyHTML() : gutil.noop())
		.pipe(gulp.dest(config.dist));
});


// Styles
gulp.task('styles', function() {
	gulp.src('app/styles/main.scss')
		.pipe(config.production ? gutil.noop() : sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(config.production ? minifyCss() : gutil.noop())
		.pipe(config.production ? gutil.noop() : sourcemaps.write())
		.pipe(gulp.dest(config.dist + '/styles'));
});

var watch = true;

gulp.task('scripts-no-watch', function() {
	del(config.dist)
	var bundler = browserify('./app/scripts/app.js', {debug: config.production})

	bundler.transform(babelify.configure({stage: 0}))

	return bundler.bundle()
		.on('error', function(err) {
			console.error(err.message);
		})
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(config.production ? uglify() : gutil.noop())
		.pipe(gulp.dest(config.dist + '/scripts'));
});

// Scripts
gulp.task('scripts', function() {
	var bundler = watchify(browserify(
		'./app/scripts/app.js', {debug: config.production})
		.transform(babelify.configure({
			stage: 0
		})));

	if (watch) {
		bundler.on('update', function() {
			console.log('rebundling...');
			rebundle();
		});

		bundler.on('log', console.log);
	}

	function rebundle() {
		bundler.bundle()
			.on('error', function(err) {
				console.error(err.message);
			})
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(config.production ? sourcemaps.init({loadMaps: true}) : gutil.noop())
			.pipe(config.production ? sourcemaps.write('./') : gutil.noop())
			.pipe(gulp.dest(config.dist + '/scripts'));
	}

	return rebundle();
});


// Bundle
gulp.task('bundle', ['styles', 'scripts-no-watch'], function(){
	watch = false;
	gulp.src('./app/*.html')
		.pipe(gulp.dest(config.dist));
});

// Watch
gulp.task('watch', ['html', 'serve', 'styles', 'scripts'], function () {

	// Watch .scss files
	gulp.watch('app/styles/**/*.scss', ['styles']);

	// Watch .html files
	gulp.watch('app/*.html', ['html']);

	// Watch image files
	gulp.watch('app/images/**/*', ['images']);
});