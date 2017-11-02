(function () {
  'use strict';
  
  var gulp        = require('gulp'),
      runSequence = require('run-sequence');
  
  gulp.path = {
    root   : './',
    dist   : './docs/dist',
    docs   : './docs',
    assets : './docs/assets',
    scss   : './scss',
    ghPages: './_gh_pages'
  };
  
  require('require-dir')('./gulp');
  
  gulp.task('dist', function () {
    runSequence(
      'clean:dist', 
      'concat:bootstrapCss', 
      'minify:bootstrapCss', 
      'concat:bootstrapJs', 
      'minify:bootstrapJs', 
      'copy:fonts'
    );
  });
  
  gulp.task('docs', function () {
    runSequence(
      'concat:docsCss', 
      'concat:docsjs', 
      'concat:customizerjs', 
      'generateGlyphiconsData', 
      'generateSconsData', 
      'generateRawFiles', 
      'pug'
    );
  });
  
  gulp.task('build', function () {
    runSequence(
      'clean:dist',
      'clean:ghPages',
      'concat:bootstrapCss',
      'minify:bootstrapCss',
      'concat:bootstrapJs',
      'minify:bootstrapJs',
      'copy:fonts',
      'concat:docsCss',
      'concat:docsjs',
      'concat:customizerjs',
      'generateGlyphiconsData',
      'generateSconsData',
      'generateRawFiles',
      'pug',
      'jekyll:build'
    );
  });
  
})();
