# Daliah Banda CMS Backend

Este es el backend CMS personalizado para la página web de **Daliah Banda** (daliahbanda.com). Es un sistema de gestión de contenido (CMS) construido con Node.js, Express, Handlebars y React integrado, diseñado para manejar assets, contenido dinámico y más. Incluye integraciones avanzadas con Vercel para redeploys automáticos del frontend, Cloudflare R2 para almacenamiento y gestión de assets, Firestore como base de datos principal, y un sistema de archivos JSON para caché rápido de datos, evitando consultas innecesarias a la base de datos en cada petición.

Este proyecto es una evolución del template Handlebars + React SSR, adaptado específicamente para las necesidades de mi sitio web. El frontend es un Next.js serverless que consume este backend.

## Características

- **Server-Side Rendering (SSR)**: Las páginas se renderizan en el servidor usando templates Handlebars para una primera carga más rápida.
- **Integración con React**: Componentes React se cargan y opcionalmente hidratan en el navegador desde las vistas Handlebars.
- **Bundling con Webpack**: Puntos de entrada de React y imports dinámicos se empaquetan con Webpack 5.
- **Estilos con SASS**: Archivos SCSS modulares se compilan en un solo output CSS.
- **Autenticación y Sesiones**: Autenticación basada en sesiones con rutas protegidas y flujo de login/logout.
- **Dashboard CMS**: Un panel de administración estilo CMS creado con Handlebars y React integrado para gestionar contenido fácilmente.
- **Integración con Vercel**: Solicita redeploys automáticos del frontend Next.js cuando se actualiza contenido.
- **Cloudflare R2**: Sube assets, recupera enlaces y metadata para optimizar el almacenamiento.
- **Firestore como DB**: Almacena información principal en Firestore para escalabilidad.
- **Caché con JSON**: Crea archivos JSON en el sistema de archivos para acceso rápido, reduciendo consultas a la DB.
- **Integración con Kick API**: Maneja webhooks, eventos y suscripciones para funcionalidades en vivo.
- **Herramientas de Desarrollo**: Modo watch para cambios en JavaScript, CSS y servidor en desarrollo.
- **Arquitectura Modular**: Separación limpia de rutas, vistas, componentes, middlewares y utilidades.

## Tecnologías Usadas

- **Backend**: Node.js, Express.js
- **Templating**: Handlebars (express-handlebars)
- **Frontend**: React 19, React DOM
- **Build Tools**: Webpack 5, Babel
- **Estilos**: SASS/SCSS
- **Autenticación**: `express-session`, `argon2` para hashing de contraseñas
- **Base de Datos**: Firebase Firestore
- **Almacenamiento**: Cloudflare R2
- **Servicios**: Kick API para webhooks y eventos
- **Desarrollo**: `concurrently`, modo watch de Node.js

## Estructura del Proyecto

```
├── src/
│   ├── config/                 # Configuraciones y helpers
│   │   ├── firebase.js         # Configuración de Firebase
│   │   ├── handlebarsHelpers.js # Helpers para Handlebars
│   │   └── sessionConfig.js    # Configuración de sesiones
│   ├── db/                     # Manejo de bases de datos
│   │   ├── fileSystem/         # Sistema de archivos para caché JSON
│   │   │   └── eraseSessions.js
│   │   └── firestore/          # Integración con Firestore
│   │       ├── auth.js
│   │       ├── liveStatus.js
│   │       └── temporalGeneral.js
│   ├── middlewares/            # Middlewares de Express
│   │   ├── auth.js             # Autenticación
│   │   ├── kickWebhook.js      # Webhooks de Kick
│   │   └── rateLimiters.js     # Limitadores de tasa
│   ├── react/                  # Entrada de React, mapa de componentes y componentes
│   │   ├── componentMap.js
│   │   ├── index.jsx
│   │   └── components/
│   │       ├── App.jsx
│   │       ├── NavDropdown.jsx
│   │       └── Test2.jsx
│   ├── routes/                 # Rutas de Express
│   │   ├── api.routes.js       # Rutas de API
│   │   ├── auth.routes.js      # Rutas de autenticación
│   │   ├── views.routes.js     # Rutas de vistas
│   │   └── webhook.routes.js   # Rutas de webhooks
│   ├── sass/                   # Hojas de estilo SCSS
│   │   ├── index.scss
│   │   └── [partials].scss     # _base.scss, _buttons.scss, etc.
│   ├── services/               # Servicios externos
│   │   ├── auth/               # Servicios de autenticación
│   │   │   ├── hashing.js
│   │   │   └── validation.js
│   │   ├── kick/               # Servicios de Kick API
│   │   │   ├── auth.js
│   │   │   ├── eventHandlers.js
│   │   │   ├── subscriptionManager.js
│   │   │   └── tokenManager.js
│   │   └── r2Bucket/           # Servicios de Cloudflare R2
│   ├── util/                   # Utilidades
│   │   ├── dirname.js
│   │   └── pkceManager.js      # Manejo de PKCE para OAuth
│   └── views/                  # Templates de Handlebars
│       ├── index.handlebars
│       ├── login.handlebars
│       ├── protected.handlebars
│       ├── test1.handlebars
│       ├── test2.handlebars
│       ├── layouts/
│       │   ├── auth.handlebars
│       │   └── main.handlebars
│       └── partials/
│           ├── data.handlebars
│           ├── footer.handlebars
│           └── header.handlebars
├── localData/                  # Almacenamiento local de datos
│   └── sessions/               # Archivos de sesiones
├── public/                     # Assets estáticos output
│   ├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.bundle.js
│       ├── test1.chunk.js
│       ├── test2.chunk.js
│       └── vendors.bundle.js
├── babel.config.js
├── webpack.config.js
├── package.json
└── index.js
```

