FROM node:10
WORKDIR /src

RUN npm install pm2 -g
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080

# CMD [ "node", "src/server.js" ]
# RUN pm2 stop server.js