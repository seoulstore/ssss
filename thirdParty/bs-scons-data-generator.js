/*!
 * Bootstrap Grunt task for scons data generation
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict';

var fs = require('fs'),
    gulpUtil = require('gulp-util');

module.exports = function generateSconsData() {
  // Pass encoding, utf8, so `readFileSync` will return a string instead of a
  // buffer
  var sconsFile = fs.readFileSync('scss/bootstrap/_glyphicons.scss', 'utf8');
  var sconsLines = sconsFile.split('\n');

  // Use any line that starts with ".scon-" and capture the class name
  var iconClassName = /^\.(scon-[a-zA-Z0-9-]+)/;
  var sconsData = '# This file is generated via Grunt task. **Do not edit directly.**\n' +
                       '# See the \'build-scons-data\' task in Gruntfile.js.\n\n';
  var sconsYml = 'docs/_data/scons.yml';
  for (var i = 0, len = sconsLines.length; i < len; i++) {
    var match = sconsLines[i].match(iconClassName);

    if (match !== null) {
      sconsData += '- ' + match[1] + '\n';
    }
  }
  
  // Create the `_data` directory if it doesn't already exist
  if (!fs.existsSync('docs/_data')) {
    fs.mkdirSync('docs/_data');
  }

  try {
    fs.writeFileSync(sconsYml, sconsData);
  } catch (err) {
    gulpUtil.log(err);
  }
  
  gulpUtil.log('File ' + sconsYml + ' created.');
 };
