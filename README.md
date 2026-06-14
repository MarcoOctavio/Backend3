# 🐾 Adoptme Backend API

API REST para la gestión de adopción de mascotas desarrollada con **Node.js**, **Express** y **MongoDB**.
El proyecto implementa buenas prácticas de arquitectura backend, documentación con Swagger, testing automatizado y despliegue mediante Docker.

Hecho por Marco Venegas

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

Los ejemplos de pruebas manuales con cURL están disponibles en:

```
src/docs/curl-examples.md
```

---

## 🧪 Testing

Ejecutar pruebas automatizadas:

```
npm test
```

La suite incluye pruebas específicas para `adoption.router.js`:

* creación de adopciones
* búsqueda/listado de adopciones
* búsqueda por ID
* rechazo de mascotas ya adoptadas
* error cuando el usuario no existe

El workflow de GitHub Actions ejecuta estos tests automáticamente en cada `push` y `pull_request` hacia `main` o `develop`.

---

## 🐳 Docker

El `Dockerfile` usa multi-stage build e inicia la aplicación con el usuario no root `node`.

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

GET    /api/adoptions
GET    /api/adoptions/:aid
POST   /api/adoptions/:uid/:pid

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
