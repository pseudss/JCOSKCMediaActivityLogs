# Use an official Node.js runtime as a parent image
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller Node.js image for production
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the builder image
COPY --from=builder /app/. .

# Expose the port that the application will run on
EXPOSE 3000

# Run the command to start the production server
CMD ["npm", "start"]