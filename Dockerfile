FROM node:18-alpine
LABEL maintainer="webdev"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY app/*.js ./app/
EXPOSE 8008
CMD [ "node", "app/server.js" ]