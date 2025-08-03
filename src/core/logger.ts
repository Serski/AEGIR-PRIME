import pino, { Logger as PinoLogger } from 'pino';

export type Logger = PinoLogger;

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger: Logger = isDevelopment
  ? pino({ transport: { target: 'pino-pretty' } })
  : pino();
