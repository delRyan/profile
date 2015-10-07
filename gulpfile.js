var gulp = require('gulp');
var config = require('./gulpconfig.js')();
var nodemon = require('gulp-nodemon');
var $ = require('gulp-load-plugins');

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
