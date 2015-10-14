'use strict';

module.exports = function() {
    var client = './src/client/';

    var config = {
        //Files
        client: client,
        index: client + 'index.html',

        vetjs: ['./src/**/*.js',
                './*.js',
                '!./karma.conf.js'],
        injectjs: client + 'app/**/*.js',

        defaultPort: 7203
    };

    //Wiredep Options
    config.getWiredepOptions = function() {
        var options = {
            bowerJson: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        };
        return options;
    };

    //BrowserSync Options
    config.getBrowserSyncOptions = function() {
        var options = {
            proxy: 'localhost:' + config.defaultPort,
            port: 3000,
            files: [config.client + '**/*.*'],
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'error',
            logPrefix: 'profile',
            notify: true,
            reloadDelay: 1000
        };
        return options;
    };

    return config;
};
