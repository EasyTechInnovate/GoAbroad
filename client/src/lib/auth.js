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

/**
 * Checks if the user is authenticated
 * @returns {boolean} True if the user is authenticated, false otherwise
 */
export function isAuthenticated() {
  return !!getToken();
}

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
  if (user.firstName && user.lastName) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
  
  // Fallback to email
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
  
  return 'NU'; // No User
}