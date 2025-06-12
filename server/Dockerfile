#development stage
FROM node:18-bookworm-slim AS development
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
#ci : clean install, it will remove the node_modules folder and install everything from scratch
RUN npm install --production
# Copy the rest of the application code
# This will copy all files from the current directory to the /app directory in the container
# This is useful for development, but in production you might want to copy only necessary files
# If you want to copy only specific files, you can use a .dockerignore file to exclude unnecessary files
COPY . .

CMD ["npm", "run", "deploy"]


#production stage
FROM node:18-bookworm-slim AS production
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

COPY . .

CMD ["npm", "run", "deploy"]
