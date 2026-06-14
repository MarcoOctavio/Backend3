# Ejemplos cURL - Adoptme API

Base URL local:

```bash
BASE_URL=http://localhost:8080
```

## Sessions

### Registrar usuario

```bash
curl -X POST "$BASE_URL/api/sessions/register" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "testuser@example.com",
    "age": 30,
    "password": "123456"
  }'
```

### Login

```bash
curl -X POST "$BASE_URL/api/sessions/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "123456"
  }'
```

## Pets

### Crear mascota

```bash
curl -X POST "$BASE_URL/api/pets" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Firulais",
    "specie": "Dog",
    "birthDate": "2020-01-01"
  }'
```

### Obtener mascotas

```bash
curl "$BASE_URL/api/pets"
```

## Adoptions

Reemplaza `USER_ID` y `PET_ID` por IDs reales generados previamente.

### Crear adopción

```bash
curl -X POST "$BASE_URL/api/adoptions/USER_ID/PET_ID"
```

### Obtener adopciones

```bash
curl "$BASE_URL/api/adoptions"
```

### Buscar adopción por ID

```bash
curl "$BASE_URL/api/adoptions/ADOPTION_ID"
```
