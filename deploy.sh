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
rm -rf bower.json CHANGELOG.md composer.json _config.yml CONTRIBUTING.md deploy.sh fonts Gemfile Gemfile.lock grunt Gruntfile.js .hound.yml ISSUE_TEMPLATE.md js npm-shrinkwrap.json nuget package.js package.json package-lock.json .sass-cache docs
cp -a _gh_pages/* ./
rm -rf _gh_pages

echo "Pushing new content to $ORIGIN_URL"
git add -A . || exit 1
git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
git push --force "$ORIGIN_URL_WITH_CREDENTIALS" gh-pages

echo "Cleaning up temp files"
rm -Rf $DIST_DIRECTORY

echo "Deployed successfully."
exit 0
