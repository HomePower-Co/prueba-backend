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

Para desplegar en AWS usando ECS + RDS

Crear la DB(postgresql) usando el servicio RDS.
Ejecutar la migracion usando la Url asignada en el paso anterior.
Crear imagen del api para subirla a Amazon ECR.
Luego en ECS se crea una Task la cual se le asigna la url de la imagen en el repositorio generada en el paso anterior.
Se crea el servicio y se le asigna el puerto que queremos exponer.
Secrets Manager almacena las credenciales de la base de datos de forma segura.
Terraform se utiliza para definir la infraestructura (ECS, RDS y Secrets Manager).
En el GitHub Actions Workflow, se ejecuta Terraform para crear la infraestructura y desplegar la API en AWS ECS.
AWS RDS proporciona la base de datos, y la API se conecta a ella usando credenciales almacenadas en Secrets Manager.
Este flujo configura todo el entorno de ECS y RDS en AWS de manera automatizada y segura usando Terraform y GitHub Actions.
