# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10-alpine as build-stage
WORKDIR /opt/app

COPY package-lock.json package-lock.json
COPY package.json package.json
COPY jsconfig.json jsconfig.json
RUN npm install --silent \
  && npm audit fix

COPY src src
COPY public public

RUN npm run build

# Stage 1, based on Nginx build app ready for production with Nginx
FROM nginx:alpine

COPY --from=build-stage /opt/app/build/ /usr/share/nginx/html
# Copy the default nginx.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
