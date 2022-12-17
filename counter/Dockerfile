FROM node:19.2.0

WORKDIR /app_counter

ARG node_env=production

COPY ./package.json ./

RUN npm install

COPY src/ ./src

CMD ["node", "src/counter.js"]