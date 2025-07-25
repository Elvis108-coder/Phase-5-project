import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { exportToCSV } from '../../utils/exportUtils';

Chart.register(...registerables);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeUsers: 0,
    pendingOrders: 0
  });

  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  });

  const [ordersData, setOrdersData] = useState({
    labels: [],
    datasets: [{
      label: 'Orders',
      data: [],
      backgroundColor: 'rgba(59, 130, 246, 0.5)'
    }]
  });

  useEffect(() => {
    // Fetch data from API
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Replace with actual API calls
    setStats({
      totalProducts: 124,
      activeUsers: 89,
      pendingOrders: 23
    });

    setSalesData({
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      datasets: [{
        data: [300, 50, 100, 200],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ]
      }]
    });

    setOrdersData({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Orders',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(59, 130, 246, 0.5)'
      }]
    });
  };

  const handleExport = () => {
    const data = [
      ['Metric', 'Value'],
      ['Total Products', stats.totalProducts],
      ['Active Users', stats.activeUsers],
      ['Pending Orders', stats.pendingOrders],
      ...salesData.labels.map((label, i) => [label, salesData.datasets[0].data[i]])
    ];
    exportToCSV(data, 'dashboard_metrics');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
        >
          <span>Export to CSV</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Products</h3>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Active Users</h3>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Pending Orders</h3>
          <p className="text-3xl font-bold">{stats.pendingOrders}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sales by Product</h2>
          <div className="h-64">
            <Pie data={salesData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Orders This Week</h2>
          <div className="h-64">
            <Bar data={ordersData} />
          </div>
        </div>
      </div>
    </div>
  );
}