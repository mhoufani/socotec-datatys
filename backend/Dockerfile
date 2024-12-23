ARG NODE_VERSION=22.12
ARG PORT=3002

FROM node:${NODE_VERSION}

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

EXPOSE ${PORT}

CMD ["yarn", "start"]
