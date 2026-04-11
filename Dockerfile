# Imagen base oficial de Node
FROM node:20

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de la app
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "src/app.js"]