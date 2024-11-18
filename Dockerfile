# Step 1: Use the official Node.js image as the base image
FROM node:lts-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

ENV NODE_ENV=development

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
#RUN npm install --only=production
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the port your app will run on (default is 3000)
EXPOSE 3000


# Run the app by default
CMD ["npm", "run", "dev"]



