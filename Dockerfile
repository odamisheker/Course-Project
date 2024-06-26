FROM node:20.14.0-alpine as client

WORKDIR /usr/app/client
COPY client/package*.json ./
RUN npm install -qy
COPY client/ ./
RUN npm run dev

FROM node:20.14.0-alpine

WORKDIR /usr/app
COPY --from=client /usr/app/client ./client

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 8080
EXPOSE 8000

CMD ["npm", "start"]