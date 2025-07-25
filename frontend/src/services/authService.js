import { API_URL } from "../config";

// Sends a POST request to /auth/login with JSON data.
// credentials should be an object like { email: '...', password: '...' }.
const login = async (credentials) => {
    const response = await fetch(`http://localhost:5555/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    // If the response status is not 2xx (e.g., 400/401), it parses the error and throws an exception.
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    // If successful, returns the parsed response (likely a token and user info).
    return await response.json();
}


// Used to register a new user by sending a POST request to /auth/register.
const register = async (userData) => {
    const response = await fetch(`http://localhost:5555/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    // If the response status is not 2xx (e.g., 400/409), it parses the error and throws an exception.
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
}


// Exports the authService object containing the login and register functions.
// This allows other parts of the application to import and use these functions for authentication.
export const authService = {
    login,
    register
};

export default authService;