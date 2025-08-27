import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {ApiResponse} from '@types/microfrontend';
import {storageService} from './StorageService';

class ApiClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = 'https://api.fivvia.com') {
    this.baseURL = baseURL;
    console.log( this.baseURL,"this.baseURL")
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      async (config) => {
        // Add auth token if available
        const token = await storageService.getSecureItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp
        config.metadata = {
          startTime: Date.now(),
        };

        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const duration = Date.now() - response.config.metadata?.startTime;
        console.log(
          `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`
        );
        return response;
      },
      async (error) => {
        const duration = Date.now() - error.config?.metadata?.startTime;
        console.error(
          `❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} (${duration}ms)`,
          error.response?.status,
          error.response?.data
        );

        // Handle token refresh
        if (error.response?.status === 401) {
          try {
            const refreshToken = await storageService.getSecureItem('refreshToken');
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken);
              if (response.success) {
                // Retry original request
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                return this.instance(originalRequest);
              }
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            console.error('Token refresh failed:', refreshError);
            // You might want to dispatch a logout action here
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.statusText;
      return new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }

  private async refreshToken(refreshToken: string): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/refresh`, {
        refreshToken,
      });
      
      // Store new tokens
      await storageService.setSecureItem('accessToken', response.data.token);
      await storageService.setSecureItem('refreshToken', response.data.refreshToken);
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Token refresh failed',
      };
    }
  }

  // HTTP Methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: [error.message],
      };
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: [error.message],
      };
    }
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: [error.message],
      };
    }
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.patch(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: [error.message],
      };
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: [error.message],
      };
    }
  }

  // Upload file
  async upload<T = any>(url: string, file: any, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.instance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: [error.message],
      };
    }
  }

  // Download file
  async download(url: string, onProgress?: (progress: number) => void): Promise<ApiResponse<Blob>> {
    try {
      const response = await this.instance.get(url, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: [error.message],
      };
    }
  }

  // Update base URL
  setBaseURL(baseURL: string) {
    this.baseURL = baseURL;
    this.instance.defaults.baseURL = baseURL;
  }

  // Get current base URL
  getBaseURL(): string {
    return this.baseURL;
  }

  // Set default headers
  setDefaultHeader(key: string, value: string) {
    this.instance.defaults.headers.common[key] = value;
  }

  // Remove default header
  removeDefaultHeader(key: string) {
    delete this.instance.defaults.headers.common[key];
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();
export default apiClient;

