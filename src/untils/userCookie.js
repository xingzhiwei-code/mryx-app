import cookie from 'js-cookie';

// 设置用户cookie
export function setUserCookie(info) {
  const userArr = Object.entries(info);
  for (let i = 0; i < userArr.length; i += 1) {
    cookie.set(userArr[i][0], userArr[i][1]);
  }
  return true;
}

// 获取用户cookie
export function getUserCookie() {
  return {
    username: cookie.get('username'),
    email: cookie.get('email'),
    role: cookie.get('role'),
    appkey: cookie.get('appkey'),
  };
}

// 删除用户cookie
export function removeUserCookie() {
  cookie.remove('username');
  cookie.remove('appkey');
  cookie.remove('role');
  cookie.remove('email');
  return true;
}
