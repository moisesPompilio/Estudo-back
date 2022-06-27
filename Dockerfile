FROM  node:latest

COPY . .

RUN npm install

USER node

EXPOSE 3000

ENTRYPOINT [ "node", "./index.js"]