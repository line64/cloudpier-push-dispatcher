FROM node:6

RUN npm i -g yarn

RUN mkdir -p /app

ADD ./package.json /app/package.json
ADD ./yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn install

ADD ./dist /app/dist

CMD [ "node", "./dist/index.js" ]
