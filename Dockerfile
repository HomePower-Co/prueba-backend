FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main"]

# Describe cómo desplegarías esta API en AWS ECS + RDS: 
    # 1) Se debe ingresar a la herramienta cloud: https://signin.aws.amazon.com/
    # 2) Crea un clúster en el modulo de ECS.
    # 3) Se define una tarea ECS con la imagen de Docker: node:18.
    # 4) Configuramos un servicio en ECS que use la tarea anteriormente creada.
    # 5) Usa AWS RDS para PostgreSQL y conéctalo a la API.
    # 6) Almacena las credenciales en AWS Secrets Manager.

# Explica brevemente cómo manejarías secretos con AWS Secrets Manager.
    # En la consola de AWS secret manager se debe crear una nueva llave y almancenar las credenciales de la bd como formato json
    # Configura accesos en IAM
    # Instala el SDK
    # Ajusta el config.service.ts