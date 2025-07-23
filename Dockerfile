FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Expose port (Railway will set this)
EXPOSE ${PORT:-3000}

# Start the app
CMD ["node", "server.js"]