# angular-super-heroes

[Angular super heroes](https://github.com/eliesser/angular-super-heroes) es una aplicación en angular dockenizada con [docker](https://www.docker.io) y con mockup con [JSON Server](https://www.npmjs.com/package/json-server).

## Levantar servidor mockup

Una vez descargado el repo, debe instalar la libreria [JSON Server](https://www.npmjs.com/package/json-server), para poder realizarlo puede lanzar este comando: 

```bash
$ sudo npm install -g json-server
```

Una vez descargado el repo, en la misma carpeta raíz debe lanzar este contacto levantar servidor mockup: 

```bash
$ json-server --watch db.json --port=3000
```

Al finalizar de configurar debe estar online el api, puede verificarla en esta ruta:

```
http://localhost:3000/
```

## Levantar contenedor docker

Para levantar el contenedor de angular, debe tener agregado nginx:alpine a docker

Para poder instalarlo puede usar este comando:

```bash
$ sudo docker pull nginx:alpine
```

En la raíz del mismo y ejecutar este comando levanta el contenedor: 

```bash
$ sudo docker-compose up -d
```

Al finalizar de configurar el contenedor podrá ver la app en el siguiente enlace:

```
http://localhost:8080/
```
