import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, fetchProductById } from '../../../redux/slices/productSlice';
import { fetchCategories } from '../../../redux/slices/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const { product } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', image_url: '', category_id: ''
  });

  useEffect(() => {
    dispatch(fetchCategories());
    if (isEdit) dispatch(fetchProductById(id));
  }, [id]);

  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
        category_id: product.category_id,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateProduct({ id, productData: formData }));
    } else {
      dispatch(createProduct(formData));
    }
    navigate('/admin/products');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} />
        <select name="category_id" value={formData.category_id} onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
