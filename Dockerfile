FROM node:7.4.0-alpine

EXPOSE 3000
ENV DIR /usr/src/app
RUN mkdir -p $DIR
WORKDIR $DIR
COPY . $DIR
RUN npm run build
ENTRYPOINT ["node", "server"]
