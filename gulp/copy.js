(function () {
  'use strict';
  
  var gulp = require('gulp'),
      path = gulp.path;
  
  gulp.task('copy:fonts', function () {
    return gulp.src([path.root + '/fonts/**/*.*'])
      .pipe(gulp.dest(path.dist + '/fonts'));
  });
  
})();
