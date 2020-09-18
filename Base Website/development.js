const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('./webpack.dev.config.js');
const compiler = webpack(config);
const bodyParser =  require("body-parser");
const port = 3000;
var favicon = require('serve-favicon');

process.env.NODE_ENV='dev';
console.log(process.env.NODE_ENV )
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
	publicPath: "/static/",
}));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(port);
console.log("***** SERVER STARTED ON PORT " +port+ " *****");
