'use strict';

var gulp = require('gulp');
var config = require('./gulpconfig.js')();
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});
var gulpif = require('gulp-if');
var gulpprint = require('gulp-print');
var args = require('yargs').argv;
var port = process.env.PORT || config.defaultPort;

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
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(config.getWiredepOptions()))
        //.pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('dev', gulp.series('wiredep', function() {
    var nodeOptions = {
        script: 'src/server/app.js',
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': 'dev'
        }
    };

    startBrowserSync();

    return nodemon(nodeOptions)
        .on('restart', function() {
            setTimeout(function() {
                browserSync.notify('reloading');
                browserSync.reload({stream: false});
            }, 1000);
        });
}));

function startBrowserSync() {
    if (browserSync.active) { return; }

    browserSync(config.getBrowserSyncOptions());
}

