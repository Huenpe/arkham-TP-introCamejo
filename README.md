Iniciar BACKEND

1) Ir a la carpeta backend 
2) crear un archivo .env 
3) añadir una cadena de conexion (guiarse con el ejemplo en del archivo example.env)

Debe guiarse por el compose.yml para obtener: usuario, contraseña, database y puerto
Ejemplo de como deberia quedar:
DATABASE_URL="postgresql://manolo:manolo1234@localhost:8888/supermanolo"

4) salir de la carpeta backend y ejecutar el script

5) correr el script init.sh con:
bash init.sh


-------------------------------------------------------------------------------------------------------------------------------------

(opcional) ACCEDER AL CONTENEDOR DE MANERA LOCAL CON:

1)
docker exec -it database /bin/bash

2)
psql -U batman -d arkham_asylum 



-------------------------------------------------------------------------------------------------------------------------------------
TIPS PARA PRISMA

-)PARA FORMATEAR EL CODIGO DE schema.prisma
npx prisma format 

-)IMPORTAR PRISMA A MI APP.
-CADA VEZ QUE SE MODIFIQUE EL SCHEMA.PRISMA HAY QUE MANDAR LAS MIGRACIONES
(recordar que hay que tiene que estar iniciado con docker compose up -d)
-esto se hace con:
npx prisma migrate dev --name "nombre de la migracion"