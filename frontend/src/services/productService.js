import { API_URL } from "../config";

const BASE_URL = `${API_URL}/products`;

const getAllProducts = async (token, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch products');
  }

  return await res.json();
};

const getProductById = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch product');
  }

  return await res.json();
};

const createProduct = async (productData, token) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create product');
  }

  return await res.json();
};

const updateProduct = async (id, productData, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update product');
  }

  return await res.json();
};

const deleteProduct = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete product');
  }
};

export const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

export default productService;
