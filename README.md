# 🐾 Adoptme Backend API

API REST para la gestión de adopción de mascotas desarrollada con **Node.js**, **Express** y **MongoDB**.
El proyecto implementa buenas prácticas de arquitectura backend, documentación con Swagger, testing automatizado y despliegue mediante Docker.

---

## 🚀 Tecnologías

* Node.js
* Express
* MongoDB / Mongoose
* Swagger
* Docker
* Mocha / Chai
* Winston
* Multer
* JWT

---

## ▶️ Ejecutar el proyecto

### 1. Instalar dependencias

```
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env`:

```
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/adoptme
JWT_SECRET=superSecretKey
```

### 3. Ejecutar servidor

```
npm start
```

Servidor disponible en:

```
http://localhost:8080
```

---

## 📚 Documentación Swagger

Disponible en:

```
http://localhost:8080/api/docs
```

---

## 🧪 Testing

Ejecutar pruebas automatizadas:

```
npm test
```

---

## 🐳 Docker

### Imagen Docker publicada

Puedes descargar y ejecutar la imagen desde Docker Hub:

```
https://hub.docker.com/repository/docker/marcoven/adoptme-backend/tags/2.0/sha256-cbb8ce8b02ca28213cbbd69b7ba07ebf5adcbb1da2fe1f42202f74face623598
```

### Ejecutar contenedor

```
docker pull marcoven/adoptme-backend:2.0
```

```
docker run -p 8080:8080 marcoven/adoptme-backend:2.0
```

---

## 📡 Endpoints principales

```
GET    /api/users
POST   /api/users

GET    /api/pets
POST   /api/pets

POST   /api/adoptions

POST   /api/sessions/login
POST   /api/sessions/register
```

---

## 🧱 Arquitectura

El proyecto sigue una arquitectura por capas:

```
Routes → Controllers → Services → DAO → Database
```

---

## 👨‍💻 Autor

Marco O. Venegas
Backend Developer
