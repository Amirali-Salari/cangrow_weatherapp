# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and to the working directory

COPY . .

# Install app dependencies
RUN npm install


# Expose port 3000 (or the port your app is listening on)
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js"]

