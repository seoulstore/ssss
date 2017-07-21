#!/bin/bash
echo "**********************************   Starting deployment   **********************************"
echo "********************************** Target: gh-pages branch **********************************"

echo ""
ls
echo ""

travis encrypt GH_TOKEN="9db57a607ef5c2f6df783875b913ae5fa0e9bfc7" --add


DIST_DIRECTORY="_gh_pages/"
#GH_TOKEN="9db57a607ef5c2f6df783875b913ae5fa0e9bfc7"
CURRENT_COMMIT=`git rev-parse HEAD`
ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_URL_WITH_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GH_TOKEN@github.com}
GIT_USER_NAME="scjang"
GIT_USER_EMAIL="wkdtjdcjf294@gmail.com"

cp .gitignore $DIST_DIRECTORY || exit 1

echo "Checking out gh-pages branch"
git checkout -B gh-pages || exit 1

#echo "Removing old static content"
#git rm -rf $DIST_DIRECTORY || exit 1

#echo "Copying dist content to root"
#cp -r $DIST_DIRECTORY/ . || exit 1
#cp $DIST_DIRECTORY.gitignore . || exit 1

echo "Pushing new content to $ORIGIN_URL"
git remote -v
git config user.name $GIT_USER_NAME || exit 1
git config user.email $GIT_USER_EMAIL || exit 1

git add -A . || exit 1
git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
git push --force "$ORIGIN_URL_WITH_CREDENTIALS" gh-pages

echo "Cleaning up temp files"
rm -Rf $DIST_DIRECTORY

echo "Deployed successfully."
exit 0
