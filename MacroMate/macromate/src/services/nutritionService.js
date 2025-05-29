import axios from 'axios';

const API_KEY = process.env.REACT_APP_FDC_API_KEY;
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY }
});

/**
 * Search foods by keyword.
 * @param {string} query
 * @param {number} pageSize
 */
export async function searchFoods(query, pageSize = 10) {
  const resp = await api.get('/foods/search', {
    params: { query, pageSize }
  });
  return resp.data.foods;  // array of hits
}

/**
 * Get detailed nutrient info for one food item.
 * @param {number} fdcId
 */
export async function getFoodDetails(fdcId) {
  const resp = await api.get(`/food/${fdcId}`);
  return resp.data;  // includes nutrients array
}
