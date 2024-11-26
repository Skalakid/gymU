FROM python:3.11

WORKDIR /app

COPY . .

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install yarn -y

RUN yarn global add nodemon

EXPOSE 3001

ENTRYPOINT [ "yarn" ]