import axios from 'axios';
import { FilterData } from './types';

const baseURL = 'http://localhost:8080';

export const makeRequest = axios.create({
  baseURL,
});

export const buildFilterParameters = (filterData?: FilterData) => {
  return {
    storeId: filterData?.store?.id,
  };
};
