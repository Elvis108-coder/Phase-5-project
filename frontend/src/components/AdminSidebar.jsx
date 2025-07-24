
import { Link, useLocation } from "react-router-dom";
import { BarChart3, LayoutDashboard, Package, Settings } from "lucide-react";

const AdminSidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, to: "/admin/dashboard" },
    { name: "Orders", icon: <BarChart3 />, to: "/admin/orders" },
    { name: "Products", icon: <Package />, to: "/admin/products" },
    { name: "Settings", icon: <Settings />, to: "/admin/settings" },
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r fixed top-0 left-0 z-10 shadow-sm">
      <div className="text-2xl font-bold px-6 py-4 border-b">
        Admin Panel
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 px-6 py-3 text-lg hover:bg-gray-100 transition ${
              pathname === item.to ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
