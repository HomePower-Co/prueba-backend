# API de Productos en NestJS con Prisma y PostgreSQL

Este proyecto es una API RESTful construida con **NestJS** y **Prisma** que maneja operaciones CRUD para una entidad llamada **Producto**. La API permite realizar las siguientes operaciones sobre productos:

- Crear un producto.
- Obtener todos los productos.
- Obtener un producto por su ID.
- Actualizar un producto.
- Eliminar un producto.

## Tecnologías Utilizadas

- **NestJS**: Framework de Node.js para construir aplicaciones backend escalables y eficientes.
- **Prisma ORM**: ORM para interactuar con la base de datos PostgreSQL de forma sencilla y eficiente.
- **PostgreSQL**: Sistema de gestión de bases de datos relacionales.
- **Jest**: Framework de pruebas unitarias.
- **AWS (Opcional)**: Para desplegar la API en **ECS** y usar **RDS** para la base de datos. Se puede integrar con **AWS Secrets Manager** para manejar secretos de forma segura.
- **Docker** (Opcional): Para crear contenedores y facilitar el despliegue en la nube.

## Requisitos

- Node.js >= 14.x
- PostgreSQL instalado o acceso a una base de datos PostgreSQL
- AWS CLI (Opcional para despliegue en AWS)

## Instalación

1. Clona el repositorio:

 -  git clone https://github.com/tu-usuario/productos-api.git
 -  cd productos-api

2. Instala las dependencias del proyecto:

- npm install

3. Crea y configura el archivo .env en la raíz del proyecto. Debe contener la URL de conexión a tu base de datos PostgreSQL:

- DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos?schema=public"

4. Inicializa la base de datos con Prisma:

- npx prisma migrate dev --name init

5. Inicia el servidor:

- npm run start

La API estará disponible en http://localhost:3000.