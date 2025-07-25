import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'

const Profile = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    if (!user) {
        return <Navigate to="/login" />
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <div className="space-y-2">
                
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>User ID:</strong> {user.sub || user.id}</p>
            </div>
            <button
                onClick={handleLogout}
                className="mt-6 bg-red-300 text-black px-4 py-2 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    )
}

export default Profile