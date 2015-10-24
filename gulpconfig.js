'use strict';

module.exports = function() {
    var clientfolder = './src/client/';
    var indexhtml = clientfolder + 'index.html';

    var tempFolder = './.temp/';

    var config = {
        //Files
        index: indexhtml,

        vetjs: ['./src/**/*.js',
                './*.js',
                '!./karma.conf.js'],

        injectjs: [clientfolder + 'app/**/*.js',
                   '!' + clientfolder + 'app/**/*.spec.js'],

        serverjs: './src/server/server.js',

        templates: {
            html: [clientfolder + '**/*.html',
                   '!' + indexhtml],

            cacheFileName: 'templates.js',
            cacheFile: tempFolder + 'templates.js',

            injectTag: '<!-- inject:templates:js -->',

            cacheOptions: {
                module: 'app',
                standAlone: false
            },

        },

        //Folders
        clientfolder: clientfolder,

        tempfolder: tempFolder,
        buildfolder: './build/',

        defaultPort: 7203,
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
