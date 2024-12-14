
FROM node:lts-slim


WORKDIR /app


COPY package*.json ./
COPY src ./src
COPY tests ./tests

RUN npm install 



EXPOSE ${APP_AUTH_PORT}


# Run the app by default
CMD ["npm", "start"]



