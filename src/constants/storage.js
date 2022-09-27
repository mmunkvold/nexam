const tokenKey = "jwt";
const userKey = "user";

export function saveToken(jwt) {
  saveToStorage(tokenKey, jwt);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

//tror ikke jeg trenger disse ...
export function getUsername() {
  const user = getFromStorage(userKey);

  if (user) {
    return user.username;
  }
  return null;
}

//
/* 
export function clearLogoutFromStorage(user, token) {
  localStorage.removeItem(userKey, user);
  localStorage.removeItem(tokenKey, token);
}

export function clearStorage() {
  localStorage.clear();
} */

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }
  return JSON.parse(value);
}
