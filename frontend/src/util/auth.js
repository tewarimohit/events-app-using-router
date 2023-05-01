import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  // to access token on each nav
  return getAuthToken();
}

export function checkAuthLoader() {
  // to keep pages auth safe
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }

  return null;
}
