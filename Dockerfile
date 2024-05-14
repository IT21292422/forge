## ! Error solutions ##################################

##* if node:20-alpine Error comes use this
## docker pull node:20-alpine

##* if need to Clear Docker Cache
## docker builder prune --all --force

##* Create network
# docker network create my-network
# sudo docker network connect my-network forge-forge-1
# sudo docker network disconnect my-network forge-forge-1

##* Inspect network
# docker network inspect my-network
# sudo docker network ls

## ! ############# Docker build for forge ###########################
# # Base image
# FROM node:20-alpine AS builder

# # Set the working directory
# WORKDIR /app/forge

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
# WORKDIR /app/forge/dist/apps/forge

# # Copy the built application from the builder image
# COPY --from=builder /app/forge/dist/apps/forge ./

# # Copy package.json and package-lock.json
# COPY --from=builder /app/forge/package*.json ./

# # Copy .env file
# COPY --from=builder /app/forge/.env ./

# # Install only production dependencies
# RUN npm install --production

# # Expose the port your NestJS application will run on
# EXPOSE 3000

# # Set environment variables
# CMD ["sh", "-c", "export $(cat /app/forge/.env | xargs) && node main.js"]

# # sudo docker build -t forge-app -f Dockerfile .
# # sudo docker run -p 3000:3000 forge-app

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

## ! ########## common docker file ##############

# FROM node:20-alpine AS base 

# # development stage
# FROM base AS development 
# ARG APP 
# ARG NODE_ENV=development 
# ENV NODE_ENV=${NODE_ENV}
# ENV ATLAS_URI={ATLAS_URI}
# WORKDIR /usr/src/app 
# COPY package.json ./ 
# RUN npm install
# COPY . . 
# RUN npm run build ${APP} 

# # production stage
# FROM base AS production 
# ARG APP 
# ARG NODE_ENV=production 
# ENV NODE_ENV=${NODE_ENV} 
# WORKDIR /usr/src/app 
# COPY package.json ./ 
# RUN npm install --prod
# COPY --from=development /usr/src/app/dist ./dist 
 
# # Add an env to save ARG
# ENV APP_MAIN_FILE=dist/apps/${APP}/main 
# CMD node ${APP_MAIN_FILE}

## ! ############# Docker common build ###########################

# Base image
FROM node:20-alpine AS builder

# Set args
ARG APP
# Set the working directory
WORKDIR /app/${APP}

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

ARG APP
ARG EXE_PORT

# Set the working directory
WORKDIR /app/${APP}/dist/apps/${APP}

# Copy the built application from the builder image
COPY --from=builder /app/${APP}/dist/apps/${APP} ./

# Copy package.json and package-lock.json
COPY --from=builder /app/${APP}/package*.json ./

# Copy .env file
COPY --from=builder /app/${APP}/.env ./

# Install only production dependencies
RUN npm install --production

EXPOSE ${EXE_PORT}

ENV APP_MAIN_FILE=dist/apps/${APP}/main 
CMD node ${APP_MAIN_FILE}

# # Expose the port your NestJS application will run on
# # Set environment variables
# CMD ["sh", "-c", "export $(cat /app/course/.env | xargs) && node main.js"]

# sudo docker build -t course-app -f Dockerfile .
# sudo docker run -p 3003:3003 course-app


#################################

# sudo docker run --env-file .env -p 3005:3005 forge
# sudo docker run --env-file .env -p 3004:3004 course

# sudo docker run -it --rm --env-file .env -p 3005:3005 --name forge forge
# sudo docker run -it --rm --env-file .env -p 3004:3004 --name course course

# sudo docker run --env-file .env -p 3004:3004 course

# sudo docker run --env-file .env -p 3005:3005 forge
# sudo docker run --env-file .env -p 3005:3005 forgesudo docker network inspect my-network

