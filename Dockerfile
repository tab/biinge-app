FROM node:20.5.1-alpine3.18 as base

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

# CMD ["yarn", "run", "dev"]

# FROM base as builder

# RUN yarn build

