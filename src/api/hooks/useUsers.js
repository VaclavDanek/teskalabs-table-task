
import axios from 'axios';
import { useState, useCallback } from 'react';
import { API_CONFIG } from '../config';

//* utils
import { filterData, sortData } from '../../utils';

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async ({ params }) => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`, { params });
      const { data, count } = response.data;

      const rows = filterData(data, ['username', 'email'], params.f);
      sortData(rows, Object.entries(params).filter(([param]) => param.startsWith('s')));
      return { count, rows };
    } catch (e) {
      const error = {
        error: 'Error|Failed to fetch users',
        error_dict: { msg: e.message }
      };
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchUsers, isLoading, error };
};