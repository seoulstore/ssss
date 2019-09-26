FROM jekyll/jekyll

ENV HOME=/home/app
ENV APP_DIR=$HOME/ssss

COPY ./ $APP_DIR/

WORKDIR $APP_DIR

RUN npm install \
  && npm install -g gulp \
  && chmod -R 777 $APP_DIR
