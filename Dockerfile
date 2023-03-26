FROM node:14

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .env ./dist/
WORKDIR ./dist

EXPOSE 3000

CMD ["node", "bin/start.js"]