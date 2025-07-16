# Stage 1: Build 
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy Nginx configuration (optional, but good practice if you need custom config)
# Default Nginx config serves from /usr/share/nginx/html, which is what CRA builds into.
# If you had a custom Nginx config file, you'd copy it here:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Command to run Nginx (default command for nginx:stable-alpine)
CMD ["nginx", "-g", "daemon off;"]