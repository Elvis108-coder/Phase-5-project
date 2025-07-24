import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin 👋</h1>
      <p className="mb-4 text-gray-600">Use the dashboard to manage and analyze your store:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/analytics"
          className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">📊 Analytics</h2>
          <p className="text-gray-600">View user behavior and product stats</p>
        </Link>

        <Link
          to="/products"
          className="bg-white shadow-md rounded-xl p-6 hover:bg-green-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">🛍️ Product Control</h2>
          <p className="text-gray-600">Add, update, or delete product listings</p>
        </Link>

        <Link
          to="/charts"
          className="bg-white shadow-md rounded-xl p-6 hover:bg-yellow-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">📈 Charts</h2>
          <p className="text-gray-600">Sales trends and product popularity</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
