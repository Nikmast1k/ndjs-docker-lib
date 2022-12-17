FROM node:19.2.0

WORKDIR /app

ARG node_env=production

COPY ./package.json ./

RUN npm install

COPY src/ ./src

CMD ["node", "src/index.js"]