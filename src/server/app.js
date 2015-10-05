/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();

var favicon = require('serve-favicon');
var logger = require('morgan');

var port = process.env.PORT || 7203;
var environment = process.env.NODE_ENV;

app.use(logger('dev'));
app.use(favicon(__dirname + '/favicon.ico'));

console.log('Starting server on port: ' + port);

switch (environment) {
    case 'prod':
        console.log('PRODUCTION');
        console.log('prod environment has not been setup!');
        //app.use(express.static('./build/'));
        //app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('DEVELOPMENT');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});
