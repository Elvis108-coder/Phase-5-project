import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts
import Layout from "./components/layout";
import AdminLayout from "./components/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

// Protected Customer Pages
import Profile from "./pages/Profile";
// import CartPage from "./pages/CartPage";
// import CheckoutPage from "./pages/CheckoutPage";
// import Order from "./pages/Orders";
// import InvoicePage from "./pages/InvoicePage";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductList from "./pages/Admin/Products/ProductList";
import ProductForm from "./pages/Admin/Products/ProductForm";
// import UserList from "./pages/Admin/UserList";
// import OrderList from "./pages/Admin/OrderList";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Shared layout for all pages */}
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details" element={<ProductDetails />} />
        {/* <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/invoice" element={<InvoicePage />} /> */}

        {/* Customer & Admin Shared Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/invoice/:id"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <InvoicePage />
            </ProtectedRoute>
          }
        /> */}

        {/* Customer-Only Routes */}
        {/* <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Order />
            </ProtectedRoute>
          }
        /> */}

        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          {/* <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/orders" element={<OrderList />} /> */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;



