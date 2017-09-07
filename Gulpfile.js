(function () {
  'use strict';
  
  var gulp = require('gulp'),
      runSequence = require('run-sequence');
  
  gulp.path = {
    root: './',
    dist: './docs/dist',
    docs: './docs',
    assets: './docs/assets',
    scss: './scss',
    ghPages: './_gh_pages'
  };
  
  require('require-dir')('./gulp');
  
  gulp.task('dist', function () {
    runSequence('clean:dist', 'bootstrapCss', 'bootstrapJs', 'copy:fonts');
  });
  
  gulp.task('docs', function () {
    runSequence('concat', 'generateGlyphiconsData', 'generateRawFiles', 'pug');
  });

  gulp.task('prep-release', function () {
    runSequence('dist', 'docs', 'jekyllHtmlMin', 'build');
  });
  
})();
