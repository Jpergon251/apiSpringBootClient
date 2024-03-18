# Usa una imagen base que contenga Node.js
FROM node:lts AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (o yarn.lock si usas Yarn)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todos los archivos del proyecto al directorio de trabajo dentro del contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Configura un servidor HTTP para servir la aplicación
FROM nginx:alpine

# Copia los archivos estáticos generados en la etapa de construcción anterior al directorio de trabajo del servidor HTTP de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para que la aplicación esté accesible desde fuera del contenedor
EXPOSE 80

# CMD por defecto del contenedor Nginx, no necesitas cambiarlo a menos que desees personalizar la configuración del servidor
CMD ["nginx", "-g", "daemon off;"]
