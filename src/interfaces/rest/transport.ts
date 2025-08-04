import express from 'express';
import { Server } from 'http';

import * as routes from './routes';
import { runtimeConfig } from '../../config/runtime';

/**
 * Start the REST server using Express. All routers exported from the routes
 * directory are registered and the server listens on the configured port.
 */
export function startServer(): Server {
  const app = express();

  Object.values(routes).forEach((router) => {
    app.use(router);
  });

  return app.listen(runtimeConfig.port);
}

