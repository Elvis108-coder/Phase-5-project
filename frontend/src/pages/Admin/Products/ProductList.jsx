import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../redux/slices/productSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleDelete = (id) => {
    if (confirm('Delete this product?')) dispatch(deleteProduct(id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">All Products</h2>
        <Link to="/admin/products/new" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</Link>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th><th>Price</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="text-center border-t">
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.category}</td>
              <td>
                <Link to={`/admin/products/edit/${prod.id}`} className="text-blue-500 mr-2">Edit</Link>
                <button onClick={() => handleDelete(prod.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
