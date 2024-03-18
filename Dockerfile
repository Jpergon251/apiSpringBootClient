# Usa una imagen base que contenga Node.js
FROM node:lts-alpine as build

RUN npm install -g http-server
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



# Expone el puerto 80 para que la aplicación esté accesible desde fuera del contenedor
EXPOSE 80

CMD ["http-server", "dist"]