var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var dotenv = require('dotenv').config();

mongoose.connect(process.env.mongoose, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Server Connected to MongoDB"))
.catch(err => console.log(err));

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);

module.exports = app;

