FROM node:20-alpine AS base

RUN apk update && apk upgrade && apk add dumb-init && adduser -D adminuser
USER adminuser

WORKDIR /app
EXPOSE 3000

ENTRYPOINT ["/etc/entrypoint.sh"]
COPY ./entrypoint.sh /etc/entrypoint.sh
RUN chmod a+x /etc/entrypoint.sh

COPY --chown=adminuser:adminuser ./ ./

RUN yarn install --immutable --inline-builds

RUN yarn build
