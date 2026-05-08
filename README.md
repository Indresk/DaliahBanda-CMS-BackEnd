# Daliah Banda CMS Backend

This is the custom CMS backend for **Daliah Banda**'s website (daliahbanda.com). It is a content management system (CMS) built with Node.js, Express, Handlebars, and integrated React, designed to handle assets, dynamic content, and more. It includes advanced integrations with Vercel for automatic frontend redeploys, Cloudflare R2 for storage and asset management, Firestore as the primary database, and a JSON file system for fast data caching, avoiding unnecessary database queries on every request.

This project is an evolution of the Handlebars + React SSR template, specifically adapted for the needs of this website. The frontend is a serverless Next.js that consumes this backend.

## Features

- **Authentication and Sessions**: Session-based authentication with protected routes and login/logout flow.
- **CMS Dashboard**: An admin panel-style CMS built with Handlebars and integrated React for easy content management.
- **Vercel Integration**: Requests automatic redeploys of the Next.js frontend when content is updated.
- **Cloudflare R2**: Uploads assets, retrieves links and metadata to optimize storage.
- **Firestore as DB**: Stores main information in Firestore for scalability.
- **JSON Cache**: Creates JSON files in the file system for fast access, reducing DB queries.
- **Kick API Integration**: Handles webhooks, events, and subscriptions for live functionalities.
- **Development Tools**: Watch mode for changes in JavaScript, CSS, and server in development.
- **Modular Architecture**: Clean separation of routes, views, components, middlewares, and utilities.

