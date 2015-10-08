'use strict';

var gulp = require('gulp');
var config = require('./gulpconfig.js')();
var nodemon = require('gulp-nodemon');
var $ = require('gulp-load-plugins')({lazy: true});
var gulpif = require('gulp-if');
var gulpprint = require('gulp-print');
var args = require('yargs').argv;

gulp.task('vet', function() {

    return gulp
        .src(['./src/**/*.js', './*.js'])
        .pipe(gulpif(args.verbose, gulpprint()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('wiredep', function() {
    var options = config.getWiredepOptions;
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        //.pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('dev', gulp.series('wiredep', function() {
    var nodeOptions = {
        script: 'src/server/app.js',
        delayTime: 1,
        env: {
            'PORT': 7203,
            'NODE_ENV': 'dev'
        }
    };

    return nodemon(nodeOptions);
}));
