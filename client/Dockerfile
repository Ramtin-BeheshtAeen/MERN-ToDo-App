#Development Stage
FROM node:18-bookworm-slim AS development
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json  ./
RUN npm install
# Install dependencies
#ci : clean install, it will remove the node_modules folder and install everything from scratch
RUN npm install 
# Copy the rest of the application code
# This will copy all files from the current directory to the /app directory in the container
# This is useful for development, but in production you might want to copy only necessary files
# If you want to copy only specific files, you can use a .dockerignore file to exclude unnecessary files
COPY . .

RUN VITE_APP_BACKEND_SERVER_URL=mern-todo-app-api.ramtinba.de npm run build 

FROM caddy:2-alpine AS production
# Copy the built application from the development stage
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=development /app/dist /srv