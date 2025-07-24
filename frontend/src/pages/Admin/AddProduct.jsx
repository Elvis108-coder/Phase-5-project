import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/productSlice";

const AddProduct = () => {
  const [formData, setFormData] = useState({ name: "", price: "" });
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(formData));
    setFormData({ name: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <input
        name="name"
        placeholder="Product name"
        onChange={handleChange}
        value={formData.name}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        onChange={handleChange}
        value={formData.price}
        className="border p-2 w-full mb-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;