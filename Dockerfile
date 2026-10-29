# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

ENV NPM_CONFIG_LEGACY_PEER_DEPS=true

COPY package*.json .npmrc* ./

RUN npm install

COPY . .

RUN npm run build

# Production stage (Nginx para servir o SPA com suporte a roteamento)
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN printf 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
