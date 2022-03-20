FROM node:12 AS BUILD
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:staging

FROM nginx:alpine
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#clone app from git
COPY --from=BUILD /app/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf

# Bundle app
ENTRYPOINT ["nginx", "-g", "daemon off;"]