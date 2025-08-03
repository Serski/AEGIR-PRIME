export interface Logger {
  info: (...args: unknown[]) => void;
}

export const logger: Logger = {
  info: (..._args: unknown[]): void => {
    // Logging placeholder
  }
};
