import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const nowTime = new Date();
  const duration = expirationDate.getTime() - nowTime.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
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
