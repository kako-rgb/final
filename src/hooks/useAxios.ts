import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const useAxios = () => {
  const request = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
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