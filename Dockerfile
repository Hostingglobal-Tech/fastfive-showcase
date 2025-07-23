FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Expose port (Railway will set this)
EXPOSE ${PORT:-3000}

# Start the app
CMD ["node", "server.mjs"]