FROM node:12 as build
WORKDIR /source
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /app
COPY --from=build /source/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
