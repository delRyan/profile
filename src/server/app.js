/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();

var logger = require('morgan');

var port = process.env.PORT || 7203;
var environment = process.env.NODE_ENV;

app.use(logger('dev'));

console.log('Starting server on port: ' + port);

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});
