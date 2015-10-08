'use strict';

module.exports = function() {
    var client = './src/client/';

    var config = {
        client: client,
        index: client + 'index.html',

        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        }
    };

    config.getWiredepOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
