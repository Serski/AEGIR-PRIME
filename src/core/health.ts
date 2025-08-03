import { createServer, IncomingMessage, ServerResponse } from 'http';

export function healthCheck(): boolean {
  return true;
}

export function createHealthServer() {
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/healthz') {
      res.statusCode = 200;
      res.end('ok');
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
}
