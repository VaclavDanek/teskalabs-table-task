import axios from 'axios';
import { useState, useCallback } from 'react';
import { API_CONFIG } from '../config';

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_DETAIL}/${id}`);
      return response.data;
    } catch (e) {
      const error = {
        error: 'Error|Failed to fetch user data',
        error_dict: { msg: e.message }
      };
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchUser, isLoading, error };
};