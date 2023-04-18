export function session() {
  return localStorage.getItem("user-token");
}

export function setSession(token: string) {
  localStorage.setItem("user-token", token);
}

export function userId() {
  return localStorage.getItem("user-id");
}

export function setUserId(id: string) {
  localStorage.setItem("user-id", id);
}
