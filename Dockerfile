FROM node:22-alpine3.18

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
RUN npm install -g knex

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]