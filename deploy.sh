!/bin/bash
echo "**********************************   Starting deployment   **********************************"
echo "********************************** Target: gh-pages branch **********************************"

#travis encrypt GH_TOKEN="9db57a607ef5c2f6df783875b913ae5fa0e9bfc7" --add

GH_TOKEN="ZmSlRw9CVWWdcp5hRfR91qxSGUPkQ1/fYhw3MW6OIcQi397XA1S6dAUIdSlQz4sA6SdNkgsWERkCsLXeAJ1q4muXy8tNYIK50IuevDm2eoL9w4mLGM8Ld+z8Kdx0d0iVAogvaSBTbh+eiN+QTjvV3s32S/hszFVx3o3gM6lOLyVC0Mvrz7BeJj8hFJZzg/zgLmZUzATzk/wooqro/B725jPjR0jK5ztMI5kxyn+v7Aby+e+0rDUVveHHW0tT9whgxvObTG5mXfvN22zBMKRoT0ucIQJD2ZP1g7qY55StgcHIfLCVx459VAKAkMCjqx+3sfBmd4kXHZuZVer7vJVkjdvCsQWqpLExIHSn80Ba6pVKXlsM0JSrnXDxKDQl98FuRGbirCEeXQsmFoF1yywXBp9mTVkP6Pg8wgFN0fao9xgLfIBlGcRPnmeoT+2bxwYeW5gkFt95h+R1kper6iLPiJrlwxYNFJpJ6wneuCXljN/kz+p2HrGXzpYdCw9qaZWjJhYbAmYYb+Ykiug3OAPH5xfhKJSJJb53EzuGzlR1iSLIOTsofwba6genApBlycTv8xOUiX+PYUh8YvdYwHIOrLTfolDj9jy2V63pnWnFmi5wWP/8QSLSCAr3oiHDqhjZBbw3OLd4mG4Tg3AZCQpCKn9xmzSX+c6b2ce+7dGex7Q="
DIST_DIRECTORY="_gh_pages/"
CURRENT_COMMIT=`git rev-parse HEAD`
ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_URL_WITH_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GH_TOKEN@github.com}
GIT_USER_NAME="scjang"
GIT_USER_EMAIL="wkdtjdcjf294@gmail.com"

cp .gitignore $DIST_DIRECTORY || exit 1

echo "Checking out gh-pages branch"
git checkout -B gh-pages || exit 1

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
