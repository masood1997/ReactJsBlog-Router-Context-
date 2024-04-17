import api from '../api/api';
import { useBlog } from '../context/BlogContext';

const useRefreshToken = () => {
  const { setIsAuthenticated } = useBlog();
  const refresh = async () => {
    const response = await api.get('/user/refresh');
    setIsAuthenticated((prev) => {
      return { ...prev, accessToken: response?.data?.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
