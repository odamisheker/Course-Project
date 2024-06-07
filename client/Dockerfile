FROM node:20.14.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci -qy

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]