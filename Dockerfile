FROM node:18.16.0

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080
