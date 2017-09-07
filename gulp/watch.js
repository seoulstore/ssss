(function () {
  'use strict';
  
  var gulp = require('gulp'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      watch = require('gulp-watch'),
      path = gulp.path;
  
  gulp.task('watch:scss', function () {
    
    watch([path.scss + '/**/*.scss'], function (event) {
      
      return gulp.src(event.path)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest(path.assets + '/dist/css'));
      
    });
    
  });
  
  gulp.task('watch', ['watch:scss']);
  
})();
