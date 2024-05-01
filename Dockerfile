# Base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app/forge

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy .env file
COPY .env ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the NestJS application
RUN npm run build

# Production image
FROM node:20-alpine

# Set the working directory
WORKDIR /app/forge/dist/apps/forge

# Copy the built application from the builder image
COPY --from=builder /app/forge/dist/apps/forge ./

# Copy package.json and package-lock.json
COPY --from=builder /app/forge/package*.json ./

# Copy .env file
COPY --from=builder /app/forge/.env ./

# Install only production dependencies
RUN npm install --production

# Expose the port your NestJS application will run on
EXPOSE 3000

# Set environment variables
CMD ["sh", "-c", "export $(cat /app/forge/.env | xargs) && node main.js"]
