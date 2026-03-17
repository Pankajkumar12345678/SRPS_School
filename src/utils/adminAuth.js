const TOKEN_KEY = "srps_admin_token";
const EMAIL_KEY = "srps_admin_email";

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function getAdminEmail() {
  return localStorage.getItem(EMAIL_KEY) || "";
}

export function setAdminSession(token, email) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function isAdminLoggedIn() {
  return Boolean(getAdminToken());
}
