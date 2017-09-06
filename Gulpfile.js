(function () {
  'use strict';
  
  var gulp = require('gulp');
  
  gulp.path = {
    root: './',
    dist: './docs/dist',
    docs: './docs',
    assets: './docs/assets',
    scss: './scss',
    ghPages: './_gh_pages'
  };
  
  require('require-dir')('./gulp');
  
  gulp.task('dist', ['clean:dist', 'bootstrapCss', 'bootstrapJs', 'copy:fonts']);
  gulp.task('docs', ['concat', 'generateGlyphiconsData', 'generateRawFiles', 'pug']);
  gulp.task('prep-release', ['dist', 'docs']);
  
})();
