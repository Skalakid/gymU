FROM node:20 as base

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

EXPOSE 3000

FROM base as dev
RUN yarn install 

COPY . .

EXPOSE 3000

ENTRYPOINT ["yarn"]
