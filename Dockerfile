# Usa una imagen base que contenga Node.js
FROM node:14-alpine as build

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

# Stage final
FROM nginx:alpine

# Copia los archivos estáticos construidos en la etapa anterior al directorio de HTML del servidor web Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para que la aplicación esté accesible desde fuera del contenedor
EXPOSE 80

# El comando para iniciar Nginx cuando se ejecute el contenedor
CMD ["nginx", "-g", "daemon off;"]