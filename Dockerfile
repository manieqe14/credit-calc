FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm i

COPY . .

#EXPOSE 3000

# CMD ["npm", "run", "serve"]
RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY etc/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
