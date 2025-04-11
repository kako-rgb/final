import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Reduced timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Ensure the URL is absolute
  if (!config.url?.startsWith('http')) {
    config.url = `${baseURL}${config.url}`;
  }

  config.retry = 3;

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add retry logic
axiosInstance.interceptors.response.use(undefined, async (error) => {
  const { config } = error;
  if (!config || !config.retry) {
    return Promise.reject(error);
  }
  
  config.retry -= 1;
  const delayRetry = new Promise(resolve => setTimeout(resolve, 1000));
  await delayRetry;
  return axiosInstance(config);
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