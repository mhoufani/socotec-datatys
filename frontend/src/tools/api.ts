import axios, { AxiosResponse } from 'axios';
import { LocalStorage } from "@/services/storage";
import { localstorageEnum } from '@/config/index';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

axios.interceptors.request.use(
  (request) => {
    if (!request.headers.Authorization) {
      const token = LocalStorage.get(localstorageEnum.token) as string;
      if (token) {
        request.headers.Authorization = token;
      }
    }
    return request;
  },
  (error) => Promise.reject(error),
);

export default axios;
