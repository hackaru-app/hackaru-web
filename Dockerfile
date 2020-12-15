FROM node:15.4.0-alpine as builder
ENV WEB_DIR /hackaru
WORKDIR $WEB_DIR
COPY package.json yarn.lock $WEB_DIR/
RUN apk add --update --no-cache python make g++ git && yarn install


FROM node:15.4.0-alpine
ENV WEB_DIR /hackaru
WORKDIR $WEB_DIR
RUN addgroup hackaru \
 && adduser -s /bin/sh -D -G hackaru hackaru \
 && chown hackaru:hackaru $WEB_DIR
COPY --chown=hackaru:hackaru \
     --from=builder $WEB_DIR/node_modules $WEB_DIR/node_modules
COPY --chown=hackaru:hackaru . $WEB_DIR
USER hackaru
RUN yarn build
CMD ["yarn", "start"]
