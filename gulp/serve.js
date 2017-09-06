(function () {
  'use strict';
  
  var gulp = require('gulp'),
      path = gulp.path,
      watch = require('gulp-watch'),
      bs = require('browser-sync'),
      cp = require('child_process'),
      gulpUtil = require('gulp-util'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss');
  
  gulp.task('jekyll', ['watch'], function () {
    var jekyll = cp.spawn('jekyll', ['build', '--watch', '--incremental', '--drafts']),
      jekyllLogger = function (buffer) {
        buffer.toString()
          .split(/\n/)
          .forEach(function (message) {
            gulpUtil.log('Jekyll: ' + message);
          });
      };
    
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
  });
  
  gulp.task('serve', ['jekyll'],  function () {
    
    bs.init({
      server: {
        baseDir: path.ghPages
      }
    });
    
    gulp.watch([path.docs + '/**/*.*'], function () {
      setTimeout(function () {
        bs.reload();
      }, 1000);
    });
    
  });
  
})();
