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

gulp.task('wiredep', function() {
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(config.getWiredepOptions()))
        .pipe($.inject(gulp.src(config.injectjs)
        .pipe($.angularFilesort())))
        .pipe(gulp.dest(config.clientfolder));
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

gulp.task('temp-clean', function() {
    return del(config.tempfolder + '*');
});

gulp.task('build-clean', function() {
    return del(config.buildfolder + '*');
});

gulp.task('temp-templatecache', function() {
    return gulp
        .src(config.htmltemplates)
        .pipe($.eol())
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.tempfolder));
});

gulp.task('build', gulp.series('wiredep', 'build-clean', 'temp-templatecache', function() {

    var templateFile = config.tempfolder + 'templates.js';
    var templateTag = '<!-- inject:templates:js -->';

    var assets = $.useref.assets({searchPath: './'});

    //var jsFilter = $.filter('**/*.js', {restore: true});

    gulp.src(config.index)
        .pipe($.plumber())
        .pipe($.inject(
            gulp.src(templateFile, {read: false}), {starttag: templateTag}))
        .pipe($.eol())
        .pipe(assets)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.buildfolder));

    var nodeOptions = {
        script: config.serverjs,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': 'prod'
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

///

function startBrowserSync() {
    if (browserSync.active) {
        return;
    }

    browserSync(config.getBrowserSyncOptions());
}
