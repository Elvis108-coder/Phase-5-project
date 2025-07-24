import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a469c9'];

const AdminAnalytics = () => {
  const [monthlySales, setMonthlySales] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("/api/admin/monthly-sales")
      .then(res => res.json())
      .then(data => setMonthlySales(data));

    fetch("/api/admin/popular-products")
      .then(res => res.json())
      .then(data => setPopularProducts(data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Monthly Sales Bar Chart */}
      <div className="bg-white shadow-md p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlySales}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Popularity Pie Chart */}
      <div className="bg-white shadow-md p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Product Popularity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={popularProducts}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {popularProducts.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
