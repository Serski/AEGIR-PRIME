import pino from 'pino';

/**
 * Application logger.
 *
 * When running in production the logger outputs standard JSON formatted
 * logs. During development or tests it attempts to enable `pino-pretty` for
 * human readable logs. If the pretty printer is not installed the logger will
 * gracefully fall back to standard JSON logging.
 */
const isProduction = process.env.NODE_ENV === 'production';

function createLogger(): pino.Logger {
  if (isProduction) {
    return pino();
  }

  try {
    // Ensure `pino-pretty` is available before enabling it.
    require.resolve('pino-pretty');
    return pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    });
  } catch {
    // Fall back to standard JSON logging when pretty printer is missing.
    return pino();
  }
}

export const logger = createLogger();

