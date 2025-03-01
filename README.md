# 📝 Prueba Técnica - Desarrollador Backend Semi-Senior


## Sobre el proyecto desarrollado

La prueba se realizó en su totalidad, estas son algunas anotaciones extras y comentarios:
- Se añadieron dos campos a la base de datos: createdAt y updatedAt, que suelen estar para llevar un registro histórico de cuando se creó y actualizó un producto.
- El proyecto se desarolló totalmente en inglés (código, variables, comentarios, etc), ya que es un lenguaje universal, y es más cómodo a la hora de trabajar desarrollar.
- Se incluye un archivo .env.template, en el cual se añade la URI para la base de datos, sea local, o mediante docker-compose.
- Se incluye una sola forma de habilitar db para iniciar el proyecto localmente, que es mediante Docker (Se recomienda usar el docker-compose para inicializar todo el proyecto). De lo contrario, se debe usar una instalación de PostgresSQL local.
- Se realizó un workflow con Github Actions para realizar las pruebas unitarias una vez se crea un pull request o se envían cambios a la rama main.

## Instalación de PostgresSQL usando Docker

Si se desea, se puede iniciar únicamente un contenedor con la imagen de PostgresSQl, en caso de no querer usar el docker-compose conjunto, usando el siguiente comando:
    ```bash
    docker-compose -f docker-compose-only-db.yml up -d
    ```

## Instalación y ejecución del proyecto (Usando Docker) | 🔥 Recomendado

⚠️ Se requiere tener **Docker Destop** instalado, abierto y funcionando.

1. Clonar el repositorio.
2. Abrir una terminal o IDE preferido.
4. Crear el archivo ``.env`` y copiar el contenido de ``.env.template`` allí. También se puede cambiar el nombre de ``.env.template`` a ``.env`` directamente.
3. Ejecutar en la terminal el siguiente comando:
    ```bash
    docker-compose up -d --build
    ```
4. Ejecutar las migraciones de prisma directamente en el contenedor (Esto creará la estructura de la base de datos):
    ```bash
    docker exec -it homepower-prueba-api npx prisma migrate deploy
    ```
5. Una vez se descarguen las imágenes, y se cree la imagen del proyecto, ya se puede utiliar la API. Se puede acceder a través de este enlace (siempre y cuando no se haya modficiado la variable de entorno PORT):
    ```bash
    http://localhost:3000/api
    ```

Para crear un nuevo producto, envía una solicitud `POST` con la estructura del siguiente ejemplo:

```json
{
  "name": "Nombre del producto",
  "price": 20.0000,
  "stock": 1
}

Si ya se finalizaron las pruebas de la API, se puede eliminar el contenedor y los volúmenes usando el comando ``docker-compose down -v``.


## Instalación y ejecución del proyecto (Sin Docker)

⚠️ Se requiere tener **PosgresSQL** instalado.

1. Clonar el repositorio.
2. Abrir una terminal o IDE preferido.
3. Crear el archivo ``.env`` y copiar el contenido de ``.env.template`` allí. También se puede cambiar el nombre de ``.env.template`` a ``.env`` directamente.
4. Instalar las dependencias del proyecto:
    ```bash
    npm install
    ```

5. Ejecutar el proyecto en modo desarrollo.
    ```bash
    npm run start:dev
    ```
6. Si se desea, se puede construir los archivos .js usando ``npm run build``, simulando un "despliegue a producción".

7. Una vez realizados los pasos anteriores, ya se puede utiliar la API. Se puede acceder a través de este enlace (siempre y cuando no se haya modficiado la variable de entorno PORT):
    ```bash
    http://localhost:3000/api
    ```

## ¿Cómo desplegaría esta API con mis conocimientos?

De la mano de mis conocimientos actuales, soy capaz de desplegar una API (o sitios web) en un servidor Linux (En AWS, EC2, en Google Cloud, Compute Engine/Virtual Machine) usando Docker o pm2 + el servidor web/proxy nginx. Daré un paso a paso resumido en este caso.

- Primeramente debemos tener instanciado el servidor linux (Preferiblemente Ubuntu o Debian), e instalar Docker Engine y nginx. (También se puede iniciar con una imagen de nginx desde Docker).
- Lo único que debe hacerse es descargar es clonar el repositorio y crear usar el docker-compose para crear las imágenes e iniciar los contenedores.
- Se puede usar la opción de pm2, que requiere la instalación global (npm i -g pm2), y este permite mantener la API iniciada en segundo plano. Se puede habilitar que en caso de alguna caída del servidor, se vuelva a iniciar una vez se restablezca, igual que en Docker.
- Una vez realizado el procedimiento de iniciar los contenedores, debemos crear la configuración de nginx para que sirva el puerto 3000 como "sitio web", actuando como un proxy. Nos permite mostrar el puerto 3000 directamente en un DNS como apipruebatecnica.homepower.com, por ejemplo. En mi caso, uso Certbox para generar certificados SSL para los proyectos.
- Cuando usamos nginx no es necesario exponer los puertos de las API (u otros proyectos) para que sea accesible en internet.

# Ventajas y desventajas de este tipo de despliegue
- La mayor ventaja de este tipo de despliegue es que se tiene control de absolutamente todo el servidor.
- La mayor desventaja es la escalabilidad, en proveedores que venden solo un servidor con cierto hardware, nos permite ir hasta el límite (o casi) de ese hardware, y no más. Si se lleva al máximo de capacidad, no se podrá escalar fácilmente. Se tendrá que usar un balanceador de carga, o migrar a soluciones Cloud, como es el caso de AWS, que puede mejorar recursos o crear más instancias automáticamente (y balancear carga) a medida del uso de los sistemas.

## ¿Cómo desplegaría esta API en AWS? (Basado en investigación)

Debo decir que nunca había usado AWS ECS ni RDS, sin embargo, un poco de investigación me ayudó a obtener información y obtener un aprendizaje. Realicé el procedimiento usando la capa gratuita de AWS.

- Lo primero es crear un repositorio de ECR (Elastic Container Registry) para poder subir la imagen de Docker, crucial para poder desplegar en ECS.
- También debemos crear la base de datos en RDS, este procedimiento es muy sencillo. Allí había una opción para usar AWS Secrets Manager para las credenciales de la base de datos. (Que es un servicio de almacenamiento de credenciales. La función más importante que encontré es la rotación automática de credenciales que permite cambiar periódicamente las credenciales de servicios como bases de datos sin interrumpir el acceso a las aplicaciones que las usan.)
- Posteriormente debemos definir una tarea para poder ejecutar el contenedor. Aquí definimos las variables de entorno que usará el contenedor. Debe incluirse el acceso a la base de datos. (No descubrí aún cómo se puede integrar AWS Secrets Manager en este caso)
- Ahora debemos crear un cluster en ECS.
- Una vez creado el Cluster, debemos crear un servicio basado en la tarea creada previamente. 

Este es el paso a paso resumido de la investigación y las pruebas que realicé con la capa gratuita de AWS, hay algunas configuraciones extras como mapeo de puertos, redes, etc, que deben ser tenidas en cuenta para un correcto funcionamiento.


---

Con esto finalizo el README.md del repositorio, ¡muchas gracias!

Juan Fernando Cataño Posada.