# Prueba tecnica - Products Api

## Características

- Operaciones CRUD completas para un recurso.
- ORM Prisma para la gestión de la base de datos.
- Base de datos PostgreSQL en un contenedor Docker.
- Documentación interactiva de la API con Swagger.
- Validación de datos integrada.
- Migraciones de base de datos con Prisma.

## Pre-requisitos

- Node.js (v18 o superior)
- Docker y Docker Compose instalados
- npm o yarn

## Instalación

1. **Instalar dependencias**:

   ```bash
   npm i
   ```

2. **Configurar variables de entorno**:

   ```bash
   Genera un copia del archivo .env.template y renombrarlo a .env
   Por razones practicas no es necesario cambiar el valor de las vbles
   ```

3. **Crear la db usando el archivo docker-compose**:

   ```bash
   docker-compose up -d
   ```

4. **Ejecutar las migraciones**:

   ```bash
   npx prisma migrate dev
   ```

5. **Iniciar la aplicacion**:

   ```bash
   npm run start:dev
   ```

6. **Para ingresar a al documentacion del api**:

   ```bash
   http://localhost:3001/api
   ```

7. **Para ejecutar pruebas**:

   ```bash
   npm run test
   ```

## Para desplegar en AWS usando ECS + RDS

1. Crear la DB(postgresql) usando el servicio RDS.
2. Ejecutar la migracion usando la Url asignada en el paso anterior.
3. Crear imagen del api para subirla a Amazon ECR.
4. Luego en ECS se crea una Task la cual se le asigna la URI(la url de la imagen en el repositorio) generada en el paso anterior.
5. Se crea el servicio y se le asigna el puerto que queremos exponer (para nuestro caso el 3001).
