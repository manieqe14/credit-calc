# get the base node image
FROM node:alpine as builder

RUN mkdir credit-calc
RUN cd credit-calc
# copy the json file first
COPY ./package.json /

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

# build the folder
CMD [ "npm", "run", "start" ]