FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy over the json package files 
COPY package*.json ./

# Install required libraries
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# Run application 
CMD [ "npm", "start" ]