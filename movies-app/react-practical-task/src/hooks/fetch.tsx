import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url: string, depsArray: any[], setData: any, params?: any) {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await axios.get(url, {
          params,
          signal,
        });
        console.log(response.data);
        console.log(response.data.data);
        response.data.data ? setData(response.data.data) : setData(response.data)
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          setError('Failed to fetch movies');
        }
      } finally {
        setLoading(false);
      }

      return () => {
        controller.abort();
      };
    };
    fetchMovies();
  }, [setData, ...depsArray]);

  return {loading, error}
}