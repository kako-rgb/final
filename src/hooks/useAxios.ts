import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const useAxios = (token?: string) => {
  const request = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
      if (!config.url) {
        throw new Error('URL is required');
      }

      // Add token to headers if provided
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        };
      }

      const response = await axiosInstance(config);
      return response;
    } catch (error) {
      console.error('Axios request failed:', error);
      throw error;
    }
  };

  return request;
};

export default useAxios;