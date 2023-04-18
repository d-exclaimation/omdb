const TOKEN_KEY = "user-token";
const USER_ID_KEY = "user-id";

export function session() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setSession(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function userId() {
  return localStorage.getItem(USER_ID_KEY);
}

export function setUserId(id: string) {
  localStorage.setItem(USER_ID_KEY, id);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
}
