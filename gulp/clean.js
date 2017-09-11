(function () {
  'use strict';
  
  var gulp = require('gulp'),
      del  = require('del'),
      path = gulp.path;
  
  gulp.task('clean:dist', function () {
    return del([path.dist]);
  });
  
  gulp.task('clean:ghPages', function () {
    return del([path.ghPages]);
  });
  
  /*gulp.task('clean:ghPagesOriginHtml', function (done) {
    return del([path.ghPages + '/!**!/index.html', '!examples/!**!/!*.html'], done);
  });
  
  gulp.task('clean:ghPagesCustomHtml', function () {
    return del([path.ghPages + '/!**!/_index.html', '!examples/!**!/!*.html']);
  });*/
  
})();
