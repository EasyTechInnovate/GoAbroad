<<<<<<< HEAD
import Cookies from 'js-cookie';

const COOKIE_OPTIONS = {
  expires: 1,
  secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
  sameSite: 'strict',
  path: '/'
};


const authListeners = [];

export function subscribeToAuth(listener) {
  authListeners.push(listener);
  return () => {
    const index = authListeners.indexOf(listener);
    if (index > -1) {
      authListeners.splice(index, 1);
    }
  };
}

function notifyAuthChange(isAuthenticated) {
  authListeners.forEach(listener => listener(isAuthenticated));
}

export function setAuth(authData) {
  if (!authData) return;
  
  logout();
  
  if (authData.accessToken) {
    localStorage.setItem('authToken', authData.accessToken);
    Cookies.set('accessToken', authData.accessToken, COOKIE_OPTIONS);
  }
  
  if (authData.user) {
    localStorage.setItem('user', JSON.stringify(authData.user));
  }


  notifyAuthChange(true);
}

export function getToken() {
  const cookieToken = Cookies.get('accessToken');
  if (cookieToken) return cookieToken;
  
  return localStorage.getItem('authToken');
}

=======
// Authentication utilities for handling login state, tokens, and user details

/**
 * Stores the authentication data after successful login
 * @param {Object} authData - The authentication data from API response
 */
export function setAuth(authData) {
  if (!authData) return;
  
  // Store the token in localStorage
  if (authData.accessToken) {
    localStorage.setItem('authToken', authData.accessToken);
  }
  
  // Store user details in localStorage
  if (authData.user) {
    localStorage.setItem('user', JSON.stringify(authData.user));
  }
}

/**
 * Gets the current authentication token
 * @returns {string|null} The authentication token or null if not logged in
 */
export function getToken() {
  return localStorage.getItem('authToken');
}

/**
 * Gets the current authenticated user
 * @returns {Object|null} The user object or null if not logged in
 */
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
export function getUser() {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

<<<<<<< HEAD
=======
/**
 * Checks if the user is authenticated
 * @returns {boolean} True if the user is authenticated, false otherwise
 */
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
export function isAuthenticated() {
  return !!getToken();
}

<<<<<<< HEAD
export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  Cookies.remove('accessToken', { path: '/' });
  

  notifyAuthChange(false);
}

export function getUserInitials() {
  const user = getUser();
  if (!user) return 'GU';
  
=======
/**
 * Logs out the user by clearing the authentication data
 */
export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  // You could add additional cleanup here if needed
}

/**
 * Gets user avatar initials from name or email
 * @returns {string} User initials
 */
export function getUserInitials() {
  const user = getUser();
  if (!user) return 'GU'; // Guest User
  
  // Try to get name parts if available
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
  if (user.firstName && user.lastName) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
  
<<<<<<< HEAD
=======
  // Fallback to email
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
  if (user.email) {
    const emailParts = user.email.split('@');
    if (emailParts[0]) {
      const nameParts = emailParts[0].split('.');
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return emailParts[0].substring(0, 2).toUpperCase();
    }
  }
  
<<<<<<< HEAD
  return 'NU';
}

export function isAdminRoute(pathname) {
  return pathname.startsWith('/admin') && pathname !== '/admin/login';
}

export function isPublicRoute(pathname) {
  const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/admin/login'];
  return publicRoutes.includes(pathname) || publicRoutes.some(route => pathname.startsWith(`${route}/`));
=======
  return 'NU'; // No User
>>>>>>> ca31a26dfb57d5460b4894654578e07d617fb4ad
}