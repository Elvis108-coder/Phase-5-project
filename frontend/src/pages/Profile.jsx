import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-fuchsia-100 to-fuchsia-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-300">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">👤 User Profile</h2>
          <p className="text-gray-500 mt-1">Welcome back, {user.email}</p>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">📧 Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">🎓 Role:</span>
            <span className="capitalize">{user.role}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">🆔 User ID:</span>
            <span>{user.sub || user.id}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
