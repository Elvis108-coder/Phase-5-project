
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <ul className="flex gap-6">
        <li>
          <Link to="/admin/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="hover:underline">
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin/analytics" className="hover:underline">
            Analytics
          </Link>
        </li>
      </ul>
    </nav>
  );
}
