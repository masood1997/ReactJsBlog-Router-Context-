import { useEffect, useRef, useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../../hooks/useRefreshToken';
import Loader from '../Loader/Loader';

const PersistentLogin = () => {
  const { isAuthenticated, persistent } = useBlog();
  const [loading, setLoading] = useState(true);
  //const pageRendered = useRef(false);
  const refresh = useRefreshToken();

  // useRef bypass method does not work with refresh call. Remove react strict mode for the desired result.

  useEffect(() => {
    const callRefresh = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    !isAuthenticated?.accessToken && persistent ? callRefresh() : setLoading(false);
  }, []);

  return (
    <>
      {
        !persistent
          ? <Outlet/>
          : loading
            ? <Loader/>
            : <Outlet/>
      }
    </>
  );
};

export default PersistentLogin;
