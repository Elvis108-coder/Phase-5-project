import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="text-xl font-bold p-4 border-b border-gray-700">Admin Panel</div>
        <nav className="mt-4 space-y-1">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => 
              `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-900 text-yellow-400 font-medium' : 'hover:bg-gray-700 hover:text-yellow-300'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/products"
            className={({ isActive }) => 
              `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-900 text-yellow-400 font-medium' : 'hover:bg-gray-700 hover:text-yellow-300'}`
            }
          >
            Products
          </NavLink>
          <NavLink 
            to="/admin/users"
            className={({ isActive }) => 
              `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-900 text-yellow-400 font-medium' : 'hover:bg-gray-700 hover:text-yellow-300'}`
            }
          >
            Users
          </NavLink>
          <NavLink 
            to="/admin/orders"
            className={({ isActive }) => 
              `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-900 text-yellow-400 font-medium' : 'hover:bg-gray-700 hover:text-yellow-300'}`
            }
          >
            Orders
          </NavLink>
          <NavLink 
            to="/admin/analytics"
            className={({ isActive }) => 
              `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-900 text-yellow-400 font-medium' : 'hover:bg-gray-700 hover:text-yellow-300'}`
            }
          >
            Analytics
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}