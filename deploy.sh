#!/bin/bash
echo "**********************************   Starting deployment   **********************************"
echo "********************************** Target: gh-pages branch **********************************"

DIST_DIRECTORY="_gh_pages/"
CURRENT_COMMIT=`git rev-parse HEAD`
ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_URL_WITH_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GH_TOKEN@github.com}

cp .gitignore $DIST_DIRECTORY || exit 1

echo "Checking out gh-pages branch"
git checkout -B gh-pages || exit 1

echo "Remove"

#find ./ ! -name _gh_pages -exec rm -rf {} \;
#bootstrap-3.3.7-dist.zip
rm -rf bower.json
rm -rf CHANGELOG.md
rm -rf composer.json
rm -rf _config.yml
rm -rf CONTRIBUTING.md
rm -rf deploy.sh
rm -rf fonts
rm -rf Gemfile
rm -rf Gemfile.lock
rm -rf grunt
rm -rf Gruntfile.js
rm -rf .hound.yml
rm -rf ISSUE_TEMPLATE.md
rm -rf js
rm -rf npm-shrinkwrap.json
rm -rf nuget
rm -rf package.js
rm -rf package.json
rm -rf package-lock.json
rm -rf .sass-cache
cp -a _gh_pages/* ./
rm -rf _gh_pages

echo ""
ls -al

echo "Pushing new content to $ORIGIN_URL"
git add -A . || exit 1
git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
git push --force "$ORIGIN_URL_WITH_CREDENTIALS" gh-pages

echo "Cleaning up temp files"
rm -Rf $DIST_DIRECTORY

echo "Deployed successfully."
exit 0
