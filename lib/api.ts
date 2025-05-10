import { AuthResponse } from "./types";
const API_BASE_URL = "https://sugarytestapi.azurewebsites.net";

export async function loginUser(
  username: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/AdminAccount/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserName: username,
      Password: password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to login");
  }

  return response.json();
}

export async function refreshTokenFn(
  accessToken: string,
  refreshToken: string
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/Account/RefreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return response.json();
}

export function saveAuthToStorage(data: AuthResponse) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    "auth",
    JSON.stringify({
      token: data.Token,
      refreshToken: data.RefreshToken,
      user: data.User,
      expiresAt: data.AccessTokenExpiresAt,
    })
  );
}

export function clearAuthFromStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth");
}
