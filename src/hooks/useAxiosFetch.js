import { useEffect, useState } from 'react';
import axios from 'axios';
const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        if (response.data) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        setFetchError(error.message);
      }
    };
    fetchData(dataUrl);
  }, [dataUrl]);

  return {data,fetchError}
};

export default useAxiosFetch;
