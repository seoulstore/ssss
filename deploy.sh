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
ls -al
echo ""
#find ./ ! -name _gh_pages -exec rm -rf {} \;
#echo ""
#ls

echo "Pushing new content to $ORIGIN_URL"
git add -A . || exit 1
git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
git push --force "$ORIGIN_URL_WITH_CREDENTIALS" gh-pages

echo "Cleaning up temp files"
rm -Rf $DIST_DIRECTORY

echo "Deployed successfully."
exit 0
