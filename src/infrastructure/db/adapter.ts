import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';

/**
 * Thin wrapper around TypeORM's DataSource that provides
 * basic connection handling, query execution and
 * transaction management for the application.
 */
export class DatabaseAdapter {
  private dataSource?: DataSource;

  constructor(private readonly options: DataSourceOptions) {}

  /**
   * Initialize the database connection if it hasn't been already.
   */
  async initialize(): Promise<void> {
    if (this.dataSource && this.dataSource.isInitialized) {
      return;
    }

    this.dataSource = new DataSource(this.options);
    await this.dataSource.initialize();
  }

  /**
   * Run a raw SQL query using the current connection.
   * @param sql SQL query string
   * @param parameters optional parameters for the query
   */
  async query<T = any>(sql: string, parameters?: any[]): Promise<T[]> {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      throw new Error('Database not initialized');
    }

    return this.dataSource.query(sql, parameters);
  }

  /**
   * Execute the provided function within a transaction.
   * Any error thrown by the function will cause the transaction to
   * roll back.
   */
  async transaction<T>(runInTransaction: (manager: EntityManager) => Promise<T>): Promise<T> {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      throw new Error('Database not initialized');
    }

    return this.dataSource.transaction(runInTransaction);
  }

  /**
   * Close the database connection.
   */
  async destroy(): Promise<void> {
    if (this.dataSource && this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }
}

