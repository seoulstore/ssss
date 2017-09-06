(function () {
  'use strict';
  
  var gulp = require('gulp'),
      path = gulp.path,
      del = require('del');
  
  gulp.task('clean:dist', function (done) {
    return del([path.dist], done);
  });
  
  gulp.task('clean:ghPages', function (done) {
    return del([path.ghPages], done);
  });
  
  gulp.task('clean:ghPagesOriginHtml', function (done) {
    return del([path.ghPages + '/**/index.html', '!examples/**/*.html'], done);
  });
  
})();
