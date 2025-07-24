
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, fetchProducts } from "../../redux/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const product = products.find((p) => p.id === parseInt(id));

  const [formData, setFormData] = useState({ name: "", price: "" });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setFormData({ name: product.name, price: product.price });
    }
  }, [product]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product.id, data: formData }));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
