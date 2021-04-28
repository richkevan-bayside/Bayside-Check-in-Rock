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

gulp.task('compile-bootstrap', function() {
    return gulp.src('Styles/bootstrap.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('Styles/'));
});

function compileLess() {
    return gulp.src('Styles/theme.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('Styles/'));
}

function complieJs() {
    return gulp.src(['./Scripts/**/*.js'])
        .pipe(plumber())
        .pipe(webpackstream(webpackconfig, webpack))
        .pipe(gulp.dest('./Assets/Scripts/'));
}

function watch() {
    gulp.watch('./Styles/**/*.less', compileLess);
    gulp.watch('./Scripts/**/*.js', complieJs);
}

const build = gulp.series([compileLess, complieJs]);

module.exports = {
    watch: watch,
    build: build
}