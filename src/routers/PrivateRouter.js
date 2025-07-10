function PrivateRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    alert('로그인이 필요한 기능입니다.');
    return null;
  }

  return children;
}

export default PrivateRoute;