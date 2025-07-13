FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Asegura un entorno limpio
RUN npm install

COPY . .

# Build de producción
RUN npm run build

# Instala servidor estático como serve
RUN npm install -g serve

# Expone el puerto por defecto de serve
EXPOSE 3000

# Sirve el frontend desde /build
CMD ["serve", "-s", "build", "-l", "3000"]
