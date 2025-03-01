# Use the official Node image
FROM node:22-alpine3.20

# Set the work dir in the container
WORKDIR /app

# Copy the project packagejason to the container work dir
COPY package*.json ./

# Copy all project code to the contair work dir
COPY . .

# Install all dependencies
RUN npm install

# Run build (generate js files for production)
RUN npm run build

# Generate prisma
RUN npx prisma generate

# Expose the container port
EXPOSE 3000

# Command to start the API in the container
CMD ["npm", "start"]
