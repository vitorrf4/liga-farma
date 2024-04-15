# syntax=docker/dockerfile:1

FROM node:21
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "run", "prod"]
EXPOSE 3000
