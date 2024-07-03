# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Copy the .env file to the container
COPY .env .env

# Install Playwright browsers
RUN npx playwright install

# Command to run the tests
CMD ["npx", "playwright", "test"]
