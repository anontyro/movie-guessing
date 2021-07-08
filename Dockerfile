# SETUP
FROM node:14-alpine as builder

WORKDIR /home/node/app
COPY . .

RUN yarn install && yarn build:prod

FROM node:14-alpine
ENV NODE_ENV=production

ARG ACCESS_TOKEN
ENV ACCESS_TOKEN=$ACCESS_TOKEN
ARG SHEET_BEST_URL
ENV SHEET_BEST_URL=$SHEET_BEST_URL

WORKDIR /home/node/app

COPY ./package* ./
RUN yarn install

COPY --from=builder /home/node/app/build ./build

EXPOSE 3000

CMD yarn prod:server