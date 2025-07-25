import axios from 'axios';
import { API_URL } from '../config';

const BASE_URL = `${API_URL}/categories`;

const getAllCategories = async (token) => {
  const res = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};


const createCategory = async (categoryData, token) => {
  const res = await axios.post(BASE_URL, categoryData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateCategory = async (id, categoryData, token) => {
  const res = await axios.put(`${BASE_URL}/${id}`, categoryData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteCategory = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export default {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
