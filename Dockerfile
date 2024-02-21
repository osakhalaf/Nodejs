# Use the official Node.js image as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the remaining application code into the container
COPY . .

# Expose port 3000 to interact with the application
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]