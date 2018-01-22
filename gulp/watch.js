(function () {
  'use strict';
  
  var gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      sassLint     = require('gulp-sass-lint'),
      postcss      = require('gulp-postcss'),
      debug        = require('gulp-debug'),
      sassError    = require('gulp-sass-error'),
      autoprefixer = require('autoprefixer'),
      watch        = require('gulp-watch'),
      path         = gulp.path;
  
  gulp.task('watch:scss', function () {
    
    watch([path.scss + '/**/*.scss'], function () {
      
      return gulp.src([path.scss + '/**/*.scss'])
        .pipe(sassLint())
        .pipe(sassLint.failOnError())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sassError.gulpSassError(true)))
        .pipe(postcss([autoprefixer()]))
        .pipe(debug())
        .pipe(gulp.dest(path.dist + '/css'));
      
    });
    
  });
  
  gulp.task('watch', ['watch:scss']);
  
})();
