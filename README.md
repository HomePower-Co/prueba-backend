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

# Para desplegar en AWS usando ECS + RDS
1. Crear la base de datos PostgreSQL en RDS:
- Usa Amazon RDS para crear una base de datos PostgreSQL.
- Configura las credenciales y obtiene la URL de conexión (ejemplo: postgres://username:password@<rds-endpoint>:5432/mydb).
2. Ejecutar migraciones:
- Conéctate a la base de datos PostgreSQL usando la URL generada.
- Ejecuta las migraciones necesarias en la base de datos (por ejemplo, usando TypeORM o cualquier sistema de migración en tu API).
3. Crear y subir la imagen Docker de la API a Amazon ECR:
- Crea un Dockerfile para tu API.
- Construye la imagen y súbela a Amazon ECR (Elastic Container Registry).
4. Crear una Task Definition en ECS:
- Define una Task en ECS apuntando a la imagen Docker en ECR.
- Asocia el puerto 3001 (o el puerto que desees) para exponer la API.
5. Crear un servicio en ECS:
- Crea un servicio ECS que ejecute la Task.
- Asocia un Load Balancer si necesitas exponer la API a internet, y configura las - subredes y grupos de seguridad.

# Manejo de secretos con AWS Secrets Manager

AWS Secrets Manager es el servicio que utilizarías para almacenar y manejar secretos de manera segura, como las credenciales de acceso a la base de datos.

 1. Crear un secreto en AWS Secrets Manager
- Crear un secreto de manera manual en la consola de AWS, o utilizar la CLI de AWS

 2: Acceder al secreto desde ECS.
 - Una vez que tu secreto esté almacenado en Secrets Manager, puedes acceder a él desde tu contenedor ECS. Primero, asegúrate de que tu contenedor tenga permisos para acceder a Secrets Manager. Esto se hace asignando una política IAM adecuada al rol de ECS.

 Luego, en tu definición de tarea ECS, puedes configurar tu contenedor para que lea el secreto directamente desde AWS Secrets Manager. En tu aplicación, podrás acceder a las variables de entorno DB_USERNAME y DB_PASSWORD para conectar tu API a la base de datos RDS.