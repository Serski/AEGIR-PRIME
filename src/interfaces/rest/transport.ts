import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

/**
 * Simple REST transport adapter built on top of Axios. The adapter exposes
 * convenience methods for common HTTP verbs and handles basic error
 * translation and JSON response parsing.
 */
export class RestTransportAdapter {
  private readonly client: AxiosInstance;

  constructor(baseURL?: string, config: AxiosRequestConfig = {}) {
    this.client = axios.create({ baseURL, ...config });
  }

  private async request<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.client.request({
        method,
        url,
        data,
        ...config,
      });
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      throw new Error(
        `HTTP ${method.toUpperCase()} ${url} failed: ${status ?? ''} ${
          statusText ?? error.message
        }`,
      );
    }
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>('get', url, undefined, config);
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>('post', url, data, config);
  }

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>('put', url, data, config);
  }

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>('patch', url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>('delete', url, undefined, config);
  }
}

