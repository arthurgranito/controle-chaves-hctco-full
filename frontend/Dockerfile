# frontend/Dockerfile

FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine

# Remove o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos buildados do Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
