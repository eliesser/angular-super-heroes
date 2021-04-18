# angular-super-heroes

[Angular super heroes](https://github.com/eliesser/angular-super-heroes) es una aplicación en angular configuranda con [docker](https://www.docker.io) usando como api mockup la librería [JSON Server](https://www.npmjs.com/package/json-server).

## Levantar servidor mockup

Una vez descargado el repo, debe instalar la librería [JSON Server](https://www.npmjs.com/package/json-server) de forma global, para poder realizarlo puede lanzar el siguiente comando: 

```bash
$ sudo npm install -g json-server
```

En la misma carpeta raíz debe lanzar este contacto levantar servidor mockup: 

```bash
$ json-server --watch db.json --port=3000
```

Estará online el api, para poder verificarla debe ir al siguiente enlace:

```
http://localhost:3000/
```

## Levantar contenedor docker

Para levantar el contenedor de angular, debe tener agregado nginx:alpine a docker

Para poder agregarlo puede usar este comando:

```bash
$ sudo docker pull nginx:alpine
```

En la raíz del repo ejecutar este comando para levantar el contenedor: 

```bash
$ sudo docker-compose up -d
```

Al finalizar de configurar el contenedor podrá ver la app en el siguiente enlace:

```
http://localhost:8080/
```
