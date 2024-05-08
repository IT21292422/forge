## ! Error solutions ##################################

##* if node:20-alpine Error comes use this
## docker pull node:20-alpine

##* if need to Clear Docker Cache
## docker builder prune --all --force

## ! ############# Docker build for forge ###########################
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

# sudo docker build -t forge-app -f Dockerfile .
# sudo docker run -p 3000:3000 forge-app

## ! ############# Docker build for learner ###########################

# # Base image
# FROM node:20-alpine AS builder

# # Set the working directory
# WORKDIR /app/learner

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Copy .env file
# COPY .env ./

# # Install dependencies
# RUN npm install

# # Copy the entire project
# COPY . .

# # Build the NestJS application
# RUN npm run build

# # Production image
# FROM node:20-alpine

# # Set the working directory
# WORKDIR /app/learner/dist/apps/learner

# # Copy the built application from the builder image
# COPY --from=builder /app/learner/dist/apps/learner ./

# # Copy package.json and package-lock.json
# COPY --from=builder /app/learner/package*.json ./

# # Copy .env file
# COPY --from=builder /app/learner/.env ./

# # Install only production dependencies
# RUN npm install --production

# # Expose the port your NestJS application will run on
# EXPOSE 3004

# # Set environment variables
# CMD ["sh", "-c", "export $(cat /app/learner/.env | xargs) && node main.js"]

# # sudo docker build -t learner-app -f Dockerfile .
# # sudo docker run -p 3001:3001 learner-app

## ! ############# Docker build for payment ###########################

# # Base image
# FROM node:20-alpine AS builder

# # Set the working directory
# WORKDIR /app/payment

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Copy .env file
# COPY .env ./

# # Install dependencies
# RUN npm install

# # Copy the entire project
# COPY . .

# # Build the NestJS application
# RUN npm run build

# # Production image
# FROM node:20-alpine

# # Set the working directory
# WORKDIR /app/payment/dist/apps/payment

# # Copy the built application from the builder image
# COPY --from=builder /app/payment/dist/apps/payment ./

# # Copy package.json and package-lock.json
# COPY --from=builder /app/payment/package*.json ./

# # Copy .env file
# COPY --from=builder /app/payment/.env ./

# # Install only production dependencies
# RUN npm install --production

# # Expose the port your NestJS application will run on
# EXPOSE 3004

# # Set environment variables
# CMD ["sh", "-c", "export $(cat /app/payment/.env | xargs) && node main.js"]

# # sudo docker build -t payment-app -f Dockerfile .
# # sudo docker run -p 3002:3002 payment-app

## ! ############# Docker build for course ###########################

# # Base image
# FROM node:20-alpine AS builder

# # Set the working directory
# WORKDIR /app/course

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Copy .env file
# COPY .env ./

# # Install dependencies
# RUN npm install

# # Copy the entire project
# COPY . .

# # Build the NestJS application
# RUN npm run build

# # Production image
# FROM node:20-alpine

# # Set the working directory
# WORKDIR /app/course/dist/apps/course

# # Copy the built application from the builder image
# COPY --from=builder /app/course/dist/apps/course ./

# # Copy package.json and package-lock.json
# COPY --from=builder /app/course/package*.json ./

# # Copy .env file
# COPY --from=builder /app/course/.env ./

# # Install only production dependencies
# RUN npm install --production

# # Expose the port your NestJS application will run on
# EXPOSE 3004

# # Set environment variables
# CMD ["sh", "-c", "export $(cat /app/course/.env | xargs) && node main.js"]

# # sudo docker build -t course-app -f Dockerfile .
# # sudo docker run -p 3003:3003 course-app

## ! ############# Docker build for notifications ###########################

# # Base image
# FROM node:20-alpine AS builder

# # Set the working directory
# WORKDIR /app/notifications

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Copy .env file
# COPY .env ./

# # Install dependencies
# RUN npm install

# # Copy the entire project
# COPY . .

# # Build the NestJS application
# RUN npm run build

# # Production image
# FROM node:20-alpine

# # Set the working directory
# WORKDIR /app/notifications/dist/apps/notifications

# # Copy the built application from the builder image
# COPY --from=builder /app/notifications/dist/apps/notifications ./

# # Copy package.json and package-lock.json
# COPY --from=builder /app/notifications/package*.json ./

# # Copy .env file
# COPY --from=builder /app/notifications/.env ./

# # Install only production dependencies
# RUN npm install --production

# # Expose the port your NestJS application will run on
# EXPOSE 3004

# # Set environment variables
# CMD ["sh", "-c", "export $(cat /app/notifications/.env | xargs) && node main.js"]

# # sudo docker build -t notifications-app -f Dockerfile .
# # sudo docker run -p 3004:3004 notifications-app

