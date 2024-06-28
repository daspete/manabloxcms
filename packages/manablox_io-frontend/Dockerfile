FROM node:20-alpine AS build

RUN apk update && apk upgrade

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --immutable --inline-builds

COPY . ./

RUN yarn build


FROM node:20-alpine
RUN apk update && apk upgrade && apk add dumb-init && adduser -D adminuser
USER adminuser

WORKDIR /app
COPY --chown=adminuser:adminuser --from=build /app/.output ./

EXPOSE 3000

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

CMD ["dumb-init", "node", "/app/server/index.mjs"]
