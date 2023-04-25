FROM node:alpine
WORKDIR /app

# Copy this application's files from the current directory to the filesystem
# of the container at /app
COPY . /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
