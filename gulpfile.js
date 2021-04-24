const gulp = require('gulp');
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const webpackconfig = require('./webpack.config.js');
const webpack = require('webpack');
const webpackstream = require('webpack-stream');

/**
 * compiles the sass files
 */
gulp.task('compile-less', function() {
    return gulp.src('Styles/theme.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('Styles/'));
});

gulp.task('compile-bootstrap', function() {
    return gulp.src('Styles/bootstrap.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('Styles/'));
});

gulp.task('compile-js', function() {
    return gulp.src(['./Scripts/**/*.js'])
        .pipe(plumber())
        .pipe(webpackstream(webpackconfig, webpack))
        .pipe(gulp.dest('./Assets/Scripts/'));
})