ARG NODE_VERSION=22.12
ARG PORT=3000

FROM node:${NODE_VERSION}

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]

EXPOSE ${PORT}
