# AEGIR-PRIME

AEGIR-PRIME is a lightweight starter kit for building modular applications. It demonstrates a clean separation between HTTP handling, business logic, and data access so projects can scale easily as requirements change.

## Getting Started

### Install Dependencies
AEGIR-PRIME uses Node.js and npm. Install the project's dependencies with:

```bash
npm install
```

### Environment Variables
Configuration is handled through environment variables stored in an `.env` file at the project root.

The REST server honors the following variables:

- `PORT` – Sets the TCP port the Express server listens on. Defaults to `3000`.
- `NODE_ENV` – Specifies the runtime environment (`development`, `production`, or `test`) and toggles environment-specific behavior such as logging verbosity.

All REST routes are mounted at the root path (`/`).

A typical configuration might look like:

```
# .env
PORT=3000
DATABASE_URL=postgres://localhost/aegir_prime
NODE_ENV=development
```

Load the variables into your environment before running the app:

```bash
cp .env.example .env  # if an example file exists
source .env
```

### Development
Start the development server with automatic reloads:

```bash
npm run dev
```

### Tests
Run the test suite with:

```bash
npm test
```

## Architecture Overview

```
+------------+     +-------------+     +-------------+
|  API Layer | --> | Service     | --> | Data Layer  |
+------------+     +-------------+     +-------------+
       |                   |                   |
       `-----------------> Utilities <---------'
```

- **API Layer** – HTTP endpoints and request/response handling.
- **Service** – Core business logic and domain rules.
- **Data Layer** – Database adapters and persistence models.
- **Utilities** – Shared helpers, configuration loaders, and logging.

