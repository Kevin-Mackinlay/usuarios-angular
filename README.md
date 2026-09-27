# Aplicación de gestión de usuarios y autos

Proyecto desarrollado con Angular y TypeScript para gestionar usuarios y vehículos mediante operaciones CRUD.

La aplicación comenzó utilizando la API pública JSONPlaceholder y posteriormente fue migrada a Firebase Firestore para almacenar los cambios de forma permanente.

## Funcionalidades

### Usuarios

- Listado de usuarios.
- Vista de detalle de cada usuario.
- Creación de nuevos usuarios.
- Edición de usuarios existentes.
- Eliminación con diálogo de confirmación.
- Validación de nombre, email y teléfono.
- Estados de carga, éxito y error.
- Botón para reintentar una consulta.
- Persistencia de datos en Firebase Firestore.

### Autos

- Listado de vehículos.
- Vista de detalle de cada vehículo.
- Creación de nuevos vehículos.
- Edición de vehículos existentes.
- Eliminación con diálogo de confirmación.
- Actualización automática de la lista mediante Firestore.
- Validación de marca, modelo, año, patente y color.
- Mensajes de confirmación y error.
- Persistencia de datos en Firebase Firestore.

### Características generales

- Navegación mediante Angular Router.
- Componentes standalone.
- Formularios reactivos con Reactive Forms.
- Servicios inyectados para centralizar el acceso a los datos.
- Manejo de información asincrónica con RxJS y Observables.
- Uso de `async pipe`.
- Uso de `switchMap` para parámetros de rutas y consultas.
- Estados de carga, éxito y error.
- Diálogo de confirmación reutilizable.
- Validaciones y mensajes para el usuario.

## Tecnologías utilizadas

- Angular
- TypeScript
- RxJS
- Firebase
- Cloud Firestore
- Reactive Forms
- Angular Router
- HTML
- CSS
- Vitest

## Base de datos

Los usuarios y autos se almacenan en Firebase Firestore.

La aplicación utiliza dos colecciones principales:

- `usuarios`
- `autos`

Las operaciones disponibles son:

- Crear documentos.
- Obtener listados.
- Obtener documentos por ID.
- Actualizar documentos.
- Eliminar documentos.

## Rutas

### Usuarios

| Ruta | Función |
| --- | --- |
| `/usuarios` | Listado de usuarios |
| `/usuarios/nuevo` | Crear un usuario |
| `/usuarios/:id` | Ver el detalle de un usuario |
| `/usuarios/:id/editar` | Editar un usuario |

### Autos

| Ruta | Función |
| --- | --- |
| `/autos` | Listado de autos |
| `/autos/nuevo` | Crear un auto |
| `/autos/:id` | Ver el detalle de un auto |
| `/autos/:id/editar` | Editar un auto |

## Ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Kevin-Mackinlay/usuarios-angular.git
```

### 2. Entrar en la carpeta

```bash
cd usuarios-angular
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar la aplicación

```bash
ng serve
```

### 5. Abrir en el navegador

```text
http://localhost:4200
```

## Compilación de producción

Para generar la versión de producción:

```bash
ng build
```

Los archivos generados se guardarán en:

```text
dist/usuarios-angular
```

## Pruebas

Para ejecutar las pruebas una sola vez:

```bash
ng test --watch=false
```

Estado actual:

```text
Test Files: 9 passed
Tests: 14 passed
```

## Estado del proyecto

- CRUD de usuarios completo.
- CRUD de autos completo.
- Integración con Firebase Firestore.
- Formularios y validaciones funcionando.
- Rutas de listado, detalle, creación y edición funcionando.
- Eliminación con confirmación.
- Compilación de producción completada.
- Pruebas automatizadas aprobadas.

## Autor

Kevin Mackinlay
