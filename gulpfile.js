'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./gulpconfig.js')();

var browserSync = require('browser-sync');
var KarmaServer = require('karma').Server;
var args = require('yargs').argv;
var port = process.env.PORT || config.defaultPort;

gulp.task('vet', function() {

    return gulp
        .src(config.vetjs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jscsStylish.combineWithHintResults())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('wiredep', function() {
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(config.getWiredepOptions()))
        .pipe($.inject(gulp.src(config.injectjs)))
        .pipe(gulp.dest(config.client));
});

gulp.task('test', function(done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
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

    return $.nodemon(nodeOptions)
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

