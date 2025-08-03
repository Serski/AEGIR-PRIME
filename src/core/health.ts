import http, { Server } from 'http';

export function healthCheck(): boolean {
  return true; // Health check placeholder
}

export function startHealthServer(port = 3000): {
  server: Server;
  stop: () => Promise<void>;
} {
  const server = http.createServer((req, res) => {
    if (req.url === '/health') {
      const ok = healthCheck();
      res.statusCode = ok ? 200 : 500;
      res.end(ok ? 'OK' : 'FAIL');
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  server.on('error', (err) => {
    // Log server errors to stderr
    console.error('Health server error:', err);
  });

  server.listen(port);

  const stop = () =>
    new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

  return { server, stop };
}
