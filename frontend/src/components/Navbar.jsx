import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-fuchsia-50 shadow-md text-gray-700">
      <div className="flex items-center space-x-6">
        <Link to="/" className="ml-7 text-purple-800 text-lg font-bold hover:text-violet-800 transition">
          Home
        </Link>
        
        {/* Regular customer links */}
        <Link to="/products" className="text-purple-700 hover:underline">Products</Link>
        <Link to="/products-details" className="text-purple-700 hover:underline">Product Details</Link>
        <Link to="/cart" className="text-purple-700 hover:underline">Cart</Link>
        <Link to="/orders" className="text-purple-700 hover:underline">My Orders</Link>
        <Link to="/checkout" className="text-purple-700 hover:underline">Checkout</Link>
        <Link to="/invoice" className="text-purple-700 hover:underline">Invoice</Link>
      </div>

      <div className="flex gap-4 items-center">
        {/* Admin access button - only shown to admins */}
        {user?.role === "admin" && (
          <Link 
            to="/admin/dashboard" 
            className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md"
          >
            Admin Panel
          </Link>
        )}

        {user ? (
          <>
            <span className="text-sm font-medium">{user.username}</span>
            <Link 
              to="/profile" 
              className="bg-purple-200 text-purple-800 px-3 py-1.5 rounded-full hover:bg-violet-800 hover:text-white transition shadow-md"
            >
              👤
            </Link>
            <button
              onClick={handleLogout}
              className="bg-purple-800 text-white px-4 py-1.5 rounded hover:bg-violet-800 transition shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="bg-purple-200 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="mr-10 bg-purple-300 text-gray-700 px-4 py-1.5 rounded hover:bg-violet-800 hover:text-white transition shadow-md"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;