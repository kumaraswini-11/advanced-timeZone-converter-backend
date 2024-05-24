# Used the official Node.js 22 image as the base image
FROM node:22

# Create and set the working directory
WORKDIR /src/index

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the application source code to the working directory
COPY . .

# Copy the .env file to the working directory
COPY .env .env

# Generate Prisma Client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD [ "node", "index.js" ]
