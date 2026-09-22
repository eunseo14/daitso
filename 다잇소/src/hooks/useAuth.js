const USER_KEY = 'daitso_user';
const USERS_KEY = 'daitso_users';
const WISHLIST_KEY = 'daitso_wishlist';

// 현재 로그인 유저
export function getUser() {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

// 가입된 유저 목록 (간이 DB)
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function registerUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function authenticateUser(email, password) {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password) || null;
}

// 관심 목록
export function getWishlist() {
  try {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleWishlist(productId) {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx === -1) {
    list.push(productId);
  } else {
    list.splice(idx, 1);
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  return [...list];
}

export function isWishlisted(productId) {
  return getWishlist().includes(productId);
}
