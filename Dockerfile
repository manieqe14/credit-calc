# get the base node image
FROM node:alpine as builder

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# copy the json file first
COPY package.json .
COPY package-lock.json .

# install npm dependencies
RUN npm install --production

ADD . .

ENTRYPOINT ["/entrypoint.sh"]


EXPOSE 5173

# build the folder
CMD [ "npm", "run", "build" ]
CMD [ "npm", "run", "start" ]