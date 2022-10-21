FROM node:16-alpine as angular

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm", "start"]
