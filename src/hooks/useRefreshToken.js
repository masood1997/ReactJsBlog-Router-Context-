import api from '../api/api';
import { useBlog } from '../context/BlogContext';

const useRefreshToken = () => {
  const { setIsAuthenticated } = useBlog();
  const refresh = async () => {
    const response = await api.get('/user/refresh');
    setIsAuthenticated((prev) => {
    //   console.log('Previous accessToken :', JSON.stringify(prev));
    //   console.log('Refreshed accessToken', response.data.accessToken);
      return { ...prev, accessToken: response?.data?.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
