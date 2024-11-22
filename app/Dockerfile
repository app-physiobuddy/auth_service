# Step 1: Use the official Node.js image as the base image
FROM node:lts-slim

# Step 2: Set the working directory inside the container
WORKDIR /app


# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./


# Step 4: Install dependencies
RUN npm install 

# Step 5: Copy the rest of the application code into the container
COPY . .

# Change ownership of files to a non-root user (optional but recommended)
RUN chown -R node:node /app

# Switch to a non-root user (optional)
USER node
# Step 6: Expose the port your app will run on (default is 3000)
EXPOSE 3000


# Run the app by default
CMD ["npm", "start"]



