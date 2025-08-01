import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/slices/categorySlice';
import { addItemToCart, fetchMyCart } from '../redux/slices/cartSlice';
import Swal from 'sweetalert2';
import { t } from 'i18next';

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
    setPage(1);
  };

  const handleAddToCart = (product) => {
    if (!product) return;

    dispatch(addItemToCart({
      product_id: product.id,
      quantity: 1,
    }));
    dispatch(fetchMyCart());

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-fuchsia-50 to-fuchsia-200 min-h-screen">
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder={t('searchByName')}
          onChange={handleChange}
          className="px-3 py-2 rounded border border-purple-800 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-white"
        />
        <select
          name="category"
          onChange={handleChange}
          className="px-3 py-2 rounded border border-purple-800 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-white"
        >
          <option value="">{t('allCategories')}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder={t('maxPrice')}
          onChange={handleChange}
          className="px-3 py-2 rounded border border-purple-800 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-white"
        />
      </div>

      {loading ? (
        <p className="text-purple-800">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-purple-200 p-4 shadow hover:scale-110 hover:shadow-md transition duration-200 rounded"
              >
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-60 w-full object-contain rounded mb-4"
                  />
                  <h3 className="text-purple-800 font-semibold">{product.name}</h3>
                  <p className="text-gray-700 mb-2">Ksh {product.price}</p>
                </Link>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                  {t('addToCart')}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2 flex-wrap">
            {Array.from({ length: pagination.pages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-lg font-medium transition ${page === i + 1
                  ? 'bg-purple-800 text-white'
                  : 'bg-purple-200 text-purple-800 hover:bg-violet-800 hover:text-white'
                  }`}
              >
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
