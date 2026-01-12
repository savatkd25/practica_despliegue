# Dockerfile
FROM node:16

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos al contenedor
COPY package*.json ./
COPY index.js .

# Instalar dependencias
RUN npm install

#Copiar el resto de los archivos de la aplicación
COPY users.json .

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]