# Development stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY pidrobitok-front/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY pidrobitok-front/ ./

# Expose port 5173 (Vite's default dev server port)
EXPOSE 5173

# Start development server with host 0.0.0.0 to allow external connections
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]