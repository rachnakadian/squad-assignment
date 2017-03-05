const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const port =  process.env.PORT || 3000;
const app = express();

var users = require('./routes/users');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'dist',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.use('/users', users);
app.get('*', function response(req, res) {
  console.log(__dirname, 'dist/index.html');
  console.log(path.join(__dirname, 'dist/index.html'));
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end();
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

app.use(function(err, req, res, next) {
  console.log("err",err);
  res.status(err.status || 500).send(err);
});

app.listen(port,function(){
  console.log("server running at port " + port);
});
