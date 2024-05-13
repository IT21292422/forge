FROM node:20-alpine AS development
WORKDIR /src/app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
CMD [ "nest" , "build" , "payment" ]
FROM node:20-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY --from=development /src/app/dist ./dist
EXPOSE 3002
CMD ["node", "dist/apps/payment/main"]

# sudo docker build -f apps/payment/Dockerfile -t payment .