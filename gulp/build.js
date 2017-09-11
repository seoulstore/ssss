(function () {
  'use strict';
  
  var gulp             = require('gulp'),
      autoprefixer     = require('autoprefixer'),
      $                = require('gulp-load-plugins')(),
      // _                = require('lodash'),
      fs               = require('fs'),
      cp               = require('child_process'),
      runSequence      = require('run-sequence'),
      path             = gulp.path,
      generateGlyphiconsData = require('../grunt/bs-glyphicons-data-generator.js'),
      generateRawFiles       = require('../grunt/bs-raw-files-generator.js'),
      BsSassdocParser        = require('../grunt/bs-sassdoc-parser.js'),
      htmlminOpt = {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: false,
        minifyCSS: {
          compatibility: 'ie8',
          keepSpecialComments: 0
        },
        minifyJS: true,
        minifyURLs: false,
        processConditionalComments: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeOptionalAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: false,
        sortAttributes: true,
        sortClassName: true
      };
  
  function getFileName (file) {
    var filePath = file.path.split(file.base),
        fileName = filePath[1];
    
    return fileName;
  }
  
  gulp.task('concat:docsjs', function () {
    
    return gulp.src([
        path.assets + '/js/vendor/holder.min.js',
        path.assets + '/js/vendor/ZeroClipboard.min.js',
        path.assets + '/js/vendor/anchor.min.js',
        path.assets + '/js/src/application.js'
      ])
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError())
      .pipe($.concat('docs.min.js'))
      .pipe($.uglify({ output: { quote_style: 1 }}).on('error', $.util.log))
      .pipe(gulp.dest(path.assets + '/js'));
    
  });
  
  gulp.task('concat:customizerjs', function () {
    
    return gulp.src([
        path.assets + '/js/vendor/autoprefixer.js',
        path.assets + '/js/vendor/less.min.js',
        path.assets + '/js/vendor/jszip.min.js',
        path.assets + '/js/vendor/uglify.min.js',
        path.assets + '/js/vendor/Blob.js',
        path.assets + '/js/vendor/FileSaver.js',
        path.assets + '/js/raw-files.min.js',
        path.assets + '/js/src/customizer.js'
      ])
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError())
      .pipe($.concat('customize.min.js'))
      .pipe($.uglify({ output: { quote_style: 1 }}).on('error', $.util.log))
      .pipe(gulp.dest(path.assets + '/js'));
    
  });
  
  gulp.task('concat:bootstrapCss', function (done) {
    
    return gulp.src(path.scss + '/**/*.scss')
      .pipe($.sassLint())
      .pipe($.sassLint.failOnError())
      // .pipe($.sass().on('error', $.sass.logError))
      .pipe(
        $.sass()
          // .on('error', $.sassError.gulpSassError(true)).on('end', function () { return process.exit(1) })
          .on('error', function (error) {
            done(error);
          })
      )
      .pipe($.postcss([autoprefixer()]))
      .pipe(gulp.dest(path.dist + '/css'));
    
  });
  
  gulp.task('minify:bootstrapCss', function () {
    
    return gulp.src(path.scss + '/**/*.scss')
      .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
      .pipe($.rename('bootstrap.min.css'))
      .pipe($.postcss([autoprefixer()]))
      .pipe(gulp.dest(path.dist + '/css'));
    
  });
  
  gulp.task('concat:bootstrapJs', function () {
    
    return gulp.src([path.root + 'js/*.js', '!' + path.root + 'js/tests'])
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError())
      .pipe($.concat('bootstrap.js'))
      .pipe(gulp.dest(path.dist + '/js'));
    
  });
  
  gulp.task('minify:bootstrapJs', function () {
    
    return gulp.src([path.dist + '/js/bootstrap.js'])
      .pipe($.uglify())
      .pipe($.rename('bootstrap.min.js'))
      .pipe(gulp.dest(path.dist + '/js'));

  });
  
  gulp.task('concat:docsCss', function () {
    
    return gulp.src(path.assets + '/css/src/*.css')
      .pipe($.concat('docs.min.css'))
      .pipe(gulp.dest(path.assets + '/css'));
      // .pipe($.debug({showFiles: true}));
    
  });
  
  gulp.task('generateGlyphiconsData', function () {
    generateGlyphiconsData.call();
  });
  
  gulp.task('pug', function () {
    
    var getSassVarsData = function () {
      var filePath = path.root + 'scss/bootstrap/_variables.scss',
          fileContent = fs.readFileSync(filePath, { encoding: 'utf8' }),
          parser = new BsSassdocParser(fileContent);
  
      return { sections: parser.parseFile() };
    }();
    
    return gulp.src([path.docs + '/_pug/*.pug'])
      .pipe($.foreach(function (stream, file) {
        var pugFileName = getFileName(file),
            htmlFile = pugFileName.indexOf('nav') > 0 ? 'customize.html' : 'customizer-variables.html',
            destPath = pugFileName.indexOf('nav') > 0 ? path.docs + '/_includes/nav' : path.docs + '/_includes';
        
        return stream
          .pipe($.pug({
            data: getSassVarsData
          }))
          .pipe($.rename(htmlFile))
          .pipe(gulp.dest(destPath));
      }));
    
  });
  
  gulp.task('generateRawFiles', function () {
    generateRawFiles();
  });
  
  gulp.task('jekyll:build', function (done) {
    
    var jekyll = cp.spawn('jekyll', ['build']),
        jekyllLogger = function (buffer) {
          buffer.toString()
            .split(/\n/)
            .forEach(function (message) {
              $.util.log('Jekyll: ' + message);
            });
        };
    
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
    
    jekyll.on('close', done);
  });
  
  /*gulp.task('minify:jekyllHtml', function (done) {
    
    gulp.src([path.ghPages + '/!**!/!*.html', '!' + path.ghPages + '/examples/!**!/!*.html'])
      .pipe($.foreach(function (stream, file) {
        var filePath     = _.last(file.path.split(file.base)),
            fileName     = filePath.split('/'),
            lastDir      = _.head(fileName) !== 'index.html' ? _.head(fileName) : '',
            lastFileName = _.isEmpty(lastDir) ? _.head(fileName) : _.last(fileName),
            destPath     = _.isEmpty(lastDir) ? path.ghPages : path.ghPages + '/' + lastDir;
        
        return stream
          .pipe($.rename('_' + lastFileName))
          .pipe($.htmlmin(htmlminOpt))
          .pipe(gulp.dest(destPath));
      })).on('close', function () {done()});
    
  });
  
  gulp.task('rename:jekyllHtml', ['clean:ghPagesOriginHtml'], function () {
    
    gulp.src([path.ghPages + '/!**!/!*.html', '!' + path.ghPages + '/examples/!**!/!*.html'])
      .pipe($.foreach(function (stream, file) {
        var filePath = _.last(file.path.split(file.base)),
          fileName   = filePath.split('/'),
          lastDir    = _.head(fileName) !== '_index.html' ? _.head(fileName) : '',
          destPath   = _.isEmpty(lastDir) ? path.ghPages : path.ghPages + '/' + lastDir;

        return stream
          .pipe($.rename('index.html'))
          .pipe($.debug())
          .pipe(gulp.dest(destPath));
      }));
    
  });*/
  
  gulp.task('bootstrapJs', function () {
    runSequence('concat:bootstrapJs', 'minify:bootstrapJs');
  });
  
  gulp.task('bootstrapCss', function () {
    runSequence('concat:bootstrapCss', 'minify:bootstrapCss');
  });
  
  gulp.task('concat', function () {
    runSequence('concat:docsCss', 'concat:docsjs', 'concat:customizerjs');
  });
  
  gulp.task('concat:js', function () {
    runSequence(['concat:docsjs', 'concat:customizerjs']);
  });
  
  gulp.task('jekyllHtmlMin', function () {
    runSequence('minify:jekyllHtml', 'rename:jekyllHtml', 'clean:ghPagesCustomHtml');
  });
  
})();
