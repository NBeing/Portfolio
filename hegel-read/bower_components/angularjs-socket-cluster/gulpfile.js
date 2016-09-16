/**
 * Script to handle all of the generic build tasks for the talkfusion-socket
 *  package such as linting, coffeescript conversion, etc.
 */

// BUILD Dependencies
// ------------------------------------------------------------------

var gulp       = require('gulp');
var plumber    = require('gulp-plumber');
var coffee     = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var clean      = require('gulp-clean');
var rename     = require('gulp-rename');
var header     = require('gulp-header');
var wrap       = require('gulp-wrap');
var pkg        = require('./package.json');

// BUILD Banner
// ------------------------------------------------------------------
var banner = [
  '/**',
  ' * <%= pkg.description %>',
  ' * @author <%= pkg.author %>',
  ' * @version v<%= pkg.version %>',
  ' * @see <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

// GENERAL Tasks
// ------------------------------------------------------------------

gulp.task('clean', function() {
  gulp
    .src(['./release/**/*.js'], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('lint', function() {
  gulp
    .src('./src/**/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter());
});

gulp.task('build-standalone', function() {
   gulp
    .src(['./src/**/*.coffee'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(coffee({
      bare: true
    }))
    .pipe(wrap("(function() { 'use strict'; <%= contents %> })();"))
    .pipe(header(banner, { pkg : pkg }))
    .pipe(concat('socket.standalone.js'))
    .pipe(gulp.dest('./release'));
});

gulp.task('build-package', function() {
   gulp
    .src([
      './bower_components/socketcluster-client/socketcluster.js',
      './release/socket.standalone.js'
    ])
    .pipe(concat('socket.js'))
    .pipe(gulp.dest('./release'));
});

gulp.task('uglify-standalone', function() {
  gulp
    .src('./release/socket.standalone.js')
    .pipe(uglify())
    .pipe(header(banner, { pkg : pkg }))
    .pipe(rename("socket.standalone.min.js"))
    .pipe(gulp.dest('./release'));
});

gulp.task('uglify-package', function() {
  gulp
    .src('./release/socket.js')
    .pipe(uglify())
    .pipe(rename("socket.min.js"))
    .pipe(gulp.dest('./release'));
});

// DEFAULT Task
// ------------------------------------------------------------------

// for some reason this task fails most of the time, and doesn't fully run the
//  rest of the time... just run this instead:
//  gulp clean && gulp lint && gulp build-standalone && gulp build-package && gulp uglify-standalone && gulp uglify-package
gulp.task('default', [
  'clean',
  'lint',
  'build-standalone',
  'build-package',
  'uglify-standalone',
  'uglify-package'
]);

// WATCH Task
// ------------------------------------------------------------------

gulp.task('watch', function() {
  // Watch and build the coffee script & sass files
  gulp.watch('./src', ['build']);
});
