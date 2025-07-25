import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import LoginPic from '../assets/images/LoginPhoto.jpg'

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        role: 'customer',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(register(form));
            if (result.meta.requestStatus === 'fulfilled') {
                setForm({ username: '', email: '', password: '', role: 'customer' });
                navigate('/login');
            }
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-100 px-4">
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
                {/* Left Section with Illustration */}
                <div className="hidden md:flex items-center justify-center bg-purple-100 w-1/2">
                    <img
                        src={LoginPic}
                        alt="Register Visual"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Section - Form */}
                <div className="w-full md:w-1/2 p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Create an Account</h2>

                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="mb-4">
                            <label className="block text-sm text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Your name"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                                autoComplete="new-username"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@gmail.com"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                                autoComplete="new-email"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-full transition"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-purple-600 font-medium hover:underline">
                            Login
                        </Link>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6">© 2025 Luxe Beauty</p>
                </div>
            </div>
        </div>
    );
};

export default Register;