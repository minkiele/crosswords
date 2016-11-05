  var browserSync = require('browser-sync');
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.bs');
  var bundler = webpack(webpackConfig);
  var fs = require('fs');
  var bs = browserSync.create();

  bs.init({
    server: {
      baseDir: ['dist', 'sample'],
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true
          }
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    files: ['dist/**/*.js', 'dist/**/*.css', 'sample/**/*.html']
  });
