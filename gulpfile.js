'use strict';

let gulp = require('gulp');
let path = require('path');
let $ = require('gulp-load-plugins')();
let del = require('del');
let runSequence = require('run-sequence');

let environment = $.util.env.type || 'development';
let isProduction = environment === 'production';
let webpackConfig = require('./webpack.config.js')[environment];

let deploy = require('./deploy');

let port = $.util.env.port || 8080;
let src = 'src/';
let dist = 'dist/';

let autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10',
];
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

gulp.task('scripts', function () {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title: 'js' }))
    .pipe($.connect.reload());
});

gulp.task('html', function () {
  return gulp.src(src + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title: 'html' }))
    .pipe($.connect.reload());
});

gulp.task('styles', function () {
  return gulp.src(src + 'less/**/*.less')
    .pipe($.less())
    .pipe($.concat('main.css'))
    .pipe(isProduction ? $.cleanCss() : $.util.noop())
    .pipe(gulp.dest(dist + 'css'))
    .pipe($.size({ title: 'styles' }))
    .pipe($.connect.reload());
});

gulp.task('serve', function () {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35728,
    },
  });
});

// gulp.task('static', function (cb) {
//   return gulp.src(src + 'static/**/*')
//     .pipe($.size({ title : 'static' }))
//     .pipe(gulp.dest(dist + '/'));
// });

gulp.task('watch', function () {
  gulp.watch(src + 'less/*.less', ['styles']);
  gulp.watch(src + 'index.html', ['html']);
  gulp.watch(src + 'app/**/*.js', ['scripts']);
  gulp.watch(src + 'app/**/*.hbs', ['scripts']);
  gulp.watch(src + 'app/**/*.handlebars', ['scripts']);
});

gulp.task('clean', function () {
  return del([dist]);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', function () {
  return runSequence('build', ['serve', 'watch']);
});

// waits until clean is finished then builds the project
gulp.task('build', function () {
  return runSequence('clean', ['html', 'scripts', 'styles']);
});

// todo: actually make synchronous, runsequence makes sub modules throw errors here
gulp.task('deploy', ['build'], function () {
  let deployEnvironment = 'prod';
  setTimeout(function () { deploy(deployEnvironment); }, 15000);
});

// gulp.task('deploy', ['build'], function () {
//   return $.prompt.prompt({
//     message: 'Enter deploy environment: dev or prod',
//     default: 'dev',
//   }, function (deployEnvironment) {
//     setTimeout(function () { deploy(deployEnvironment); }, 10000);
//   });
// });