## Primeros Pasos

### Prerrequisitos

- Node.js (v16 o superior)
- SASS (v1.9 o superior)
- npm o yarn

### Instalación

1. Clona o descarga este repositorio.
2. Navega al directorio del proyecto.
3. Instala las dependencias:

   ```bash
   npm install
   ```

### Configuración del Entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables (ajusta según tus credenciales):

```
PORT=10100
SECRET_SESSION=tu-clave-secreta-aqui

# Firebase
FIREBASE_PROJECT_ID=tu-proyecto-firebase
FIREBASE_PRIVATE_KEY_ID=tu-key-id
FIREBASE_PRIVATE_KEY=tu-private-key
FIREBASE_CLIENT_EMAIL=tu-client-email
FIREBASE_CLIENT_ID=tu-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=tu-cert-url

# Cloudflare R2
R2_ACCESS_KEY_ID=tu-access-key
R2_SECRET_ACCESS_KEY=tu-secret-key
R2_ACCOUNT_ID=tu-account-id
R2_BUCKET_NAME=tu-bucket

# Vercel
VERCEL_ACCESS_TOKEN=tu-token-vercel
VERCEL_PROJECT_ID=tu-project-id

# Kick API
KICK_CLIENT_ID=tu-client-id
KICK_CLIENT_SECRET=tu-client-secret
```

### Desarrollo

Para iniciar el servidor de desarrollo con recarga automática:

```bash
npm run dev
```

Este comando ejecuta:

- Webpack en modo watch para bundles de React
- Servidor Node.js en modo watch
- Compilador SASS en modo watch

La aplicación estará disponible en `http://localhost:10100`.

### Build de Producción

Para construir para producción (todo está configurado como prestart, pero puedes ejecutar):

```bash
npm run build && npm run build:css
```

Esto compila y minifica todos los assets.

Para iniciar el servidor de producción:

```bash
npm start
```

## Uso

### Autenticación

El proyecto incluye un flujo básico de login con manejo de sesiones:

- **Login**: POST a `/auth/login` con campos `email` y `password`.
- **Logout**: POST a `/auth/logout`.
- **Rutas Protegidas**: Usa el middleware `requireAuth` para proteger rutas.
- **Estado de Sesión**: Disponible en templates vía `isAuthenticated` y `sessionUser`.

Credenciales de prueba: `test@example.com` / `asdasd`.

### Integración de Componentes React

1. Crea un componente React en `src/react/components/`.
2. Regístralo en `src/react/componentMap.js`.
3. Incluye un `<div id="tu-componente"></div>` correspondiente en un template Handlebars.

Ejemplo de mapeo:

```javascript
{
  id: 'tu-componente',
  component: () => import(/* webpackChunkName: "tu-componente" */ './components/TuComponente.jsx'),
  hydrate: true,
  pages: ['/'],
  props: {},
}
```

El runtime carga solo los componentes mapeados para la página actual y los hidrata si `hydrate: true`.

### Dashboard CMS

El dashboard está disponible en rutas protegidas (ej. `/protected`). Desde aquí puedes:

- Gestionar contenido: Crear, editar y eliminar entradas en Firestore.
- Subir Assets: Usa Cloudflare R2 para subir imágenes/videos y obtener enlaces/metadata.
- Solicitar Redeploys: Integra con Vercel para redeployar el frontend automáticamente.
- Ver Caché: Los datos se almacenan en JSON para acceso rápido.
- Manejar Eventos de Kick: Recibe webhooks y maneja suscripciones en vivo.

### Integraciones Externas

- **Vercel**: Al actualizar contenido, se puede disparar un redeploy del sitio Next.js.
- **Cloudflare R2**: Para almacenamiento de assets con enlaces públicos.
- **Firestore**: Base de datos NoSQL para datos persistentes.
- **Sistema de Archivos JSON**: Caché local para reducir latencia.
- **Kick API**: Para funcionalidades relacionadas con streaming y eventos.

## Scripts

- `npm run dev` - Inicia servidor de desarrollo con recarga automática.
- `npm run build` - Construye assets de producción.
- `npm run build:watch` - Construye assets en modo watch.
- `npm start` - Inicia servidor de producción.
- `npm run dev:css` - Observa y compila SASS en desarrollo.
- `npm run build:css` - Compila y comprime SASS para producción.

## En Desarrollo

- Conectar completamente con Vercel para redeploys automáticos (ya parcialmente implementado).
- Optimizar el sistema de caché JSON.
- Agregar más funcionalidades al dashboard CMS.
- Mejorar la integración con Kick para eventos en tiempo real.

## Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de enviar un pull request o abrir un issue si tienes sugerencias o mejoras.

## Licencia

Este proyecto está bajo la Licencia MIT.
