# ---- CТАДИЯ BUILD ---------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci                     # только prod‑зависимости

COPY . .
RUN npm run build              # создаст dist/

# ---- CТАДИЯ RUNTIME (Nginx) -----------------------------------------
FROM nginx:alpine
# выключаем дефолтный конфиг и подменяем своим с History API fallback
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# копируем статический билд
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

