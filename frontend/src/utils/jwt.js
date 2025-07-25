// This imports the jwtDecode function from the jwt-decode package.
// jwtDecode(token) decodes the JWT payload (header and body) without verifying its signature.
import {jwtDecode} from 'jwt-decode';

// This defines and exports a function named isTokenExpired that takes a JWT token string as its input.
export const isTokenExpired = (token) => {
    try {
        // decoded will be an object containing the JWT payload, including fields like exp (expiry time in seconds since epoch).
        const decodedToken = jwtDecode(token);
        // decoded.exp is the expiration time in seconds, so it's multiplied by 1000 to convert it to milliseconds.
        // Date.now() returns the current time in milliseconds.
        return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
        // If there's an error decoding the token (e.g., if it's malformed), we log the error and return true,
        // indicating that the token is considered expired or invalid.
        console.error('Error decoding token:', error);
        return true; 
    }
}