For details on Server-Side Rendering (SSR), React integration, Webpack bundling, SASS styling, and other template-related features, refer to my [Handlebars-React-SSR-Template](https://github.com/Indresk/Handlebars-React-SSR-Template.git).

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: Handlebars (express-handlebars)
- **Frontend**: React 19, React DOM
- **Build Tools**: Webpack 5, Babel
- **Styling**: SASS/SCSS
- **Authentication**: `express-session`, `argon2` for password hashing
- **Database**: Firebase Firestore
- **Storage**: Cloudflare R2
- **Services**: Kick API for webhooks and events
- **Development**: `concurrently`, Node.js watch mode

## Project Structure

```
├── src/
│   ├── config/                 # Configurations and helpers
│   │   ├── firebase.js         # Firebase configuration
│   │   ├── handlebarsHelpers.js # Helpers for Handlebars
│   │   ├── r2Config.js         # R2 configuration
│   │   └── sessionConfig.js    # Session configuration
│   ├── controllers/            # Express controllers
│   │   ├── assets.controller.js
│   │   ├── auth.controller.js
│   │   ├── content.controller.js
│   │   ├── deploy.controller.js
│   │   └── webhook.controller.js
│   ├── db/                     # Database handling
│   │   ├── fileSystem/         # File system for JSON cache
│   │   │   └── eraseSessions.js
│   │   └── firestore/          # Firestore integration
│   │       ├── auth.js
│   │       ├── content.js
│   │       ├── liveStatus.js
│   │       └── temporalGeneral.js
│   ├── middlewares/            # Express middlewares
│   │   ├── auth.js             # Authentication
│   │   ├── kickWebhook.js      # Kick webhooks
│   │   ├── rateLimiters.js     # Rate limiters
│   │   └── upload.js           # Upload middleware
│   ├── react/                  # React entry, component map, and components
│   │   ├── componentMap.js
│   │   ├── index.jsx
│   │   └── components/
│   │       ├── cms/
│   │       │   ├── AssetsManager.jsx
│   │       │   ├── ContentManager.jsx
│   │       │   ├── DeployButton.jsx
│   │       │   └── LiveStatus.jsx
│   │       └── utils/
│   │           └── LazyImage.jsx
│   ├── routes/                 # Express routes
│   │   ├── api.routes.js       # API routes
│   │   ├── assets.routes.js    # Assets routes
│   │   ├── auth.routes.js      # Authentication routes
│   │   ├── content.routes.js   # Content routes
│   │   ├── deploy.routes.js    # Deploy routes
│   │   ├── views.routes.js     # Views routes
│   │   └── webhook.routes.js   # Webhook routes
│   ├── sass/                   # SCSS stylesheets
│   │   ├── index.scss
│   │   └── [partials].scss     # _base.scss, _buttons.scss, etc.
│   ├── services/               # External services
│   │   ├── auth/               # Authentication services
│   │   │   ├── hashing.js
│   │   │   └── validation.js
│   │   ├── cache/              # Cache services
│   │   │   └── jsonCache.js
│   │   ├── kick/               # Kick API services
│   │   │   ├── auth.js
│   │   │   ├── eventHandlers.js
│   │   │   ├── subscriptionManager.js
│   │   │   └── tokenManager.js
│   │   ├── r2/                 # Cloudflare R2 services
│   │   │   └── storage.js
│   │   └── vercel/             # Vercel services
│   │       └── deploy.js
│   ├── util/                   # Utilities
│   │   ├── dirname.js
│   │   └── pkceManager.js      # PKCE handling for OAuth
│   └── views/                  # Handlebars templates
│       ├── login.handlebars
│       ├── cms/
│       │   ├── assets.handlebars
│       │   ├── content.handlebars
│       │   └── dashboard.handlebars
│       ├── layouts/
│       │   ├── auth.handlebars
│       │   └── cms.handlebars
│       └── partials/
│           └── data.handlebars
├── localData/                  # Local data storage
│   ├── cache/                  # JSON cache files
│   │   ├── content_albums.json
│   │   ├── content_general-data_live-public.json
│   │   └── content_shows.json
│   └── sessions/               # Session files
├── public/                     # Static assets output
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── cms-assets.chunk.js
│       ├── cms-content.chunk.js
│       ├── cms-deploy.chunk.js
│       ├── cms-live.chunk.js
│       ├── main.bundle.js
│       └── vendors.bundle.js
├── babel.config.js
├── webpack.config.js
├── package.json
└── index.js
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- SASS (v1.9 or higher)
- npm or yarn

### Installation

1. Clone or download this repository.
2. Navigate to the project directory.
3. Install dependencies:

   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root directory with the variables following the .env.example format (adjust according to your credentials).

### Development

To start the development server with automatic reloading:

```bash
npm run dev
```

This command runs:

- Webpack in watch mode for React bundles
- Node.js server in watch mode
- SASS compiler in watch mode

The application will be available at `http://localhost:10000` by default.

### Production Build

To build for production (everything is configured as prestart, but you can run):

```bash
npm run build && npm run build:css
```

This compiles and minifies all assets.

To start the production server:

```bash
npm start
```

## Usage

### Authentication

The project includes a basic login flow with session management:

- **Login**: POST to `/auth/login` with `email` and `password` fields.
- **Logout**: POST to `/auth/logout`.
- **Protected Routes**: Use the `requireAuth` middleware to protect routes.
- **Session State**: Available in templates via `isAuthenticated` and `sessionUser`.

Test credentials: `test@example.com` / `asdasd`.

For React component integration details, refer to the [Handlebars-React-SSR-Template](https://github.com/Indresk/Handlebars-React-SSR-Template.git).

### CMS Dashboard

The dashboard is available on protected routes (e.g., `/protected`). From here you can:

- Manage Content: Create, edit, and delete entries in Firestore.
- Upload Assets: Use Cloudflare R2 to upload images/videos and get links/metadata.
- Request Redeploys: Integrate with Vercel to redeploy the frontend automatically.
- View Cache: Data is stored in JSON for fast access.
- Handle Kick Events: Receive webhooks and manage live subscriptions.

### External Integrations

- **Vercel**: When updating content, it can trigger a redeploy of the Next.js site.
- **Cloudflare R2**: For asset storage with public links.
- **Firestore**: NoSQL database for persistent data.
- **JSON File System**: Local cache to reduce latency.
- **Kick API**: For streaming-related functionalities and events.

## Scripts

- `npm run dev` - Starts development server with automatic reloading.
- `npm run build` - Builds production assets.
- `npm run build:watch` - Builds assets in watch mode.
- `npm start` - Starts production server.
- `npm run dev:css` - Watches and compiles SASS in development.
- `npm run build:css` - Compiles and compresses SASS for production.

## In Development

- Fully connect with Vercel for automatic redeploys (partially implemented).
- Optimize the JSON cache system.
- Add more functionalities to the CMS dashboard.
- Improve Kick integration for real-time events.

## Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue if you have suggestions or improvements.

## License

This project is licensed under the MIT License.
