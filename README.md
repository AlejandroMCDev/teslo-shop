# Descripcion

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del archivo del ```.env template``` y renombrarlo a ```.env``` y cambiar las variables de entorno
3. Instalar el proyecto ```npm install```
4. Levantar la bse de datos ```docker compose up -d```
5. Correr las migraciones de prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Correr el proyecto ```npm run dev```
8. Limpiar el LocalStorage del navegador 