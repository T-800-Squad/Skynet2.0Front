# Skynet2.0 - Frontend

Interfaz web del sistema de reservas de laboratorios universitarios, desarrollada en React. Se comunica con el backend a través de una API REST y gestiona dos tipos de usuarios con vistas diferenciadas según su rol.

## Tecnologías

- **React** — Biblioteca principal para la construcción de la interfaz
- **Create React App** — Configuración inicial del proyecto
- **Axios** — Cliente HTTP para la comunicación con la API REST

## Funcionalidades

### Usuario básico
- Inicio de sesión con autenticación JWT
- Consulta de laboratorios disponibles
- Creación, edición y cancelación de sus propias reservas
- Visualización del historial de reservas

### Administrador
- Gestión completa de reservas de todos los usuarios
- Administración de usuarios (creación, edición, eliminación)
- Administración de laboratorios (creación, edición, eliminación)

## Requisitos previos

- Node.js instalado
- Backend de Skynet2.0 en ejecución ([ver repositorio backend](enlace-al-repo-backend))

## Instalación y ejecución
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Scripts disponibles

| Comando | Descripción |
|--------|-------------|
| `npm start` | Ejecuta la app en modo desarrollo |
| `npm run build` | Genera la build de producción en `/build` |
