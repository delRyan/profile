'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./gulpconfig.js')();

var browserSync = require('browser-sync');
var args = require('yargs').argv;
var del = require('del');
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

gulp.task('clean-build', function() {
    return del(config.buildfolder + '*');
});

gulp.task('wiredep', function() {
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(config.getWiredepOptions()))
        .pipe($.inject(gulp.src(config.injectjs)
        .pipe($.angularFilesort())))
        .pipe(gulp.dest(config.client));
});

gulp.task('test', function(done) {
    var KarmaServer = require('karma').Server;

    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('dev', gulp.series('wiredep', function() {
    var nodeOptions = {
        script: config.serverjs,
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

gulp.task('build', gulp.series('wiredep', 'clean-build', function() {

    var jsFilter = $.filter('**/*.js', {restore: true});

    return gulp.src([].concat(config.index, config.injectjs))
        .pipe($.plumber())
        .pipe($.rename({dirname: ''}))
        .pipe(jsFilter)
        .pipe($.concat('all.js'))
        .pipe($.uglify())
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(config.buildfolder));
}));

///

function startBrowserSync() {
    if (browserSync.active) {
        return;
    }

    browserSync(config.getBrowserSyncOptions());
}
