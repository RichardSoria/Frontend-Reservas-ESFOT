FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Construir el frontend (Vite genera dist/)
RUN npm run build

# Instalar un servidor estático
RUN npm install -g serve

EXPOSE 5000

# Servir la app desde la carpeta dist
CMD ["serve", "-s", "dist", "-l", "5000"]
