# 📝 Prueba Técnica - Desarrollador Backend Semi-Senior

## ⚠️ Antes de comenzar

Por favor, **lee toda la prueba completa antes de empezar**. El tiempo estimado para completarla es de **2-3 horas**, pero puedes tomar hasta **24 horas** para entregarla. La entrega se realiza a través de un **Pull Request (PR)** en este repositorio.

## 🔥 Instrucciones Generales

1. **Haz un fork** de este repositorio en tu cuenta de GitHub. ✅
2. Crea una nueva rama con tu nombre o un identificador único: ✅
   ```bash
   git checkout -b tu-nombre
   ```
3. Desarrolla tu solución en la rama creada. ✅
4. Una vez finalizado, sube tus cambios a tu repositorio y abre un **Pull Request (PR)** hacia este repositorio. ✅
5. **Asegúrate de incluir una breve descripción en el PR** explicando tu enfoque y decisiones técnicas. ✅
6. Puedes usar **IA o cualquier recurso** que consideres necesario, pero ten en cuenta que podrías ser requerido para sustentar tu solución. ✅

## 📌 Requerimientos

### 1️⃣ Implementación de API en NestJS ✅

- Crea un servicio en **NestJS** que exponga endpoints para manejar entidades en **PostgreSQL** usando el ORM de tu preferencia (TypeORM o Prisma). ✅
- Debe incluir CRUD para una entidad llamada `Productos` con los siguientes campos: ✅
  - `id` (UUID, PK)
  - `nombre` (string)
  - `precio` (decimal)
  - `stock` (entero)

### 2️⃣ Seguridad y Buenas Prácticas ✅

- Implementa **validaciones** con DTOs en los endpoints. ✅
- Manejo adecuado de **excepciones**. ✅
- Configuración de variables de entorno con `.env`. ✅

### 3️⃣ Pruebas Unitarias ✅

- Escribe pruebas unitarias para al menos un servicio usando **Jest**. ✅

### 4️⃣ Conocimientos en AWS (Opcional, suma puntos)✅

- Describe cómo desplegarías esta API en **AWS ECS + RDS**.✅
- Explica brevemente cómo manejarías secretos con **AWS Secrets Manager**.✅
- Opcionalmente, agrega un pequeño **Terraform** para crear el RDS.✅

### 5️⃣ CI/CD con GitHub Actions y Terraform (Opcional, suma puntos)✅

- Crea un workflow en **GitHub Actions** para ejecutar pruebas automáticamente en cada `push` o `PR`.✅
- Opcionalmente, agrega un paso en el pipeline para desplegar la API en AWS usando **Terraform**.✅

## ⏳ Tiempo Estimado

Queremos que tengas el tiempo suficiente para hacerlo bien, pero sin presionarte demasiado. Lo ideal es que puedas completarlo en unas **2-3 horas**, pero puedes tomar hasta **24 horas** para entregarlo.

## 📬 Entrega

- Haz un **Pull Request** con tu código.
- Asegúrate de que los endpoints sean funcionales.
- Si tienes comentarios o explicaciones, agrégalas en el `README.md` de tu fork.

---

¡Buena suerte y esperamos ver tu solución! 🚀

# Sección Candidato

## Especificaciones tecnicas: Nestjs, TypeORM, Postgres, Docker, Terraform, aws.

## Para levantar el proyecto: 
  ### npm run start:dev
  ### Para ejecutar las pruebas: npm test
  ### Para ejecutar Docker: docker run
  ### Para desplegar con GitHub actions:
    * Haz un commit y push en la rama main. Esto ejecutará automáticamente el workflow de GitHub Actions.

    git add .
    git commit -m "Pruebas y despliegue CI/CD"
    git push origin main
    El workflow:

    Ejecutará las pruebas (npm test).
    Si todo está bien, aplicará los cambios de Terraform y desplegará el RDS en AWS (Solo si es necesario por el consumo).

## Resultado de pruebas dentro del json están los resultados: ColeccionCards.postman_collection.json

## Describe cómo desplegarías esta API en AWS ECS + RDS: 
    # 1) Se debe ingresar a la herramienta cloud: https://signin.aws.amazon.com/
    # 2) Crea un clúster en el modulo de ECS.
    # 3) Se define una tarea ECS con la imagen de Docker: node:18.
    # 4) Configuramos un servicio en ECS que use la tarea anteriormente creada.
    # 5) Usa AWS RDS para PostgreSQL y conéctalo a la API.
    # 6) Almacena las credenciales en AWS Secrets Manager.

## Explica brevemente cómo manejarías secretos con AWS Secrets Manager.
    # En la consola de AWS secret manager se debe crear una nueva llave y almancenar las credenciales de la bd como formato json
    # Configura accesos en IAM
    # Instala el SDK
    # Ajusta el config.service.ts
