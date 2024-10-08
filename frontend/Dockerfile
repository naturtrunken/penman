# Stage 1: Build Angular application in a node container.
FROM node:22-alpine AS frontend-build
WORKDIR /penman
COPY / ./
COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install --force
RUN npm run build --prod
COPY . .

# Stage 2: Build a Nginx container which serves the previously compiled application.
FROM nginx:1.27
WORKDIR /penman
# This copies the compiled Angular app *from the other container* in the Nginx container.
COPY --from=frontend-build /penman/dist/penman/ /usr/share/nginx/html
# Copy the custom nginx configuration
COPY deployment/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Configure the main process to run when running the image
CMD ["nginx", "-g", "daemon off;"]

