import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-3">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "font-semibold text-yellow-400" : "hover:text-yellow-300"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "font-semibold text-yellow-400" : "hover:text-yellow-300"
            }
          >
            Manage Products
          </NavLink>
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              isActive ? "font-semibold text-yellow-400" : "hover:text-yellow-300"
            }
          >
            Analytics
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
