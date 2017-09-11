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

})();
