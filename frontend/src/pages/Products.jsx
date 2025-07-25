import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/slices/categorySlice';

const Product = () => {
  const dispatch = useDispatch();
  const { products, pagination, loading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [filters, setFilters] = useState({ name: '', category: '', price: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, page }));
    dispatch(fetchCategories());
  }, [filters, page]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // reset page on filter
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input type="text" name="name" placeholder="Search by name" onChange={handleChange} />
        <select name="category" onChange={handleChange}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <input type="number" name="price" placeholder="Max Price" onChange={handleChange} />
      </div>

      {loading ? <p>Loading...</p> : (
        <>
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="border p-4 rounded shadow">
                <img src={product.image_url} alt={product.name} className="h-40 object-cover mb-2" />
                <h3>{product.name}</h3>
                <p>Ksh {product.price}</p>
              </Link>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => (
              <button key={i + 1} onClick={() => setPage(i + 1)} className={`${page === i + 1 ? 'bg-black text-white' : 'bg-gray-200'} px-3 py-1 rounded`}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
