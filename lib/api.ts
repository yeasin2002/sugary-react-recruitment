import { AuthResponse, MaterialsResponse } from './types';

const API_BASE_URL = 'https://sugarytestapi.azurewebsites.net';

export async function loginUser(username: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/AdminAccount/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      UserName: username,
      Password: password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to login');
  }

  return response.json();
}

export async function refreshToken(accessToken: string, refreshToken: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/Account/RefreshToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json();
}

export async function fetchMaterials(skip: number, limit: number): Promise<MaterialsResponse> {
  const authData = getAuthFromStorage();
  
  if (!authData) {
    throw new Error('Not authenticated');
  }

  const filter = {
    Skip: skip,
    Limit: limit,
    Types: [1],
  };

  const encodedFilter = btoa(JSON.stringify(filter));
  
  const response = await fetch(`${API_BASE_URL}/Materials/GetAll?filter=${encodedFilter}`, {
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token might be expired, try to refresh
      try {
        const refreshedData = await refreshToken(authData.token, authData.refreshToken);
        if (refreshedData.Success) {
          saveAuthToStorage(refreshedData);
          // Retry the request with the new token
          return fetchMaterials(skip, limit);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        throw new Error('Session expired. Please login again.');
      }
    }
    throw new Error('Failed to fetch materials');
  }

  return response.json();
}

function getAuthFromStorage() {
  if (typeof window === 'undefined') return null;
  
  const authJson = localStorage.getItem('auth');
  if (!authJson) return null;
  
  try {
    return JSON.parse(authJson);
  } catch (error) {
    console.error('Error parsing auth data:', error);
    return null;
  }
}

export function saveAuthToStorage(data: AuthResponse) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('auth', JSON.stringify({
    token: data.Token,
    refreshToken: data.RefreshToken,
    user: data.User,
    expiresAt: data.AccessTokenExpiresAt
  }));
}

export function clearAuthFromStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth');
}
