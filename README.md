# Adoptme Backend API

API REST para gestionar usuarios, mascotas y adopciones. El proyecto esta desarrollado con Node.js, Express y MongoDB, e incluye documentacion Swagger, tests funcionales con Mocha/Chai/Supertest y dockerizacion optimizada.

Autor: Marco O. Venegas

## Tecnologias

- Node.js 20
- Express
- MongoDB / Mongoose
- Swagger
- Docker
- Mocha / Chai / Supertest
- Winston
- Multer
- JWT

## Requisitos

- Node.js 20 o superior
- npm
- MongoDB disponible localmente o mediante una URI remota
- Docker Desktop o Docker Engine, solo si se ejecuta con contenedor

## Variables de entorno

Crear un archivo `.env` en la raiz del proyecto:

```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/adoptme
JWT_SECRET=superSecretKey
```

Cuando se ejecute desde Docker en macOS o Windows usando una base MongoDB local del host, usar:

```env
MONGO_URI=mongodb://host.docker.internal:27017/adoptme
```

## Instalacion local

```bash
npm install
```

## Ejecutar el proyecto localmente

```bash
npm start
```

Servidor disponible en:

```text
http://localhost:8080
```

Documentacion Swagger:

```text
http://localhost:8080/api/docs
```

## Ejecutar tests

```bash
npm test
```

La suite incluye tests funcionales para `adoption.router.js`:

- `POST /api/adoptions/:uid/:pid`: crea una adopcion correctamente.
- `GET /api/adoptions`: lista adopciones y permite verificar que existe la adopcion creada.
- `GET /api/adoptions/:aid`: obtiene una adopcion por ID.
- `POST /api/adoptions/:uid/:pid`: rechaza una mascota ya adoptada.
- `POST /api/adoptions/:uid/:pid`: retorna error 404 cuando el usuario no existe.

## Docker

El `Dockerfile` usa multi-stage build:

- `node:20-alpine` como imagen base liviana.
- Una etapa `dependencies` instala dependencias con `npm ci --omit=dev`.
- La etapa `runner` copia solo `node_modules`, `package*.json` y `src`.
- `NODE_ENV=production` queda definido en runtime.
- El contenedor ejecuta la app con el usuario no root `node`.
- `.dockerignore` excluye `node_modules`, logs de npm, `.git` y `.gitignore` del contexto de build.

## Construir imagen Docker

```bash
docker build -t marcoven/adoptme-backend:2.0 .
```

## Ejecutar contenedor

```bash
docker run --name adoptme-backend \
  -p 8080:8080 \
  -e PORT=8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme \
  -e JWT_SECRET=superSecretKey \
  marcoven/adoptme-backend:2.0
```

Si MongoDB corre en otro host, reemplazar `MONGO_URI` por la URI correspondiente.

## Imagen Docker

Nombre y tag local:

```text
marcoven/adoptme-backend:2.0
```

Imagen publicada en Docker Hub:

```text
marcoven/adoptme-backend:2.0
```

Referencia compartida:

```text
https://hub.docker.com/repository/docker/marcoven/adoptme-backend/tags/2.0/sha256-cbb8ce8b02ca28213cbbd69b7ba07ebf5adcbb1da2fe1f42202f74face623598
```

## Endpoints principales

```text
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

## Estructura general

```text
Routes -> Controllers -> Services -> Repository -> DAO -> Models -> Database
```

Carpetas principales:

- `src/app.js`: configura Express, middlewares, Swagger, conexion a MongoDB y routers.
- `src/routes`: define endpoints HTTP por modulo.
- `src/controllers`: maneja request/response y coordina servicios.
- `src/services`: contiene logica de negocio.
- `src/repository`: abstrae operaciones de persistencia.
- `src/dao`: acceso a datos y modelos Mongoose.
- `src/docs`: especificaciones Swagger y ejemplos.
- `src/middlewares`: logger y manejo centralizado de errores.
- `test`: tests funcionales con Mocha, Chai y Supertest.
- `public`: destino de archivos subidos.
