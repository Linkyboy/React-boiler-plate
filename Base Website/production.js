const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const ServerRendererPath = path.join(__dirname, './static/server.js');
const ServerRenderer = require(ServerRendererPath).default;
const bodyParser =  require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, './static')));
app.use(favicon(__dirname + '/static/favicon.ico'));
app.use(ServerRenderer());
app.listen(port);
console.log("***** SERVER STARTED ON PORT " +port+ " *****");
