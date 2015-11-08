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

gulp.task('temp-clean-styles', function() {
  return del(config.tempfolder + '**/*.css');
});

gulp.task('styles-watcher', function() {
  gulp.watch([config.sass], gulp.series('styles'));
});

gulp.task('styles', gulp.series('temp-clean-styles', function() {

  return gulp
      .src(config.sass)
      .pipe($.plumber())
      .pipe($.sass())
      .pipe($.autoprefixer())
      .pipe($.rename({dirname: 'styles'}))
      .pipe(gulp.dest(config.tempfolder));
}));

gulp.task('temp-clean-images', function() {
  return del(config.tempfolder + 'images/**/*.*');
});

gulp.task('images', gulp.series('temp-clean-images', function() {

  return gulp.src(config.images)
      .pipe($.imagemin())
      .pipe(gulp.dest(config.tempfolder + 'images'));
}));

gulp.task('wiredep', gulp.series('images', 'styles', function() {
  var wiredep = require('wiredep').stream;

  return gulp.src(config.index)
      .pipe(wiredep(config.getWiredepOptions()))
      .pipe($.inject(gulp.src(config.injectjs)
      .pipe($.angularFilesort())))
      .pipe($.inject(gulp.src(config.injectcss)))
      .pipe(gulp.dest(config.clientfolder));
}));

gulp.task('test', function(done) {
  var KarmaServer = require('karma').Server;

  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('dev', gulp.series('wiredep', function() {

  startBrowserSync();

  return $.nodemon(getNodeOptions(/*isDev*/ true))
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
      .src(config.templates.html)
      .pipe($.eol())
      .pipe($.minifyHtml({empty: true}))
      .pipe($.angularTemplatecache(
          config.templates.cacheFileName,
          config.templates.cacheOptions
      ))
      .pipe(gulp.dest(config.tempfolder));
});

gulp.task('build', gulp.series('wiredep', 'build-clean', 'temp-templatecache', function() {
  var assets = $.useref.assets({searchPath: './'});

  var appJsFilter = $.filter('**/app.js', {restore: true});
  var libJsFilter = $.filter('**/lib.js', {restore: true});

  gulp.src(config.index)
      .pipe($.plumber())
      .pipe($.inject(
          gulp.src(config.templates.cacheFile, {read: false}),
          {starttag: config.templates.injectTag}
      ))
      .pipe($.eol())
      .pipe(assets)
      .pipe(libJsFilter)
      .pipe($.uglify())
      .pipe(libJsFilter.restore)
      .pipe(appJsFilter)
      .pipe($.ngAnnotate())
      .pipe($.uglify())
      .pipe(appJsFilter.restore)
      .pipe($.rev())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(gulp.dest(config.buildfolder));

  startBrowserSync();

  return $.nodemon(getNodeOptions(/*isDev*/ false))
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

function getNodeOptions(isDev) {

  var environment = !!isDev ? 'dev' : 'prod';

  return {
    script: config.serverjs,
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': environment
    }
  };
}
