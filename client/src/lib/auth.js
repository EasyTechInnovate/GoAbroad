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

export function isAuthenticated() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  Cookies.remove('accessToken', { path: '/' });
  

  notifyAuthChange(false);
}

export function getUserInitials() {
  const user = getUser();
  if (!user) return 'GU';
  
  if (user.firstName && user.lastName) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
  
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
  
  return 'NU';
}

export function isAdminRoute(pathname) {
  return pathname.startsWith('/admin') && pathname !== '/admin/login';
}

export function isPublicRoute(pathname) {
  const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/admin/login'];
  return publicRoutes.includes(pathname) || publicRoutes.some(route => pathname.startsWith(`${route}/`));
}