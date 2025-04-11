import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const useAxios = () => {
  const request = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
      if (!config.url) {
        throw new Error('URL is required');
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