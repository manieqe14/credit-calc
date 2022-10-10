# get the base node image
FROM node:16-alpine as builder

RUN mkdir credit-calc
RUN cd credit-calc
# copy the json file first
COPY ./package.json /

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

EXPOSE 3000

# build the folder
CMD [ "npm", "run", "start" ]