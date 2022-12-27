FROM --platform=linux/amd64 node:alpine3.12
# Create an application directory
RUN mkdir -p /app
# The /app directory should act as the main application directory
WORKDIR /app
# Copy the app package and package-lock.json file
COPY . .

RUN rm -rf ./node_modules
# Install node packages
RUN npm install --force
EXPOSE 5001
# Start the app
CMD ["npm", "start"]