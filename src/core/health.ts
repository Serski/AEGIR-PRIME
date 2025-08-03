import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { logger } from './logger';

function handler(req: IncomingMessage, res: ServerResponse): void {
  if (req.url === '/healthz' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  res.writeHead(404);
  res.end();
}

export function startHealthServer(port = 3000): Server {
  const server = http.createServer(handler);
  return server.listen(port, () => {
    logger.info(`health server listening on ${port}`);
  });
}

export { handler as healthHandler };
