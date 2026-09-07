# Aplicación de usuarios

Mini proyecto desarrollado con Angular que consume usuarios desde la API pública JSONPlaceholder.

## Funcionalidades

- Listado de usuarios.
- Vista de detalle de cada usuario.
- Navegación mediante rutas de Angular.
- Consumo de una API con HttpClient.
- Servicio inyectado para manejar las peticiones.
- Manejo de datos con Observables y async pipe.
- Formulario con Reactive Forms.
- Validaciones de nombre y email.
- Mensajes de validación y confirmación de envío.

## Tecnologías utilizadas

- Angular
- TypeScript
- RxJS
- HTML
- CSS
- JSONPlaceholder

## Rutas

- `/usuarios`: listado de usuarios.
- `/usuarios/:id`: detalle de un usuario.
- `/usuarios/nuevo`: formulario para agregar un usuario.

## Ejecutar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/Kevin-Mackinlay/usuarios-angular.git
```

Entrar en la carpeta:

```bash
cd usuarios-angular
```

Instalar las dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200
```

## Comprobación de producción

```bash
ng build
```

## Autor

Kevin Mackinlay
