FROM node:16.13.1-alpine
WORKDIR /user/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]