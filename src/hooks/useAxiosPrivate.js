import { apiPrivate } from '../api/api';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { useBlog } from '../context/BlogContext';

const useAxiosPrivate = () => {
  const { isAuthenticated } = useBlog();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['authorization']) {
          config.headers['authorization'] = `Bearer ${isAuthenticated.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 401 && !originalRequest?.sent) {
          originalRequest.sent = true;
          const newAccessToken = await refreshToken();
          originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
          return apiPrivate(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestInterceptor);
      apiPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [isAuthenticated, refreshToken]);

  return apiPrivate;
};

export default useAxiosPrivate;
